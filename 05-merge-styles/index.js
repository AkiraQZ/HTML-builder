const fs = require('fs');
const path = require('path');
const stylesDir = '05-merge-styles/styles';
const distDir = '05-merge-styles/project-dist';

async function bundleStyles() {
  try {
    const files = await fs.promises.readdir(stylesDir);
    const cssFiles = files.filter((file) => path.extname(file) === '.css');
    let bundleContent = '';
    for (const file of cssFiles) {
      const content = await fs.promises.readFile(
        path.join(stylesDir, file),
        'utf-8',
      );
      bundleContent += content + '\n';
    }
    await fs.promises.writeFile(
      path.join(distDir, 'bundle.css'),
      bundleContent,
    );
    console.log('Styles bundled successfully');
  } catch (err) {
    console.error(err);
  }
}

bundleStyles();
