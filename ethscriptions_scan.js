const crypto = require('crypto');
const axios = require('axios');
const fs = require('fs');

function queryContent(content) {
  content = "data:," + content;
  const sha256Hash = crypto.createHash('sha256').update(content).digest('hex');

  //const url = `https://eth-script-indexer-eca25c4cf43b.herokuapp.com/api/ethscriptions/exists/${sha256Hash}`;
  const url = `https://mainnet-api.ethscriptions.com/api/ethscriptions/exists/${sha256Hash}`;

  return axios.get(url)
    .then(response => {
      if (response.status === 200) {
        const result = response.data;
        return { content, result };
      } else {
        return null;
      }
    })
    .catch(error => {
      console.log(`\n錯誤訊息: ${error.message}`);
      return null;
    });
}

(async () => {
  const inputs = [];
  for (let number = 1; number < 50; number++) {
    const content = `{"p":"erc-20","op":"mint","tick":"eths","id":"${number}","amt":"1000"}`;
    inputs.push(content);
  }

  const promises = inputs.map(content => queryContent(content));
  const responses = await Promise.allSettled(promises);

  let hexContents = ""; // 儲存所有 hexContent 的資料

  responses.forEach((response, index) => {
    if (response.status === 'fulfilled') {
      const { content, result } = response.value;
      if (result.result) {
        const owner = result.ethscription.current_owner;
        const creator = result.ethscription.creator;
        let creationTimestamp = result.ethscription.creation_timestamp;

        // 轉換時間格式
        creationTimestamp = new Date(creationTimestamp).toISOString();

        console.log(`\n'${content}'已經被刻錄。`);
        console.log(`持有者：${owner}`);
        console.log(`建立者：${creator}`);
        console.log(`建立時間：${creationTimestamp}`);
      } else {
        const hexContent = Buffer.from(content).toString('hex');
        console.log(`\n'${content}'的铭文内容尚未被铭刻。`);
        console.log(`將文字（含data:,）的16進位輸出為：${hexContent}`);

        // 將 hexContent 加入到 hexContents 中，並加入換行符 \n
        hexContents += `${hexContent}\n`;
      }
    } else {
      console.log(`\n獲取'${inputs[index]}'的數據失敗，請檢查是否輸入正確。`);
    }
  });

  // 將 hexContents 寫入 txt 文件中
  fs.writeFileSync(`hexContents_${Date.now()}.txt`, hexContents);
})();
