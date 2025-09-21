require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://safarsure-d8531-default-rtdb.asia-southeast1.firebasedatabase.app/` // Realtime DB URL
});
const db = admin.database();
db.ref("test").set({ hello: "world" })
  .then(() => console.log("✅ Firebase Connected"))
  .catch(err => console.error("❌ Firebase Error", err));

let provider;
let wallet;
let contract;
try {
  provider = new ethers.providers.JsonRpcProvider(process.env.ETH_PROVIDER_URL);
  wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = JSON.parse(fs.readFileSync(process.env.CONTRACT_ABI_PATH));
  contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);
} catch (e) {
  console.log('Blockchain not configured or ABI missing — continuing in mock mode.');
}


async function pushAlert(alert) {
  const ref = db.ref('/alerts').push();
  await ref.set({
    ...alert,
    createdAt: Date.now()
  });
  return ref.key;
}
const axios = require('axios'); 



app.post('/api/register', async (req, res) => {

  try {
    const payload = req.body;

    if (!payload.name || !payload.passportId) return res.status(400).json({error:'missing fields'});


    const touristRef = db.ref('/tourists').push();
    const touristId = touristRef.key;
    const record = {
      touristId,
      name: payload.name,
      passportId: payload.passportId,
      itinerary: payload.itinerary || '',
      emergencyContact: payload.emergencyContact || '',
      validUntil: payload.visitValidUntil || (Date.now() + 7*24*3600*1000),
      ethAddress: payload.ethAddress || null,
      createdAt: Date.now()
    };
    await touristRef.set(record);


    let txHash = null;
    if (contract && payload.ethAddress) {
      try {
        const tx = await contract.registerTourist(payload.name, payload.passportId, payload.itinerary || "", payload.emergencyContact || "", record.validUntil, { gasLimit: 200000 });
        const receipt = await tx.wait();
        txHash = receipt.transactionHash;
      } catch (err) {
        console.error('Contract write failed:', err.message);
      }
    }


    return res.json({ success:true, touristId, txHash, record });
  } catch (err) {
    console.error(err);
    return res.status(500).json({error: err.message});
  }
});


app.post('/api/location', async (req, res) => {
  try {
    const { touristId, lat, lng, speed, accuracy, timestamp } = req.body;
    if (!touristId || lat==null || lng==null) return res.status(400).json({error:'missing fields'});

    // push historical point
    const locRef = db.ref(`/locations/${touristId}`).push();
    const locRecord = {
      lat, lng,
      speed: speed || 0,
      accuracy: accuracy || null,
      ts: timestamp || Date.now()
    };
    await locRef.set(locRecord);

    // update latest snapshot for quick reads by frontend
    await db.ref(`/latestLocations/${touristId}`).set(locRecord);

    return res.json({ success:true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({error: err.message});
  }
});



app.post('/api/panic', async (req, res) => {

  try {
    const { touristId, lat, lng, message } = req.body;
    if (!touristId || lat==null || lng==null) return res.status(400).json({error:'missing fields'});
    const alert = {
      touristId, lat, lng, message: message || 'PANIC', level: 'high', type: 'panic'
    };
    const alertKey = await pushAlert(alert);


    await db.ref(`/panicRecords/${touristId}`).set({ alertKey, ...alert, ts: Date.now() });


    return res.json({ success:true, alertKey });
  } catch(err) {
    console.error(err);
    return res.status(500).json({error: err.message});
  }
});


app.post('/api/geofence-check', async (req, res) => {

  try {
    const { touristId, zoneId, zoneName, action, lat, lng } = req.body;
    if (!touristId || !zoneId) return res.status(400).json({error:'missing fields'});

    const alert = {
      touristId, zoneId, zoneName, action, lat, lng, type: 'geofence', level: action==='enter' ? 'medium' : 'info'
    };
    const alertKey = await pushAlert(alert);
    return res.json({ success:true, alertKey });
  } catch (err) {
    console.error(err);
    return res.status(500).json({error: err.message});
  }
});


app.get('/api/tourist/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const snapshot = await db.ref(`/tourists/${id}`).once('value');
    if (!snapshot.exists()) return res.status(404).json({error:'not found'});
    return res.json(snapshot.val());
  } catch (err) {
    console.error(err);
    return res.status(500).json({error: err.message});
  }
});
let txHash = null;
if (contract && payload.ethAddress) {
  try {
    console.log("Mock call to registerTourist with:", payload);
    txHash = "mock_tx_hash_" + Date.now();
  } catch (err) {
    console.error(err);
  }
}





const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log('Backend running on', port));
