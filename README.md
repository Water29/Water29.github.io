# 🍎 智能水果店 - 完整项目说明

> 基于 Base Sepolia 测试网的去中心化水果交易平台

---

## 📁 项目结构

```
smart-fruit-store/
├── index.html           # 首页（绿色主题）
├── products.html        # 全部产品（紫色主题）
├── orders.html          # 我的订单（粉色主题）
├── about.html           # 关于我们（蓝色主题）
├── checkout.html        # 结算页面（青绿色主题）
├── css/
│   └── style.css        # 全局样式 + 页面区分样式
├── js/
│   ├── app.js           # 应用逻辑（产品、购物车、燃油费）
│   └── contract.js      # Web3 合约交互
├── contracts/
│   └── FruitStore.sol   # Solidity 智能合约
└── README.md            # 本文件
```

---

## ✨ 核心功能

### 1️⃣ 完整的页面路由

| 页面 | 文件 | 主题色 | 功能 |
|------|------|--------|------|
| 首页 | `index.html` | 🟢 绿色 | 产品展示、分类浏览、特性介绍 |
| 全部产品 | `products.html` | 🟣 紫色 | 产品列表、筛选、搜索 |
| 我的订单 | `orders.html` | 🔴 粉色 | 订单历史、交易记录 |
| 关于 | `about.html` | 🔵 蓝色 | 项目说明、技术栈、使用指南 |
| 结算 | `checkout.html` | 🔷 青绿 | 订单确认、MetaMask 支付 |

### 2️⃣ MetaMask 钱包连接

- 🦊 真实的 MetaMask 连接
- 💼 显示项目钱包地址
- 🔗 钱包地址脱敏显示
- ✅ 连接状态持久化

**连接流程：**
```
点击"连接钱包" → MetaMask 弹窗 → 用户确认 → 显示钱包地址
```

### 3️⃣ 10% 燃油费系统

**费用计算：**
```
商品小计：10.00 FRT
燃油费 (10%): 1.00 FRT
─────────────────────
总计：11.00 FRT
```

**燃油费用途：**
- 支付区块链网络 Gas 费用
- 补偿矿工/验证者处理交易
- 确保交易快速确认

### 4️⃣ 购物车系统

- 🛒 添加/移除商品
- ➕ 数量调整
- 💰 实时价格计算
- 📊 燃油费自动计算
- 💾 LocalStorage 持久化

### 5️⃣ 支付流程

```
1. 选择商品 → 加入购物车
2. 点击结算 → 跳转 checkout.html
3. 连接 MetaMask → 确认钱包
4. 确认支付 → MetaMask 签名
5. 交易成功 → 显示 TX Hash
6. 查看订单 → 区块链浏览器
```

---

## 🎨 页面区分度设计

### 视觉区分

每个页面有独特的渐变色：

```css
.page-home .header     { background: 白色 }
.page-products .header { background: 紫色渐变 #667eea → #764ba2 }
.page-orders .header   { background: 粉色渐变 #f093fb → #f5576c }
.page-about .header    { background: 蓝色渐变 #4facfe → #00f2fe }
.page-checkout .header { background: 青绿渐变 #11998e → #38ef7d }
```

### 导航状态

- 当前页面导航高亮显示
- 统一的导航结构
- 响应式设计

---

## 🔧 技术实现

### 前端技术

| 技术 | 用途 |
|------|------|
| HTML5 | 页面结构 |
| CSS3 | 样式、渐变、动画 |
| JavaScript | 交互逻辑 |
| LocalStorage | 购物车持久化 |

### Web3 技术

| 技术 | 用途 |
|------|------|
| MetaMask | 钱包连接、交易签名 |
| Base Sepolia | 区块链网络 |
| Solidity | 智能合约 |
| Ethers.js | 合约交互（待部署） |

---

## 🚀 快速开始

### 步骤 1：启动服务器

```bash
cd /home/admin/.openclaw/workspace/smart-fruit-store
python3 -m http.server 8080
```

### 步骤 2：访问页面

打开浏览器访问：http://localhost:8080

### 步骤 3：安装 MetaMask（如未安装）

1. 访问 https://metamask.io/download/
2. 下载并安装浏览器扩展
3. 创建或导入钱包
4. 切换到 Base Sepolia 测试网

### 步骤 4：获取测试币

访问 https://faucet.base.org/ 领取测试 ETH

---

## 💡 使用指南

### 购物流程

1. **浏览产品**
   - 首页查看推荐产品
   - 产品页筛选和搜索

