const fs = require('fs');
const path = require('path');

const filePath = path.join('02-write-file', 'text.txt');
const writeStream = fs.createWriteStream(filePath, { flags: 'w' });

console.log('text.txt created. Enter your input.');

process.on('SIGINT', () => {
  console.log('File changed.');
  process.exit();
});

process.stdin.on('data', (data) => {
  const input = data.toString().trim();
  if (input === 'exit') {
    console.log('File changed.');
    process.exit();
  } else {
    writeStream.write(input + '\n');
  }
});

process.stdin.on('end', () => {
  writeStream.end();
});
