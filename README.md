# ethscriptions_scan
API source：[https://docs.ethscriptions.com/api-docs/api-overview](https://docs.ethscriptions.com/api-docs/api-overview)

1. Install node.js [Node.js](https://nodejs.org/en/download)    

2. Check Node.js vesion
`node -v`

3. cd ethscriptions_scan folder and install the necessary dependencies. `npm install` and `npm install axios`

4. Final run `node ethscriptions_scan.js `

# Notice
- **Set the search range number (limit = 1000)**

  for (let number = `1`; number < `5`; number++) {

- **Modify the `tick` identifier and amt limit**

  {"p":"erc-20","op":"mint","tick":"`eths`","id":"${number}","amt":"`1000`"}

- Finally, a .**txt** file will be generated in the folder, with each line representing a hexadecimal code.

## Donate  
```
0xA9343AF1fe30da20B297d48D686784cD89dc78E5
```
