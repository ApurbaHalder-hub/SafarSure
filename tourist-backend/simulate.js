// simulate.js
const axios = require('axios');
const SERVER = 'http://localhost:4000'; // or your ngrok URL when exposing
const TOURIST_ID = 'DemoT1';

async function sendLoc(lat,lng){
  await axios.post(`${SERVER}/api/location`, { touristId: TOURIST_ID, lat, lng, timestamp: Date.now() });
  console.log('loc', lat,lng);
}

async function sendPanic(lat,lng){
  await axios.post(`${SERVER}/api/panic`, { touristId: TOURIST_ID, lat, lng, message:'demo panic' });
  console.log('panic sent');
}

(async () => {
  const path = [[26.85,80.95],[26.851,80.951],[26.852,80.952]];
  for (const p of path){
    await sendLoc(p[0],p[1]);
    await new Promise(r=>setTimeout(r,2000));
  }
  await sendPanic(path[2][0],path[2][1]);
})();
