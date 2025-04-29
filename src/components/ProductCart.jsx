import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, getCart, removeCart } from "../redux/api/cartApiRequest";
import { formatCurrency } from "../utils/format";
import { memoizedCartItemsSelector } from "../redux/slices/selectors/cartSelectors";
import CountButton from "./countButton/countButton";

const ProductCart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const cartItems = useSelector(memoizedCartItemsSelector);

  const [localCart, setLocalCart] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getCart(user._id));
    }
  }, [user?._id, dispatch]);

  useEffect(() => {
    const cartWithChecked = cartItems.map(item => ({ ...item, checked: false }));
    setLocalCart(cartWithChecked);
  }, [cartItems]);

  const handleRemoveItemFromCart = (productId) => {
    dispatch(removeCart(user._id, productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart(user._id));
    alert("Xóa tất cả sản phẩm thành công");
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setLocalCart(prev =>
      prev.map(item =>
        (item.productId._id === productId)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleItemCheck = (productId) => {
    setLocalCart(prev =>
      prev.map(item =>
        (item.productId._id === productId)
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  };

  const handleSelectAll = () => {
    setSelectAll(prev => !prev);
    setLocalCart(prev =>
      prev.map(item => ({
        ...item,
        checked: !selectAll
      }))
    );
  };

  const calculateTotal = () => {
    return localCart.reduce(
      (total, item) =>
        item.checked
          ? total + item.productId.price * item.quantity
          : total,
      0
    );
  };

  const totalQuantity = () => {
    return localCart.reduce(
      (total, item) =>
        item.checked
          ? total + item.quantity
          : total,
      0
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Giỏ hàng của bạn</h1>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={localCart.length > 0 && localCart.every(item => item.checked)}
              onChange={handleSelectAll}
              className="h-4 w-4"
            />
            <p className="text-gray-700 font-medium">Chọn tất cả</p>
          </div>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700"
          >
            Xóa tất cả
          </button>
        </div>

        {localCart.length === 0 ? (
          <p className="p-4">Giỏ hàng trống</p>
        ) : (
          localCart.map(item => (
            <div
              key={item.productId._id}
              className="flex items-center p-4 border-b hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4 mr-4">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleItemCheck(item.productId._id)}
                  className="h-4 w-4"
                />
                <img
                  src={`http://localhost:5000${item.productId.images[0]}`}
                  alt={item.productId.name}
                  className="w-20 h-auto object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.productId.name}</h3>
                <p className="text-red-600 font-medium">
                  {formatCurrency(item.productId.price)}
                </p>
                <div className="mt-2">
                  <CountButton
                    count={item.quantity}
                    setCount={(newQuantity) => {
                      setLocalCart((prevCart) =>
                        prevCart.map((cartItem) =>
                          cartItem.productId._id === item.productId._id
                            ? { ...cartItem, quantity: newQuantity }
                            : cartItem
                        )
                      );
                    }}
                    stock={item.productId.stock}
                  />
                </div>
              </div>
              <div className="flex space-x-3 items-center">
                <p className="text-lg font-semibold text-gray-800">
                  {formatCurrency(item.productId.price * item.quantity)}
                </p>
                <TrashIcon
                  className="h-6 w-6 cursor-pointer hover:text-red-600"
                  onClick={() => handleRemoveItemFromCart(item.productId._id)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">Tổng số lượng:</span>
          <span className="font-semibold">{totalQuantity()} sản phẩm</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-700 text-lg">Tổng tiền:</span>
          <span className="text-2xl font-bold text-red-600">
            {formatCurrency(calculateTotal())}
          </span>
        </div>
        <Link to="/checkout">
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            disabled={totalQuantity() === 0}
          >
            Thanh toán
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCart;
