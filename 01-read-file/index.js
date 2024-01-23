const fs = require('fs');

const readStream = fs.createReadStream('./01-read-file/text.txt', 'utf-8');

readStream.on('data', (data) => {
  console.log('text.txt insertion:', data);
});

readStream.on('error', (err) => {
  console.error('Cannot read file:', err);
});
