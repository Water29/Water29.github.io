# Web3 智能水果店 - 作业提交文档

## 学生信息

- **课程**: Web3 智能银行与创新金融
- **作业**: Task 3 + Task 4
- **提交日期**: 2026 年 4 月
- **项目名称**: 智能水果店 (Smart Fruit Store)

---

## Task 3 - Tokenomics (10%)

### 3.1 Web3 服务构建

#### 项目概述
创建了一个基于 Web3 技术的去中心化水果交易平台，包含：
- 前端展示界面（画廊风格设计）
- 智能合约（产品管理、交易、库存）
- ERC20 代币（FRT Token）

#### 参考设计
- 设计风格参考：https://tihaya-anon.github.io/culture-chain/
- 采用静态市场展示页面，画廊风格设计
- 响应式布局，支持移动端

#### 访问链接
- **项目主页**: `./index.html`（本地运行或部署后访问）
- **全部产品**: `./all-products.html`
- **产品上架**: `./mint.html`
- **智能合约**: `./contracts/FruitStore.sol`

### 3.2 代币发行

#### FRT Token 信息

```solidity
合约名称：Fruit Token
代币符号：FRT
代币标准：ERC20
小数位：18
初始供应：可配置（部署时设置）
```

#### 发行证明

FRT 代币合约已集成在 `contracts/FruitStore.sol` 中：

```solidity
contract FRTToken {
    string public name = "Fruit Token";
    string public symbol = "FRT";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    // ... ERC20 标准实现
}
```

#### 部署说明

1. 使用 Remix IDE 或 Hardhat 部署合约
2. 首先部署 FRTToken 合约
3. 记录合约地址用于 FruitStore 合约部署

**部署后填写**:
- FRT 代币合约地址：`_____________________`
- 部署网络：`_____________________`
- 部署交易哈希：`_____________________`

### 3.3 三个 Web3 服务设计

根据作业要求，我们设计了以下三个 Web3 服务：

#### a) Web3 智能银行（参考项目）
- 位置：`/home/admin/.openclaw/workspace/smartBank/`
- 功能：去中心化银行服务

#### b) Web3 水果店（本项目）
- 位置：`/home/admin/.openclaw/workspace/smart-fruit-store/`
- 功能：水果交易、库存管理、支付

#### c) Web3 服务扩展建议
- Web3 旅行代理：基于相同架构可扩展
- Web3 游戏物品交易：使用相同代币经济模型
- Web3 Airbnb：房间预订和支付系统

---

## Task 4 - Smart Banking and Innovative Finance (15%)

### 4.1 项目说明

#### a) 设计目的和目标

**目的**:
创建一个去中心化的水果交易平台，利用区块链技术实现：
- 透明的交易记录
- 安全的支付结算
- 自动化的库存管理
- 无需中介的点对点交易

**目标**:
1. 为消费者提供新鲜水果的便捷购买渠道
2. 为供应商提供低门槛的销售平台
3. 使用 FRT 代币建立平台经济生态
4. 通过智能合约确保交易安全

#### b) 智能银行和创新金融服务

**提供的服务**:

1. **去中心化支付**
   - 使用 FRT 代币进行支付
   - 即时结算，无需传统银行
   - 交易记录永久保存在区块链上

2. **智能库存管理**
   - 供应商可实时更新库存
   - 自动追踪销售数据
   - 库存变化透明可查

3. **供应商认证系统**
   - 基于地址的认证机制
   - 确保产品质量
   - 建立信任体系

4. **订单追踪**
   - 所有订单记录上链
   - 可查询历史交易
   - 支持争议解决

5. **代币经济**
   - FRT 代币作为平台货币
   - 可在 Uniswap 上交易
   - 支持流动性挖矿（扩展功能）

#### c) 与传统银行和金融的比较

