# 📘 智能合约部署指南

本指南将帮助您将智能水果店的合约部署到区块链上。

---

## 📋 合约说明

### FruitStore.sol - 水果店主合约

这是一个**去中心化的水果交易程序**，运行在区块链上，自动执行：

| 功能 | 说明 | 类比 |
|------|------|------|
| `addProduct()` | 供应商添加水果 | 上架商品 |
| `purchase()` | 用户购买水果 | 自动售货机扣款 |
| `updateStock()` | 更新库存 | 补货 |
| `getProduct()` | 查询产品信息 | 查看商品详情 |
| `certifySupplier()` | 认证供应商 | 商家入驻审核 |

### FRTToken.sol - 代币合约

这是**水果店专用的游戏币**（ERC20 标准）：
- 用户用 FRT 代币买水果
- 类似游乐园代币，先兑换再消费

---

## 🚀 部署方式（3 种）

### 方式 1：Remix IDE（最简单，推荐新手）

**步骤：**

1. 打开 https://remix.ethereum.org

2. 创建文件：
   - 点击左侧 "File Explorer" → "Create New File"
   - 创建 `FRTToken.sol`，粘贴代币合约代码
   - 创建 `FruitStore.sol`，粘贴主合约代码

3. 编译合约：
   - 点击左侧 "Solidity Compiler" 
   - 选择编译器版本 `0.8.19`
   - 点击 "Compile FRTToken.sol"
   - 点击 "Compile FruitStore.sol"

4. 部署代币合约：
   - 点击左侧 "Deploy & Run Transactions"
   - Environment 选择 `Injected Provider - MetaMask`
   - Contract 选择 `FRTToken`
   - 输入初始供应量（如 `1000000`）
   - 点击 "Deploy"
   - MetaMask 会弹出确认，点击确认
   - **记录部署后的合约地址**（如 `0x1234...abcd`）

5. 部署主合约：
   - Contract 选择 `FruitStore`
   - 在下方输入框填入刚才的代币合约地址
   - 点击 "Deploy"
   - **记录主合约地址**

6. 更新前端：
   - 打开 `js/contract.js`
   - 将合约地址改为你的部署地址

---

### 方式 2：Thirdweb（推荐，有管理界面）

**步骤：**

1. 打开 https://thirdweb.com

2. 连接钱包（MetaMask）

3. 创建代币合约：
   - 点击 "Deploy" → "Token"
   - 填写信息：
     - Name: `Fruit Token`
     - Symbol: `FRT`
     - Initial Supply: `1000000`
   - 选择网络（推荐 Base Sepolia 测试网）
   - 点击 "Deploy Now"

4. 创建主合约：
   - 点击 "Deploy" → "Custom Contract"
   - 上传 `FruitStore.sol`
   - 填写参数（代币合约地址）
   - 点击 "Deploy Now"

5. 使用 Thirdweb SDK 连接前端：

```javascript
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const sdk = new ThirdwebSDK("base-sepolia");
const contract = await sdk.getContract("你的合约地址");

// 购买水果
await contract.call("purchase", [productId, quantity]);

// 添加产品
await contract.call("addProduct", [name, supplier, price, stock]);
```

---

### 方式 3：Hardhat（专业开发）

**步骤：**

1. 初始化项目：
```bash
mkdir smart-fruit-store-contracts
cd smart-fruit-store-contracts
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
```

2. 复制合约到 `contracts/` 目录

3. 配置 `hardhat.config.js`：
```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    baseSepolia: {
      url: "https://sepolia.base.org",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

4. 创建部署脚本 `scripts/deploy.js`：
```javascript
async function main() {
  const [deployer] = await ethers.getSigners();
  
  // 部署代币
  const FRTToken = await ethers.getContractFactory("FRTToken");
  const frtToken = await FRTToken.deploy(1000000);
  await frtToken.deployed();
  console.log("FRT Token:", frtToken.address);
  
  // 部署主合约
  const FruitStore = await ethers.getContractFactory("FruitStore");
  const fruitStore = await FruitStore.deploy(frtToken.address);
  await fruitStore.deployed();
  console.log("Fruit Store:", fruitStore.address);
}

main();
```

5. 部署：
```bash
npx hardhat run scripts/deploy.js --network baseSepolia
```

---

## 📝 部署后配置

### 1. 更新前端合约地址

编辑 `js/contract.js`：

```javascript
const CONTRACT_ADDRESS = '你的 FruitStore 合约地址';
const TOKEN_ADDRESS = '你的 FRTToken 合约地址';
```

### 2. 获取测试代币

部署到测试网后，需要获取测试 FRT 代币：

```javascript
// 在浏览器控制台运行（连接钱包后）
const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
await token.mint(yourAddress, ethers.parseEther("1000"));
```

### 3. 添加示例产品

```javascript
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
await contract.addProduct("有机苹果", "绿源农场", 2500000000000000000, 150);
// 价格单位是 wei，2.5 FRT = 2.5 * 10^18 wei
```

---

## 🔍 验证合约

部署后可以在区块浏览器验证：

- **Base Sepolia**: https://sepolia.basescan.org
- 输入合约地址查看交易和调用记录

---

## 💡 常见问题

### Q: 部署需要多少钱？
A: 测试网（如 Base Sepolia）几乎免费。主网需要 ETH 作为 Gas 费。

### Q: 如何获取测试网 ETH？
A: 
- Base Sepolia: https://faucet.base.org
- 输入钱包地址领取

### Q: 合约部署后可以修改吗？
A: 不能。智能合约一旦部署就不可更改，如需修改需部署新合约。

### Q: 如何让用户获得 FRT 代币？
A: 可以：
1. 在合约中预留一部分代币用于空投
2. 设置一个 faucct 页面让用户领取
3. 在 Uniswap 创建 FRT/ETH 交易对让用户购买

---

## 📚 相关资源

- [Remix 文档](https://remix-ide.readthedocs.io/)
- [Thirdweb 文档](https://portal.thirdweb.com/)
- [Hardhat 文档](https://hardhat.org/)
- [Solidity 文档](https://docs.soliditylang.org/)
- [Base 测试网](https://docs.base.org/base-sepolia/)

---

## ⚠️ 安全提示

1. **永远不要泄露私钥**
2. **先部署到测试网测试**
3. **合约部署前仔细检查代码**
4. **主网部署建议进行安全审计**
