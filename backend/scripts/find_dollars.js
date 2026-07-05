const fs = require('fs');
const path = require('path');

const filePath = 'd:/edibio-app/app/company/dashboard/page.tsx';
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

let output = '';
lines.forEach((line, index) => {
    if (line.includes('$')) {
        output += `Line ${index + 1}: ${line.trim()}\n`;
    }
});

fs.writeFileSync('d:/edibio-app/dollars_output.txt', output);
console.log('Done, wrote to dollars_output.txt');
