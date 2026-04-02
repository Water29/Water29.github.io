// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title FruitStore - 智能水果店合约
 * @author Smart Fruit Store Team
 * @notice 实现水果交易、库存管理、支付等功能的去中心化智能合约
 */
contract FruitStore {
    
    // 产品结构体
    struct Product {
        uint256 id;
        string name;
        string supplier;
        uint256 price;          // 价格（以 FRT 代币计）
        uint256 stock;          // 库存数量
        uint256 sold;           // 已售数量
        bool exists;            // 是否存在
        address supplierAddr;   // 供应商地址
        uint256 createdAt;      // 创建时间
    }
    
    // 订单结构体
    struct Order {
        uint256 id;
        uint256 productId;
        address buyer;
        uint256 quantity;
        uint256 totalPrice;
        uint256 timestamp;
        bool completed;
    }
    
    // FRT 代币合约地址
    address public frtTokenAddress;
    
    // 合约所有者
    address public owner;
    
    // 产品映射
    mapping(uint256 => Product) public products;
    
    // 订单映射
    mapping(uint256 => Order) public orders;
    
    // 产品 ID 计数器
    uint256 public productCount;
    
    // 订单 ID 计数器
    uint256 public orderCount;
    
    // 供应商映射（地址 => 是否认证）
    mapping(address => bool) public certifiedSuppliers;
    
    // 供应商的产品列表
    mapping(address => uint256[]) public supplierProducts;
    
    // 事件声明
    event ProductAdded(
        uint256 indexed productId,
        string name,
        string supplier,
        uint256 price,
        uint256 stock,
        address indexed supplierAddr
    );
    
    event ProductPurchased(
        uint256 indexed productId,
        address indexed buyer,
        uint256 quantity,
        uint256 totalPrice,
        uint256 orderId
    );
    
    event StockUpdated(
        uint256 indexed productId,
        uint256 oldStock,
        uint256 newStock
    );
    
    event SupplierCertified(
        address indexed supplier,
        bool certified
    );
    
    event OrderCompleted(
        uint256 indexed orderId,
        uint256 indexed productId,
        address indexed buyer
    );
    
    /**
     * @notice 构造函数
     * @param _frtToken FRT 代币合约地址
     */
    constructor(address _frtToken) {
        owner = msg.sender;
        frtTokenAddress = _frtToken;
        productCount = 0;
        orderCount = 0;
    }
    
    /**
     * @notice 添加新产品（仅认证供应商）
     * @param _name 产品名称
     * @param _supplier 供应商名称
     * @param _price 价格（FRT 代币）
     * @param _stock 初始库存
     * @return productId 新产品 ID
     */
    function addProduct(
        string memory _name,
        string memory _supplier,
        uint256 _price,
        uint256 _stock
    ) external returns (uint256) {
        require(certifiedSuppliers[msg.sender], "Only certified suppliers can add products");
        require(bytes(_name).length > 0, "Product name cannot be empty");
        require(_price > 0, "Price must be greater than 0");
        
        productCount++;
        
        products[productCount] = Product({
            id: productCount,
            name: _name,
            supplier: _supplier,
            price: _price,
            stock: _stock,
            sold: 0,
            exists: true,
            supplierAddr: msg.sender,
            createdAt: block.timestamp
        });
        
        supplierProducts[msg.sender].push(productCount);
        
        emit ProductAdded(productCount, _name, _supplier, _price, _stock, msg.sender);
        
        return productCount;
    }
    
    /**
     * @notice 购买产品
     * @param _productId 产品 ID
     * @param _quantity 购买数量
     */
    function purchase(uint256 _productId, uint256 _quantity) external {
        require(products[_productId].exists, "Product does not exist");
        require(products[_productId].stock >= _quantity, "Insufficient stock");
        require(_quantity > 0, "Quantity must be greater than 0");
        
        Product storage product = products[_productId];
        uint256 totalPrice = product.price * _quantity;
        
        // 更新库存和销量
        product.stock -= _quantity;
        product.sold += _quantity;
        
        // 创建订单
        orderCount++;
        orders[orderCount] = Order({
            id: orderCount,
            productId: _productId,
            buyer: msg.sender,
            quantity: _quantity,
            totalPrice: totalPrice,
            timestamp: block.timestamp,
            completed: true
        });
        
        // 触发购买事件
        emit ProductPurchased(_productId, msg.sender, _quantity, totalPrice, orderCount);
        emit OrderCompleted(orderCount, _productId, msg.sender);
    }
    
    /**
     * @notice 更新库存（仅供应商）
     * @param _productId 产品 ID
     * @param _newStock 新库存数量
     */
    function updateStock(uint256 _productId, uint256 _newStock) external {
        require(products[_productId].exists, "Product does not exist");
        require(products[_productId].supplierAddr == msg.sender, "Only supplier can update stock");
        
        uint256 oldStock = products[_productId].stock;
        products[_productId].stock = _newStock;
        
        emit StockUpdated(_productId, oldStock, _newStock);
    }
    
    /**
     * @notice 认证供应商（仅所有者）
     * @param _supplier 供应商地址
     * @param _certified 是否认证
     */
    function certifySupplier(address _supplier, bool _certified) external onlyOwner {
        certifiedSuppliers[_supplier] = _certified;
        emit SupplierCertified(_supplier, _certified);
    }
    
    /**
     * @notice 批量认证供应商（仅所有者）
     * @param _suppliers 供应商地址列表
     * @param _certified 是否认证
     */
    function batchCertifySuppliers(address[] memory _suppliers, bool _certified) external onlyOwner {
        for (uint256 i = 0; i < _suppliers.length; i++) {
            certifiedSuppliers[_suppliers[i]] = _certified;
            emit SupplierCertified(_suppliers[i], _certified);
        }
    }
    
    /**
     * @notice 获取产品信息
     * @param _productId 产品 ID
     * @return name 产品名称
     * @return supplier 供应商名称
     * @return price 价格
     * @return stock 库存
     * @return sold 已售数量
     * @return exists 是否存在
     * @return supplierAddr 供应商地址
     */
    function getProduct(uint256 _productId) external view returns (
        string memory name,
        string memory supplier,
        uint256 price,
        uint256 stock,
        uint256 sold,
        bool exists,
        address supplierAddr
    ) {
        Product memory product = products[_productId];
        return (
            product.name,
            product.supplier,
            product.price,
            product.stock,
            product.sold,
            product.exists,
            product.supplierAddr
        );
    }
    
    /**
     * @notice 获取订单信息
     * @param _orderId 订单 ID
     * @return productId 产品 ID
     * @return buyer 买家地址
     * @return quantity 数量
     * @return totalPrice 总价
     * @return timestamp 时间戳
     * @return completed 是否完成
     */
    function getOrder(uint256 _orderId) external view returns (
        uint256 productId,
        address buyer,
        uint256 quantity,
        uint256 totalPrice,
        uint256 timestamp,
        bool completed
    ) {
        Order memory order = orders[_orderId];
        return (
            order.productId,
            order.buyer,
            order.quantity,
            order.totalPrice,
            order.timestamp,
            order.completed
        );
    }
    
    /**
     * @notice 获取供应商的产品列表
     * @param _supplier 供应商地址
     * @return productIds 产品 ID 列表
     */
    function getSupplierProducts(address _supplier) external view returns (uint256[] memory) {
        return supplierProducts[_supplier];
    }
    
    /**
     * @notice 获取所有产品（用于前端展示）
     * @param _limit 限制数量
     * @param _offset 偏移量
     * @return productIds 产品 ID 列表
     */
    function getAllProducts(uint256 _limit, uint256 _offset) external view returns (uint256[] memory) {
        uint256 limit = _limit > 0 ? _limit : 10;
        uint256 offset = _offset;
        
        uint256 count = 0;
        for (uint256 i = offset + 1; i <= productCount && count < limit; i++) {
            if (products[i].exists) {
                count++;
            }
        }
        
        uint256[] memory result = new uint256[](count);
        uint256 index = 0;
        
        for (uint256 i = offset + 1; i <= productCount && index < count; i++) {
            if (products[i].exists) {
                result[index] = i;
                index++;
            }
        }
        
        return result;
    }
    
    /**
     * @notice 修改 FRT 代币地址（仅所有者）
     * @param _newAddress 新代币地址
     */
    function setFRTTokenAddress(address _newAddress) external onlyOwner {
        require(_newAddress != address(0), "Invalid address");
        frtTokenAddress = _newAddress;
    }
    
    /**
     * @notice 提取合约中的 FRT 代币（仅所有者）
     * @param _to 接收地址
     * @param _amount 提取数量
     */
    function withdrawFRT(address _to, uint256 _amount) external onlyOwner {
        // 这里需要调用 FRT 代币合约的 transfer 函数
        // 由于 FRT 代币合约接口未定义，此处仅做示例
        require(_to != address(0), "Invalid address");
    }
    
    /**
     * @notice 修改器：仅所有者
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    /**
     * @notice 获取合约余额（ETH）
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}

/**
 * @title FRTToken - 水果店代币
 * @notice ERC20 代币，用于水果店交易
 */
contract FRTToken {
    string public name = "Fruit Token";
    string public symbol = "FRT";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * (10 ** uint256(decimals));
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        require(_to != address(0), "Invalid address");
        
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from], "Insufficient balance");
        require(_value <= allowance[_from][msg.sender], "Allowance exceeded");
        require(_to != address(0), "Invalid address");
        
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        
        emit Transfer(_from, _to, _value);
        return true;
    }
    
    function mint(address _to, uint256 _amount) public {
        balanceOf[_to] += _amount;
        totalSupply += _amount;
        emit Transfer(address(0), _to, _amount);
    }
}
