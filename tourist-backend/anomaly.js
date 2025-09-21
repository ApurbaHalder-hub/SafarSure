// anomaly.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com"
});
const db = admin.database();

const haversine = (a,b) => {
  const toRad = d => d * Math.PI / 180;
  const R = 6371; // km
  const dLat = toRad(b.lat-a.lat), dLon = toRad(b.lng-a.lng);
  const lat1 = toRad(a.lat), lat2 = toRad(b.lat);
  const x = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.sin(dLon/2)*Math.sin(dLon/2)*Math.cos(lat1)*Math.cos(lat2);
  return 2*R*Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
};

let lastSeen = {}; // memory of last points

setInterval(async () => {
  const snap = await db.ref('latestLocations').once('value');
  const all = snap.val() || {};
  const now = Date.now();
  for (const tid in all) {
    const p = all[tid];
    if (!p) continue;
    // silent > 30 min
    if (now - p.ts > 30*60*1000) {
      await db.ref('alerts').push().set({ touristId: tid, type:'silent', message:'No update >30min', createdAt: now });
    }
    // sudden large jump
    if (lastSeen[tid]) {
      const dist = haversine(lastSeen[tid], p);
      if (dist > 2) { // >2 km jump
        await db.ref('alerts').push().set({ touristId: tid, type:'anomaly', message:`Jump ${dist.toFixed(2)} km`, lat:p.lat, lng:p.lng, createdAt: now });
      }
    }
    lastSeen[tid] = p;
  }
}, 10000);
setInterval(async () => {
  const snap = await db.ref('latestLocations').once('value');
  console.log("Checked latestLocations:", snap.val());
}, 10000);

