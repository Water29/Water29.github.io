# 🍎 智能水果店 - 快速开始指南

## 📁 项目结构

```
smart-fruit-store/
├── index.html           # 主页（画廊风格展示）
├── all-products.html    # 全部产品页面 ✅ 新增
├── checkout.html        # 结算购买页面 ✅ 新增
├── mint.html            # 供应商上架页面
├── css/
│   └── style.css        # 样式文件
├── js/
│   ├── app.js           # 应用逻辑（产品、购物车）
│   └── contract.js      # Web3 合约交互
├── contracts/
│   └── FruitStore.sol   # 智能合约代码
├── DEPLOYMENT.md        # 合约部署指南
└── README.md            # 项目说明
```

---

## 🚀 快速运行（无需区块链）

### 步骤 1：启动本地服务器

```bash
cd /home/admin/.openclaw/workspace/smart-fruit-store
python3 -m http.server 8080
```

### 步骤 2：访问页面

打开浏览器访问：
- **主页**: http://localhost:8080/index.html
- **全部产品**: http://localhost:8080/all-products.html
- **结算页面**: http://localhost:8080/checkout.html
- **供应商上架**: http://localhost:8080/mint.html

### 步骤 3：体验功能

✅ 可以立即使用的功能：
- 浏览水果产品
- 分类筛选
- 搜索产品
- 添加到购物车
- 结算流程（演示模式）

⚠️ 需要部署合约后才能使用：
- 真实钱包支付
- 区块链订单记录
- 供应商上架产品

---

## 🔗 智能合约说明

### 合约是什么？

**智能合约 = 运行在区块链上的自动程序**

想象一个自动售货机：
```
你投币 → 选择商品 → 自动出货 → 无法作弊
```

智能合约也是这样：
```
你支付 → 调用购买函数 → 自动转账 + 记录订单 → 无法篡改
```

### 本项目有两个合约：

#### 1️⃣ FRTToken.sol - 代币合约
- 创建"水果币"（FRT）
- 用户用 FRT 买水果
- 类似游戏厅代币

#### 2️⃣ FruitStore.sol - 商店合约
| 函数 | 作用 | 谁可以调用 |
|------|------|-----------|
| `addProduct()` | 添加水果 | 认证供应商 |
| `purchase()` | 购买水果 | 任何人 |
| `updateStock()` | 更新库存 | 供应商 |
| `getProduct()` | 查询产品 | 任何人 |
| `certifySupplier()` | 认证供应商 | 管理员 |

---

## 📝 部署合约（可选）

如果作业要求部署真实合约，参考 `DEPLOYMENT.md`

### 最简单方式：Remix IDE

1. 打开 https://remix.ethereum.org
2. 创建 `FRTToken.sol` 和 `FruitStore.sol`
3. 编译 → 部署到测试网（Base Sepolia）
4. 记录合约地址
5. 更新 `js/contract.js` 中的地址

### 部署后测试

```javascript
// 在浏览器控制台（连接 MetaMask 后）

// 1. 获取代币
await token.mint(yourAddress, ethers.parseEther("1000"));

// 2. 添加产品
await contract.addProduct("苹果", "农场", 2500000000000000000, 150);

// 3. 购买产品
await contract.purchase(1, 2);
```

---

## 📊 作业提交清单

### Task 3 (Tokenomics 10%)
- [x] 创建 FRT 代币合约
- [x] ERC20 标准实现
- [ ] 部署到测试网（需要时）
- [ ] 创建 Uniswap 交易对（需要时）

### Task 4 (Smart Banking 15%)
- [x] 智能水果店前端界面
- [x] FruitStore 智能合约
- [x] 购买流程实现
- [ ] 部署到测试网（需要时）
- [ ] 截图和合约地址（需要时）

---

## ❓ 常见问题

### Q: 页面打不开？
A: 确保用 `http-server` 或 `python3 -m http.server` 启动，不要直接双击 HTML 文件。

### Q: 购物车不能用？
A: 检查浏览器控制台是否有错误。确保 `app.js` 正确加载。

### Q: 合约看不懂？
A: 合约就是一个自动程序。用户调用 `purchase()` 函数，合约自动检查库存、扣款、生成订单。

### Q: 必须部署合约吗？
A: 取决于作业要求。演示模式可以不用真实合约。

---

## 📚 参考资源

- [Remix IDE](https://remix.ethereum.org/) - 在线编译部署合约
- [Base Sepolia 测试网](https://docs.base.org/base-sepolia/) - 免费测试
- [测试币水龙头](https://faucet.base.org/) - 领取测试 ETH

---

**祝作业顺利！🎓**
