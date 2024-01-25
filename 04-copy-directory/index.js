const fs = require('fs').promises;
const path = require('path');

async function copyDir(source, destination) {
  try {
    try {
      await fs.access(destination);
      await fs.rm(destination, { recursive: true });
    } catch (err) {
      console.log('');
    }
    await fs.mkdir(destination);
    const files = await fs.readdir(source);
    for (const file of files) {
      const current = await fs.lstat(path.join(source, file));
      if (current.isDirectory()) {
        await copyDir(path.join(source, file), path.join(destination, file));
      } else {
        await fs.copyFile(
          path.join(source, file),
          path.join(destination, file),
        );
      }
    }
  } catch (err) {
    console.error('Error copying directory: ', err);
  }
}

copyDir('04-copy-directory/files', '04-copy-directory/files-copy');
