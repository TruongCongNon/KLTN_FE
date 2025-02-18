import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
const CheckoutProduct = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    state: "",
    postalCode: "",
    phone: "",
  });

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Basic Tee",
      color: "Black",
      size: "Large",
      price: 32.0,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Basic Tee",
      color: "Sienna",
      size: "Large",
      price: 32.0,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
  ]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shipping = 5.0;
  const taxes = 5.52;
  const total = subtotal + shipping + taxes;
  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    alert("Order confirmed!");
  };
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-8">
        {/* Left - Shipping Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact information</h2>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 mb-4"
          />

          <h2 className="text-lg font-semibold mb-4">Shipping information</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
            />
          </div>
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 mt-4"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 mt-4"
          />
          <input
            type="text"
            name="apartment"
            placeholder="Apartment, suite, etc."
            value={formData.apartment}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 mt-4"
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
            />
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="state"
              placeholder="State / Province"
              value={formData.state}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal code"
              value={formData.postalCode}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
            />
          </div>

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 mt-4"
          />
        </div>

        {/* Right - Order Summary */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Order summary</h2>
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-4 mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg"
                />
                <div className="flex-1 ml-4">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Color: {item.color}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="font-semibold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end space-y-8">
                  <DeleteIcon></DeleteIcon>
                  <div className="flex items-center border border-gray-300 rounded-lg w-max">
                    <button
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l-lg"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-center">
                      {item.quantity}
                    </span>
                    <button
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r-lg"
                      z
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Details */}
          <div className="border-t pt-4">
            <div className="flex justify-between py-1">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between py-1">
              <p>Shipping</p>
              <p>${shipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between py-1">
              <p>Taxes</p>
              <p>${taxes.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>

          {/* Confirm Order Button */}
          <button
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-indigo-700"
            onClick={handleCheckout}
          >
            Confirm order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
