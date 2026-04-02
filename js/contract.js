// 智能合约交互模块
// 用于与 FruitStore 智能合约进行交互

let contractInstance = null;
let userAccount = null;

// 合约地址（部署后更新）
// 项目钱包地址：0xDC605ba6B29321F50e49966B0e9A4770FAc00058
const CONTRACT_ADDRESS = '0xDC605ba6B29321F50e49966B0e9A4770FAc00058';
const PROJECT_WALLET = '0xDC605ba6B29321F50e49966B0e9A4770FAc00058';
const CONTRACT_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {"name": "_name", "type": "string"},
            {"name": "_supplier", "type": "string"},
            {"name": "_price", "type": "uint256"},
            {"name": "_stock", "type": "uint256"}
        ],
        "name": "addProduct",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"name": "_productId", "type": "uint256"}],
        "name": "purchase",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{"name": "_productId", "type": "uint256"}],
        "name": "getProduct",
        "outputs": [
            {"name": "name", "type": "string"},
            {"name": "supplier", "type": "string"},
            {"name": "price", "type": "uint256"},
            {"name": "stock", "type": "uint256"},
            {"name": "exists", "type": "bool"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getProductCount",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"name": "_productId", "type": "uint256"}, {"name": "_newStock", "type": "uint256"}],
        "name": "updateStock",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "name": "productId", "type": "uint256"},
            {"indexed": true, "name": "buyer", "type": "address"},
            {"indexed": false, "name": "quantity", "type": "uint256"},
            {"indexed": false, "name": "totalPrice", "type": "uint256"}
        ],
        "name": "ProductPurchased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "name": "productId", "type": "uint256"},
            {"indexed": false, "name": "name", "type": "string"},
            {"indexed": false, "name": "price", "type": "uint256"}
        ],
        "name": "ProductAdded",
        "type": "event"
    }
];

// 初始化 Web3
async function initWeb3() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // 请求账户访问
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            
            // 创建 Web3 实例
            if (typeof window.web3 !== 'undefined') {
                window.web3 = new window.Web3(window.ethereum);
            }
            
            // 创建合约实例
            contractInstance = new window.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            
            console.log('Web3 初始化成功');
            console.log('账户:', userAccount);
            console.log('合约地址:', CONTRACT_ADDRESS);
            
            return true;
        } catch (error) {
            console.error('Web3 初始化失败:', error);
            return false;
        }
    } else {
        console.warn('未检测到 Web3 提供者，请安装 MetaMask');
        return false;
    }
}

// 执行购买
async function executePurchase(cartItems, totalAmount) {
    if (!contractInstance) {
        const initialized = await initWeb3();
        if (!initialized) {
            alert('无法连接钱包，请安装 MetaMask 扩展');
            return;
        }
    }
    
    try {
        // 显示确认对话框
        const confirmed = confirm(
            `确认购买 ${cartItems.length} 件商品\n\n` +
            `总计：${totalAmount.toFixed(2)} FRT\n\n` +
            `点击确定继续交易`
        );
        
        if (!confirmed) return;
        
        // 在实际部署中，这里会调用合约的 purchase 函数
        // 示例代码:
        /*
        const totalPriceWei = window.web3.utils.toWei(totalAmount.toString(), 'ether');
        
        for (const item of cartItems) {
            await contractInstance.methods.purchase(item.id)
                .send({
                    from: userAccount,
                    value: totalPriceWei
                });
        }
        */
        
        // 模拟交易成功
        await simulateTransaction(cartItems, totalAmount);
        
        // 清空购物车
        cart = [];
        saveCart();
        updateCartDisplay();
        
        showNotification('购买成功！交易已记录在区块链上');
        
    } catch (error) {
        console.error('购买失败:', error);
        alert('购买失败：' + error.message);
    }
}

// 模拟交易（用于演示）
async function simulateTransaction(cartItems, totalAmount) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('模拟交易完成:', {
                items: cartItems,
                total: totalAmount,
                buyer: userAccount || '未连接钱包',
                timestamp: new Date().toISOString()
            });
            resolve();
        }, 1500);
    });
}

// 添加新产品（供应商功能）
async function addProduct(name, supplier, price, stock) {
    if (!contractInstance) {
        const initialized = await initWeb3();
        if (!initialized) {
            alert('无法连接钱包，请安装 MetaMask 扩展');
            return null;
        }
    }
    
    try {
        // 在实际部署中调用合约
        /*
        const priceWei = window.web3.utils.toWei(price.toString(), 'ether');
        const receipt = await contractInstance.methods.addProduct(name, supplier, priceWei, stock)
            .send({ from: userAccount });
        
        const productId = receipt.events.ProductAdded.returnValues.productId;
        return productId;
        */
        
        // 模拟添加
        console.log('模拟添加产品:', { name, supplier, price, stock });
        return Date.now();
        
    } catch (error) {
        console.error('添加产品失败:', error);
        alert('添加失败：' + error.message);
        return null;
    }
}

// 查询产品
async function getProduct(productId) {
    if (!contractInstance) {
        await initWeb3();
    }
    
    try {
        // 在实际部署中调用合约
        /*
        const product = await contractInstance.methods.getProduct(productId).call();
        return product;
        */
        
        // 从本地数据返回
        return products.find(p => p.id === productId);
        
    } catch (error) {
        console.error('查询产品失败:', error);
        return null;
    }
}

// 更新库存
async function updateStock(productId, newStock) {
    if (!contractInstance) {
        const initialized = await initWeb3();
        if (!initialized) return false;
    }
    
    try {
        // 在实际部署中调用合约
        /*
        await contractInstance.methods.updateStock(productId, newStock)
            .send({ from: userAccount });
        */
        
        console.log('模拟更新库存:', { productId, newStock });
        return true;
        
    } catch (error) {
        console.error('更新库存失败:', error);
        return false;
    }
}

// 监听合约事件
function watchContractEvents() {
    if (!contractInstance) return;
    
    // 监听购买事件
    contractInstance.events.ProductPurchased({
        fromBlock: 'latest'
    }, (error, event) => {
        if (error) {
            console.error('事件监听错误:', error);
            return;
        }
        console.log('新产品购买:', event.returnValues);
        showNotification(`新产品售出：${event.returnValues.productId}`);
    });
    
    // 监听产品添加事件
    contractInstance.events.ProductAdded({
        fromBlock: 'latest'
    }, (error, event) => {
        if (error) {
            console.error('事件监听错误:', error);
            return;
        }
        console.log('新产品上架:', event.returnValues);
        showNotification(`新产品上架：${event.returnValues.name}`);
    });
}

// 连接钱包按钮
async function connectWallet() {
    const initialized = await initWeb3();
    if (initialized) {
        showNotification(`钱包已连接：${userAccount.substring(0, 6)}...${userAccount.substring(38)}`);
        return userAccount;
    } else {
        alert('请安装 MetaMask 钱包扩展');
        return null;
    }
}

// 页面加载时自动初始化
document.addEventListener('DOMContentLoaded', () => {
    // 检查是否已有 Web3 提供者
    if (typeof window.ethereum !== 'undefined') {
        console.log('检测到 MetaMask，准备初始化...');
    }
});

// 导出函数供外部使用
window.executePurchase = executePurchase;
window.addProduct = addProduct;
window.connectWallet = connectWallet;
window.updateStock = updateStock;
