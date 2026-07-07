const key = 'AIzaSyCT8Vc3sDrpd1XIzu-MPHYCwLx40CIUcuo';
const url2 = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${key}`;
fetch(url2, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: 'Respond with OK' }] }] })
}).then(r => r.json().then(d => console.log('Generate 1.5:', r.status, d.error?.message || 'Success', d))).catch(console.error);
