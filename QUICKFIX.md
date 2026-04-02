# 🔧 立即修复购物车显示 0 的问题

## 快速诊断（30 秒）

### 第 1 步：打开测试页面
访问 http://localhost:9000/test-cart.html

### 第 2 步：点击"添加测试商品"
这会添加测试数据到购物车

### 第 3 步：点击"去结算页"
查看费用是否正确显示

---

## 如果还是显示 0，请按 F12 打开控制台，运行：

```javascript
// 1. 检查 cart 变量
console.log('cart 变量:', typeof cart, cart);

// 2. 检查 localStorage
console.log('localStorage:', localStorage.getItem('fruitStoreCart'));

// 3. 手动加载购物车
loadCart();
console.log('加载后的 cart:', cart);

// 4. 手动渲染
renderOrderSummary();
```

---

## 最可能的原因

### 原因 1：浏览器缓存了旧版本

**解决：**
```
按 Ctrl+Shift+R (Windows) 或 Cmd+Shift+R (Mac) 强制刷新
```

### 原因 2：localStorage 中没有数据

**解决：**
1. 访问 http://localhost:9000/products.html
2. 点击任意商品的"加入购物车"
3. 然后再访问 checkout.html

### 原因 3：浏览器隐私模式阻止 localStorage

**解决：**
- 退出隐私/无痕模式
- 使用正常浏览模式

---

## 手动设置测试数据

在 checkout.html 的控制台运行：

```javascript
// 设置测试购物车数据
localStorage.setItem('fruitStoreCart', JSON.stringify([
    {id: 1, name: '测试苹果', price: 2.5, quantity: 2, image: '🍎'},
    {id: 2, name: '测试香蕉', price: 1.8, quantity: 1, image: '🍌'}
]));

// 刷新页面
location.reload();
```

刷新后应该看到：
```
商品小计：6.80 FRT
⛽ 燃油费 (10%): 0.68 FRT
总计：7.48 FRT
```

---

## 检查服务器是否最新

在 checkout.html 页面，按 F12 打开控制台，查看：

```javascript
// 检查 loadCart 函数是否存在
console.log(typeof loadCart);  // 应该显示 "function"

// 检查 cart 数组
console.log(Array.isArray(cart));  // 应该显示 true
```

如果显示 undefined，说明 app.js 没有正确加载。

---

## 终极解决方案

如果以上都无效，运行这个完整修复：

```javascript
// 在 checkout.html 控制台运行

// 1. 清除旧数据
localStorage.clear();

// 2. 设置测试数据
const testCart = [
    {id: 1, name: '有机红富士苹果', price: 2.5, quantity: 2, image: '🍎'},
    {id: 2, name: '进口香蕉', price: 1.8, quantity: 1, image: '🍌'}
];
localStorage.setItem('fruitStoreCart', JSON.stringify(testCart));

// 3. 检查数据
console.log('购物车数据:', JSON.parse(localStorage.getItem('fruitStoreCart')));

// 4. 手动计算并显示
const cart = testCart;
const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
const gasFee = subtotal * 0.1;
const total = subtotal + gasFee;

console.log(`
═══════════════════════════════════════
  商品小计：     ${subtotal.toFixed(2)} FRT
  燃油费 (10%):  ${gasFee.toFixed(2)} FRT
  ─────────────────────────────────────
  总计：         ${total.toFixed(2)} FRT
═══════════════════════════════════════
`);

// 5. 如果手动计算正确，说明是代码问题
// 刷新页面重新加载
location.reload();
```

---

## 预期结果

修复后，checkout.html 应该显示：

```
┌─────────────────────────────────────┐
│  📋 订单详情                         │
├─────────────────────────────────────┤
│  🍎 有机红富士苹果 × 2               │
│                    5.00 FRT         │
│                                     │
│  🍌 进口香蕉 × 1                    │
│                    1.80 FRT         │
├─────────────────────────────────────┤
│  商品小计          6.80 FRT         │
│  ⛽ 燃油费 (10%)    0.68 FRT         │
│  ─────────────────────────────────  │
│  总计              7.48 FRT         │
└─────────────────────────────────────┘
```

---

## 需要帮助？

运行测试页面并截图：
http://localhost:9000/test-cart.html

截图包含：
1. 购物车数据显示
2. localStorage 检查
3. 控制台日志

这样可以快速定位问题所在。
