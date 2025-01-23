/* eslint-disable no-console */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

(async () => {
  console.log(`====== Start update latest.yml with .blockmap info! ======`);
  const outDir = `${__dirname}\\release\\build`;

  // 取得目錄下的所有檔案
  const files = fs.readdirSync(outDir);

  // // blockmap 檔案名
  const blockmapFileName = files.find((file) => file.endsWith('.exe.blockmap'));
  const blockmapFile = path.join(outDir, blockmapFileName);

  // latest.yml 的路徑
  const ymlFile = path.join(outDir, 'latest.yml');

  // 確認 blockmap 檔案存在
  if (!fs.existsSync(blockmapFile)) {
    console.error(`Blockmap file not found: ${blockmapFile}`);
    return;
  }

  // 取得檔案大小（bytes）
  const fileSize = fs.statSync(blockmapFile).size;

  // 計算 blockmap 的 SHA-512
  const hash = crypto.createHash('sha512');
  const fileStream = fs.createReadStream(blockmapFile);

  let sha512Hash = '';

  // 取得 blockmap sha512
  await new Promise((resolve, reject) => {
    fileStream.on('data', (chunk) => hash.update(chunk));
    fileStream.on('end', () => {
      sha512Hash = hash.digest('base64');
      resolve();
    });
    fileStream.on('error', () => {
      console.log('Get blockmap sha512 Error');
      reject();
    });
  });

  // log blockmap info
  console.log(`Blockmap size: ${fileSize} bytes`);
  console.log(`SHA512 for blockmap: ${sha512Hash}`);

  // 確認 latest.yml 存在
  if (!fs.existsSync(ymlFile)) {
    console.error(`latest.yml not found: ${ymlFile}`);
    return;
  }

  try {
    // 讀取 latest.yml
    const ymlContent = fs.readFileSync(ymlFile, 'utf8');
    const ymlData = yaml.load(ymlContent);

    // 4. 在 ymlData.files 中插入或更新 blockmap 檔案資訊
    if (!Array.isArray(ymlData.files)) {
      // 若不存在 files: 區塊，就初始化一個
      ymlData.files = [];
    }

    // 找看看有沒有已有的 blockmap 條目
    let blockmapEntry = ymlData.files.find((file) => {
      return file.url && file.url.endsWith('.exe.blockmap');
    });

    // 若沒有，新增一個
    if (!blockmapEntry) {
      blockmapEntry = {};
      ymlData.files.push(blockmapEntry);
    }

    // 更新資料
    blockmapEntry.url = blockmapFileName;
    blockmapEntry.size = fileSize;
    blockmapEntry.sha512 = sha512Hash;

    // 5. 將更新過的物件再 dump 回 YAML
    const updatedYml = yaml.dump(ymlData, {
      lineWidth: -1,
    });
    fs.writeFileSync(ymlFile, updatedYml, 'utf8');

    console.log(`====== latest.yml updated with .blockmap info! ======`);
  } catch (error) {
    console.log('Error:');
    console.log(error);
  }
})();