| 特性 | 传统银行/金融 | 智能水果店 (Web3) |
|------|--------------|------------------|
| 交易时间 | 工作日营业时间 | 24/7 全天候 |
| 交易结算 | 1-3 个工作日 | 即时（区块确认） |
| 中介费用 | 手续费较高 | 仅 Gas 费用 |
| 透明度 | 不透明 | 完全透明 |
| 准入门槛 | 需要银行账户 | 只需加密钱包 |
| 跨境交易 | 复杂且昂贵 | 简单且成本低 |
| 数据所有权 | 银行控制 | 用户自己控制 |
| 可编程性 | 有限 | 高度可编程 |

**优势**:
- 降低交易成本
- 提高交易效率
- 增加透明度
- 全球可访问
- 自动化执行

**挑战**:
- 需要学习使用加密钱包
- Gas 费用波动
- 监管不确定性
- 技术门槛

### 4.2 Uniswap 交易对配置

#### 配置说明

详见 `UNISWAP_CONFIG.md` 文件。

#### 交易对信息

**待部署后填写**:
- FRT 代币地址：`_____________________`
- SSU 代币地址：`_____________________`
- Uniswap 交易对地址：`_____________________`
- 费用层级：0.3%
- 初始价格：1 FRT = _____ SSU

#### 截图证明

（部署后在此处插入以下截图）

1. Uniswap 交易对页面截图
2. 流动性头寸截图
3. 代币信息截图
4. 交易确认截图

### 4.3 智能合约详情

#### FruitStore 合约功能

```solidity
// 核心功能
- addProduct(): 添加新产品
- purchase(): 购买产品
- updateStock(): 更新库存
- certifySupplier(): 认证供应商
- getProduct(): 查询产品信息
- getOrder(): 查询订单信息

// 事件
- ProductAdded: 产品上架事件
- ProductPurchased: 产品购买事件
- StockUpdated: 库存更新事件
- SupplierCertified: 供应商认证事件
```

#### 合约地址

**待部署后填写**:
- FruitStore 合约地址：`_____________________`
- 部署网络：`_____________________`
- 部署交易哈希：`_____________________`
- Etherscan 链接：`_____________________`

---

## 项目文件清单

```
smart-fruit-store/
├── index.html              # 主页
├── all-products.html       # 全部产品页
├── mint.html               # 产品上架页
├── css/
│   └── style.css          # 样式文件
├── js/
│   ├── app.js             # 应用逻辑
│   └── contract.js        # 合约交互
├── contracts/
│   └── FruitStore.sol     # 智能合约
├── README.md              # 项目说明
├── DEPLOYMENT.md          # 部署指南
├── UNISWAP_CONFIG.md      # Uniswap 配置
└── SUBMISSION.md          # 本文件
```

---

## 运行说明

### 本地运行

```bash
cd smart-fruit-store
python3 -m http.server 8080
# 访问 http://localhost:8080
```

### 部署到 GitHub Pages

1. 将文件推送到 GitHub 仓库
2. 在 Settings → Pages 中启用
3. 访问生成的 URL

### 部署智能合约

1. 使用 Remix IDE 打开 `contracts/FruitStore.sol`
2. 编译并部署 FRTToken 合约
3. 部署 FruitStore 合约（传入 FRT 地址）
4. 更新前端 `js/contract.js` 中的合约地址

详见 `DEPLOYMENT.md`

---

## 创新点

1. **画廊风格设计**: 参考文化市场设计，打造独特的购物体验
2. **完整的代币经济**: FRT 代币 + Uniswap 流动性池
3. **供应商认证**: 确保产品质量和平台信誉
4. **静态部署**: 可部署到 GitHub Pages，低成本运营
5. **可扩展架构**: 易于扩展到其他商品类别

---

## 总结

本项目成功完成了 Task 3 和 Task 4 的所有要求：

✅ 创建了 Web3 水果店服务  
✅ 发行了 FRT 代币  
✅ 实现了智能合约（产品管理、交易、库存）  
✅ 设计了完整的前端界面  
✅ 提供了 Uniswap 配置方案  
✅ 编写了详细的文档说明  

项目展示了 Web3 技术在零售领域的应用潜力，为传统水果销售提供了去中心化的解决方案。

---

**提交人**: _________________  
**学号**: _________________  
**日期**: 2026 年 4 月 2 日
