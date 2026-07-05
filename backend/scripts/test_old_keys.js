const key = 'AIzaSyCT8Vc3sDrpd1XIzu-MPHYCwLx40CIUcuo';
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: 'Hi' }] }] })
}).then(r => r.json().then(d => console.log('Key', 'HTTP', r.status, d.error?.message || 'Success'))).catch(console.error);