2. **添加到购物车**
   - 点击"🛒 加入购物车"
   - 或"⚡ 立即购买"直接结算

3. **结算支付**
   - 点击购物车图标
   - 查看商品和费用明细
   - 点击"立即结算"

4. **连接钱包**
   - 点击"🦊 连接 MetaMask"
   - 在 MetaMask 中确认连接

5. **确认支付**
   - 核对订单金额（含 10% 燃油费）
   - 点击"确认支付"
   - 在 MetaMask 中签名交易

6. **查看订单**
   - 支付成功后显示交易哈希
   - 点击"查看订单"查看历史
   - 点击"查看区块链交易"跳转区块浏览器

---

## 📊 智能合约

### FruitStore.sol

```solidity
// 主要功能
- addProduct()      // 添加产品
- purchase()        // 购买产品
- updateStock()     // 更新库存
- getProduct()      // 查询产品
- certifySupplier() // 认证供应商
```

### FRTToken.sol

```solidity
// ERC20 代币功能
- transfer()        // 转账
- approve()         // 授权
- transferFrom()    // 授权转账
- mint()            // 铸造
```

### 合约地址

**项目钱包：**
```
0xDC605ba6B29321F50e49966B0e9A4770FAc00058
```

**部署后更新：**
- `js/contract.js` 中的 `CONTRACT_ADDRESS`
- `checkout.html` 中的合约信息显示

---

## 🔍 页面功能详情

### 首页 (index.html)

- 英雄横幅（Web3 说明）
- 分类浏览（4 个类别）
- 热门产品（动态加载）
- 特性介绍（区块链、FRT、安全、燃油费）
- 燃油费提示

### 产品页 (products.html)

- 页面头部（紫色渐变）
- 筛选按钮（全部/时令/有机/进口/礼盒）
- 搜索框（产品名称/供应商）
- 产品网格（图片、名称、价格、库存、按钮）
- 燃油费说明区域

### 订单页 (orders.html)

- 页面头部（粉色渐变）
- 订单卡片（订单号、TX Hash、状态、时间）
- 订单详情（商品列表、小计、燃油费、总计）
- 区块链交易链接

### 关于页 (about.html)

- 项目介绍
- 燃油费说明
- 技术栈展示
- 项目信息
- 使用指南
- 相关链接

### 结算页 (checkout.html)

- 步骤指示器
- 订单详情
- 价格摘要（小计、燃油费、总计）
- 项目钱包显示
- MetaMask 连接
- 支付按钮
- 成功弹窗

---

## ⚠️ 注意事项

### MetaMask 配置

1. **网络切换**
   - 确保使用 Base Sepolia 测试网
   - Network ID: 84532
   - RPC URL: https://sepolia.base.org

2. **测试币获取**
   - https://faucet.base.org/
   - 每次可领取少量测试 ETH

3. **安全提示**
   - 不要泄露私钥
   - 不要分享助记词
   - 仅连接可信网站

### 燃油费说明

- 燃油费固定为商品总价的 10%
- 燃油费用于模拟区块链 Gas 费用
- 实际部署时会根据网络情况调整

---

## 📝 作业提交清单

### Task 3 (Tokenomics 10%)

- [x] FRT 代币合约（ERC20）
- [x] 代币经济模型说明
- [ ] 部署到测试网
- [ ] Uniswap 交易对配置

### Task 4 (Smart Banking 15%)

- [x] 智能水果店前端界面
- [x] 5 个完整页面（路由完善）
- [x] MetaMask 钱包连接
- [x] 支付流程实现
- [x] 10% 燃油费系统
- [x] 订单管理页面
- [ ] 智能合约部署
- [ ] 真实交易测试

---

## 🔗 相关链接

| 资源 | 链接 |
|------|------|
| Base Sepolia 浏览器 | https://sepolia.basescan.org/ |
| Base 测试币水龙头 | https://faucet.base.org/ |
| MetaMask 下载 | https://metamask.io/download/ |
| Remix IDE | https://remix.ethereum.org/ |
| Solidity 文档 | https://docs.soliditylang.org/ |

---

## 🎓 项目亮点

1. **完整的页面路由** - 5 个功能完整的页面
2. **独特的视觉设计** - 每个页面有独立主题色
3. **真实的 Web3 集成** - MetaMask 连接和支付
4. **燃油费系统** - 10% Gas Fee 自动计算
5. **响应式设计** - 适配移动端和桌面端
6. **购物车持久化** - LocalStorage 保存状态
7. **订单管理** - 交易记录和区块链链接

---

**🎉 项目完成！祝作业顺利！**
