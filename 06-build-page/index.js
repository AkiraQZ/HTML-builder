const fs = require('fs').promises;
const path = require('path');

async function createProjectDist() {
  try {
    try {
      await fs.access(
        '06-build-page/project-dist',
        fs.constants.R_OK | fs.constants.W_OK,
      );
      await fs.rm('06-build-page/project-dist', { recursive: true });
    } catch {
      console.log('project-dist already exist. rewriteing.');
    }
    await fs.mkdir('06-build-page/project-dist');
    console.log('project-dist folder created successfully');
  } catch (err) {
    console.error(err);
  }
}

async function replaceTags() {
  try {
    const template = await fs.readFile('06-build-page/template.html', 'utf-8');
    let indexContent = template.toString();
    const regex = /{{(.*?)}}/g;
    let match;
    while ((match = regex.exec(indexContent)) !== null) {
      const componentName = match[1];
      const component = await fs.readFile(
        `06-build-page/components/${componentName}.html`,
        'utf-8',
      );
      indexContent = indexContent.replace(match[0], component);
    }
    await fs.writeFile('06-build-page/project-dist/index.html', indexContent);
    console.log('template created');
  } catch (err) {
    console.error(err);
  }
}

async function compileStyles() {
  try {
    const stylesDir = '06-build-page/styles';
    const styles = await fs.readdir(stylesDir);
    let compiledStyles = '';
    for (const style of styles) {
      const stylePath = path.join(stylesDir, style);
      const styleContent = await fs.readFile(stylePath, 'utf-8');
      compiledStyles += styleContent;
    }
    await fs.writeFile('06-build-page/project-dist/style.css', compiledStyles);
    console.log('styles compiled successfully');
  } catch (err) {
    console.error(err);
  }
}

async function copyAssets() {
  try {
    await fs.mkdir('06-build-page/project-dist/assets');
    const assetsDir = '06-build-page/assets';
    const assets = await fs.readdir(assetsDir, { withFileTypes: true });
    for (const asset of assets) {
      const assetPath = path.join(assetsDir, asset.name);
      if (asset.isDirectory()) {
        await fs.mkdir(
          path.join('06-build-page/project-dist/assets', asset.name),
          {
            recursive: true,
          },
        );
        const subAssets = await fs.readdir(assetPath, {
          withFileTypes: true,
        });
        for (const subAsset of subAssets) {
          const subAssetPath = path.join(assetPath, subAsset.name);
          await fs.copyFile(
            subAssetPath,
            path.join(
              '06-build-page/project-dist/assets',
              asset.name,
              subAsset.name,
            ),
          );
        }
      } else {
        await fs.copyFile(
          assetPath,
          path.join('project-dist/assets', asset.name),
        );
      }
    }
    console.log('assets copied successfully');
  } catch (err) {
    console.error(err);
  }
}

async function app() {
  try {
    await createProjectDist();
    replaceTags();
    compileStyles();
    copyAssets();
    console.log('app builded');
  } catch (err) {
    console.error('Error of building file:', err);
  }
}

app();
