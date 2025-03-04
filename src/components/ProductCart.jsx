// Cart.js

import { useState } from "react";


const ProductCart = () => {
  // Sample cart items data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Áo Thun Basic',
      price: 250000,
      quantity: 1,
      image: 'https://via.placeholder.com/100',
      checked: false
    },
    {
      id: 2,
      name: 'Quần Jeans Slim',
      price: 450000,
      quantity: 1,
      image: 'https://via.placeholder.com/100',
      checked: false
    }
  ]);

  // State for select all checkbox
  const [selectAll, setSelectAll] = useState(false);

  // Calculate totals
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return item.checked ? total + item.price * item.quantity : total;
    }, 0);
  };

  const totalQuantity = () => {
    return cartItems.reduce((total, item) => {
      return item.checked ? total + item.quantity : total;
    }, 0);
  };

  // Handle quantity change
  const handleQuantityChange = (id, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  // Handle individual checkbox
  const handleItemCheck = (id) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    }));
  };

  // Handle select all
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setCartItems(cartItems.map(item => ({
      ...item,
      checked: !selectAll
    })));
  };

  // Format price to VND
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Giỏ hàng của bạn</h1>
      
      {/* Cart Items */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 font-medium">Chọn tất cả</span>
          </label>
        </div>

        {cartItems.map(item => (
          <div key={item.id} className="flex items-center p-4 border-b last:border-b-0 hover:bg-gray-50">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleItemCheck(item.id)}
              className="w-5 h-5 mr-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-red-600 font-medium">{formatPrice(item.price)}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-12 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">Tổng số lượng:</span>
          <span className="font-semibold">{totalQuantity()} sản phẩm</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-700 text-lg">Tổng tiền:</span>
          <span className="text-2xl font-bold text-red-600">{formatPrice(calculateTotal())}</span>
        </div>
        <button 
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          disabled={totalQuantity() === 0}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default ProductCart;