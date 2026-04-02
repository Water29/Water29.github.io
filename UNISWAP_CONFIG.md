# Uniswap 交易对配置说明

## 作业要求

根据 Task 4 要求，需要展示如何将 FRT 代币与 SSU 代币在 Uniswap 上列出交易对。

## 准备工作

### 1. 获取代币合约地址

- **FRT 代币**: 你的 FruitStore 项目发行的代币
  ```
  合约地址：0xYourFRTTokenAddress (部署后填写)
  ```

- **SSU 代币**: 作业指定的代币
  ```
  合约地址：0xYourSSUTokenAddress (从课堂获取)
  ```

### 2. 准备流动性

创建交易对需要两种代币都有一定的初始流动性：
- FRT 代币：建议 1000-10000 个
- SSU 代币：建议等值金额

## 创建交易对步骤

### 步骤 1: 访问 Uniswap

1. 打开 https://app.uniswap.org
2. 点击右上角 "Connect wallet"
3. 选择 MetaMask 并连接

### 步骤 2: 进入流动性页面

1. 点击底部导航栏的 "Pool"
2. 点击 "New position" 或 "Create a pool"

### 步骤 3: 选择代币对

1. 点击 "Select token" 选择第一个代币
2. 输入 FRT 代币合约地址
3. 点击 "Select token" 选择第二个代币
4. 输入 SSU 代币合约地址

> **注意**: 如果代币未列出，需要手动输入合约地址

### 步骤 4: 设置费用层级

Uniswap V3 提供多个费用层级：
- **0.01%**: 适用于稳定币对
- **0.05%**: 适用于相关性高的代币
- **0.3%**: 适用于大多数代币对（推荐）
- **1%**: 适用于高波动性代币

**建议**: FRT/SSU 选择 **0.3%** 费用层级

### 步骤 5: 设置初始价格

1. 输入你希望的 FRT/SSU 汇率
2. 例如：1 FRT = 0.5 SSU

### 步骤 6: 存入流动性

1. 输入你想存入的 FRT 数量
2. SSU 数量会自动计算（基于设置的价格）
3. 点击 "Approve FRT" 授权代币使用
4. 确认 MetaMask 交易
5. 点击 "Approve SSU" 授权代币使用
6. 确认 MetaMask 交易
7. 点击 "Add liquidity" 或 "Create pool"
8. 确认最终交易

### 步骤 7: 完成创建

交易确认后，流动性池创建成功！

你会收到 LP Token（流动性提供者代币），代表你在池中的份额。

## 截图清单

完成上述步骤后，请截图以下内容作为作业提交：

### 截图 1: 交易对页面
- URL: `https://app.uniswap.org/#/pool`
- 显示 FRT/SSU 交易对
- 显示流动性池详情

### 截图 2: 流动性头寸
- 显示你的流动性头寸
- 显示存入的代币数量
- 显示当前价值

### 截图 3: 代币信息
- FRT 代币在 Etherscan 的页面
- SSU 代币在 Etherscan 的页面

### 截图 4: 交易确认
- Uniswap 上的交易确认页面
- Etherscan 上的交易记录

## 代码示例

### 在前端显示 Uniswap 交易对

可以在网站添加一个链接直接跳转到 Uniswap 交易对：

```html
<a href="https://app.uniswap.org/#/swap?inputCurrency=0xFRT_ADDRESS&outputCurrency=0xSSU_ADDRESS" 
   target="_blank" 
   class="uniswap-link">
   在 Uniswap 上交易 FRT
</a>
```

### 使用 Uniswap Widget

可以在网站嵌入 Uniswap 交易 widget：

```html
<!-- 在 index.html 中添加 -->
<script src="https://unpkg.com/@uniswap/widgets@latest/dist/index.js"></script>

<div id="uniswap-widget"></div>

<script>
  const widget = new UniswapWidget.UniswapWidget({
    width: 400,
    height: 600,
    defaultToken: '0xFRT_ADDRESS',
    defaultOutputToken: '0xSSU_ADDRESS',
  });
  
  widget.render('#uniswap-widget');
</script>
```

## 作业提交格式

### 文档内容

在作业提交文档中包含：

```markdown
## Uniswap 交易对配置

### 代币信息
- FRT 代币地址：0x...
- SSU 代币地址：0x...

### 交易对信息
- 交易对地址：0x...
- 费用层级：0.3%
- 初始价格：1 FRT = X SSU
- 初始流动性：X FRT + Y SSU

### 截图
（插入上述截图）

### Uniswap 链接
https://app.uniswap.org/#/pool/0x...
```

## 常见问题

### Q1: 代币在 Uniswap 上找不到？
**A**: 手动输入合约地址。确保地址正确，网络正确。

### Q2: 创建交易对失败？
**A**: 检查：
- 是否有足够的代币余额
- 是否已授权代币使用
- Gas 费用是否充足

### Q3: 价格设置错误？
**A**: 可以在添加流动性时调整价格。创建后需要移除流动性重新创建才能改价格。

### Q4: 需要多少流动性？
**A**: 没有最低要求，但建议至少 $100 等值代币以保证交易正常。

## 相关资源

- Uniswap 官方文档：https://docs.uniswap.org
- Uniswap V3 概念：https://docs.uniswap.org/concepts/protocol/concentrated-liquidity
- 流动性提供者指南：https://docs.uniswap.org/concepts/protocol/liquidity-providing

---

**创建时间**: 2026 年 4 月
**适用于**: Task 4 作业提交
