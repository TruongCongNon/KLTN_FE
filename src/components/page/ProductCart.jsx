import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, getCart, removeCart } from "../../redux/api/cartApiRequest";
import { formatCurrency } from "../../utils/format";
import { memoizedCartItemsSelector } from "../../redux/slices/selectors/cartSelectors";
import { setCheckedItems } from "../../redux/slices/cartSlice";
import { useModelContext } from "../../context/ModelProvider";

const ProductCart = () => {
  const { showNotification } = useModelContext();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const cartItems = useSelector(memoizedCartItemsSelector);
  const checkedItems = useSelector((state) => state.cart.checkedItems);
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    if (user) {
      dispatch(getCart(user._id));
    }
  }, [user?._id, dispatch]);

  useEffect(() => {
    const filtered = cartItems.filter((item) => item.productId !== null);
    setLocalCart(filtered);
  }, [cartItems]);

  const handleRemoveItemFromCart = (productId) => {
    dispatch(removeCart(user._id, productId));
    showNotification({
      message: "Xóa sản phẩm thành công!",
      type: "success",
    });
    setTimeout(() => {
      dispatch(getCart(user._id));
    }, 100);
  };

  const handleClearCart = () => {
    dispatch(clearCart(user._id));
    showNotification({
      message: "Xóa giỏ hàng thành công!",
      type: "success",
    });
  };

  const handleIncreaseQuantity = (productId) => {
    setLocalCart((prevCart) =>
      prevCart.map((item) =>
        item.productId._id === productId && item.quantity < item.productId.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setLocalCart((prevCart) =>
      prevCart.map((item) =>
        item.productId._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleChange = (productId) => {
    const newCheckedItems = {
      ...checkedItems,
      [productId]: !checkedItems[productId],
    };
    dispatch(setCheckedItems(newCheckedItems));
  };

  const handleCheckedAll = (e) => {
    const checked = e.target.checked;
    const newCheckedItems = {};
    localCart.forEach((item) => {
      newCheckedItems[item.productId._id] = checked;
    });
    dispatch(setCheckedItems(newCheckedItems));
  };

  const calculateTotal = () => {
    return localCart.reduce((total, item) => {
      return checkedItems[item.productId._id]
        ? total + item.productId.price * item.quantity
        : total;
    }, 0);
  };

  const totalQuantity = () => {
    return localCart.reduce((total, item) => {
      return checkedItems[item.productId._id] ? total + item.quantity : total;
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Giỏ hàng của bạn
      </h1>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 border-b flex justify-between">
          <div className="flex items-center space-x-3">
            <input
              className="h-4 w-4"
              type="checkbox"
              onChange={handleCheckedAll}
              checked={
                localCart.length > 0 &&
                localCart.every((item) => checkedItems[item.productId._id])
              }
            />
            <p>Chọn tất cả</p>
          </div>
          <p
            onClick={handleClearCart}
            className="text-red-600 cursor-pointer hover:text-red-700"
          >
            Xóa tất cả
          </p>
        </div>

        {localCart.length === 0 ? (
          <p className="p-4">Giỏ hàng trống</p>
        ) : (
          localCart.map((item,index) => (
            <div
            key={item.productId?._id ||index}
              className="flex items-center p-4 border-b hover:bg-gray-50"
            >
              <div className="space-x-4 flex items-center mr-5">
                <input
                  type="checkbox"
                  checked={!!checkedItems[item.productId._id]}
                  onChange={() => handleChange(item.productId._id)}
                  className="h-4 w-4"
                />
                <img
                  src={
                    item.productId.images && item.productId.images.length > 0
                      ? `http://localhost:5000${item.productId.images[0]}`
                      : "/default-image.jpg" // nếu không có ảnh thì hiện ảnh mặc định
                  }
                  alt={item.productId.name}
                  className="w-20 h-auto object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.productId.name}
                </h3>
                <p className="text-red-600 font-medium">
                  {formatCurrency(item.productId.price)}
                </p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleDecreaseQuantity(item.productId._id)}
                    className="px-3 py-1 border border-gray-300 rounded-md"
                  >
                    -
                  </button>
                  <span className="mx-3 text-lg">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.productId._id)}
                    className="px-3 py-1 border border-gray-300 rounded-md"
                  >
                    +
                  </button>
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
        <Link
          to="/checkout"
          onClick={() => {
            const updatedCart = localCart.map((item) => ({
              ...item,
              quantity: item.quantity, 
            }));
            localStorage.setItem("updatedCart", JSON.stringify(updatedCart));
          }}
        >
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
