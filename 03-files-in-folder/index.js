const fs = require('fs');
const path = require('path');

const folderPath = './03-files-in-folder/secret-folder';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading the folder:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error('Error getting file stats:', err);
        return;
      }

      const fileSize = stats.size;
      const fileExtension = path.extname(file);
      const formattedSize = `${fileSize} bytes`;

      console.log(`${file} - ${fileExtension} - ${formattedSize}`);
    });
  });
});
