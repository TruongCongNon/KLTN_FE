// Cart.js

import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeCart } from "../redux/api/cartApiRequest";


const ProductCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const cartShoppingItems = useSelector((state) => state.cart?.items);
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );
  const userId = useSelector((state) => state.auth.login.currentUser?._id);
  // const cartShoppingItemsId = useMemo(
  //   () => cartShoppingItems?.map((item) => item.productId) || [],
  //   [cartShoppingItems]
  // );

  // console.log("ID của sp trong giỏ hàng=> " + cartShoppingItemsId);
const handleRemoveItemFromCart = (productId) => {
  // console.log("id tỏng handle" + productId);
  // console.log("id tỏng handle acc" + accessToken);

  // console.log("id tỏng handle user" + userId);

   removeCart(userId,productId, dispatch, accessToken);
  };
  // State for select all checkbox
  useEffect(() => {
    if (cartShoppingItems) return setCartItems(cartShoppingItems);
  }, [cartShoppingItems]);
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
  const handleQuantityChange = (productId, change) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.productId === productId) {
          const newQuantity = Math.max(1, item.quantity + change);
          if (newQuantity === item.stock) {
            alert("Số lượng sản phẩm đã đạt giới hạn");
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Handle individual checkbox
  const handleItemCheck = (productId) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.productId === productId) {
          return { ...item, checked: !item.checked };
        }
        return item;
      })
    );
  };

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
    setCartItems((prev) =>
      prev.map((item) => ({
        ...item,
        checked: !selectAll, // Dùng trạng thái trước đó
      }))
    );
  };

  // Format price to VND
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  // const handleremoveCartItems = (productId) => {
  //   dispatch(removeCart(productId));
  // };
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Giỏ hàng của bạn
      </h1>

      {/* Cart Items */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 border-b flex justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 font-medium">Chọn tất cả</span>
          </label>
          <p className="text-red-600 cursor-pointer hover:text-red-700">Xóa tất cả </p>
        </div>

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center p-4 border-b last:border-b-0 hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={item.checked ?? false}
              onChange={() => handleItemCheck(item.productId)}
              className="w-5 h-5 mr-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-md mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>

              <p className="text-red-600 font-medium">
                {formatPrice(item.price)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleQuantityChange(item.productId, -1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-12 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.productId, 1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex space-x-3 ">
              
               <p className="text-lg font-semibold text-gray-800">
              {formatPrice(item.price * item.quantity)}
            </p>
            <TrashIcon
                className="h-6 w-6 cursor-pointer hover:text-red-600"
                onClick={()=>handleRemoveItemFromCart(item.productId)}
              ></TrashIcon>
            </div>
           
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
          <span className="text-2xl font-bold text-red-600">
            {formatPrice(calculateTotal())}
          </span>
        </div>
        <Link to="/checkout"><button
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          disabled={totalQuantity() === 0}
        >
          Thanh toán
        </button></Link>
      </div>
    </div>
  );
};

export default ProductCart; 
