import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../redux/api/productApiRequest";
import { formatCurrency } from "../../utils/format";
import { useNavigate } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { LazyLoadImage } from "react-lazy-load-image-component";
const SearchPage = ({ closeSearchPage }) => {
  const dispatch = useDispatch();
  const dataAllProduct = useSelector(
    (state) => state.product?.getAllProduct?.allProducts
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProduct(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const filtered = dataAllProduct.filter((product) => {
        const name = product.name ? product.name.toLowerCase() : "";
        const category = product.category ? product.category.toLowerCase() : "";
        const searchQueryLower = searchQuery.toLowerCase();

        return (
          name.includes(searchQueryLower) || category.includes(searchQueryLower)
        );
      });

      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, dataAllProduct]);
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    closeSearchPage();
  };
  return (
    <div className=" text-white ">
      <div className="py-4 px-8">
        <div className=" ">
          <div className="relative  ">
            <div className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm sản phẩm..."
                className="w-full px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <CloseRoundedIcon
                fontSize="large"
                className="cursor-pointer absolute  right-2"
                onClick={closeSearchPage}
              />
            </div>
            <div className="absolute top-0 right-0 mt-3 mr-3 text-gray-400">
              <i className="fas fa-search"></i>
            </div>
            {searchQuery.trim() !== "" && filteredProducts.length > 0 && (
              <div className="absolute left-0 right-0  text-black bg-white shadow-lg mt-2 rounded-lg max-h-96 overflow-y-auto">
                <p className="m-5 ">Sản phảm gợi ý</p>
                {filteredProducts.slice(0, 4).map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleProductClick(product._id)}
                    className=" mx-5 flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <LazyLoadImage
                        effect="blur"
                      src={`http://localhost:5000${product.images[0]||"/default-image.jpg"}`}
                      alt={product.name}
                      className="w-10 h-14s object-cover rounded-lg mr-4"
                      afterLoad={() => {
                          const spans = document.querySelectorAll(".lazy-load-image-background.blur");
                          spans.forEach(span => span.classList.remove("blur"));
                        }}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Optionally, you can add a grid for all products if needed */}
      </div>
    </div>
  );
};

export default SearchPage;
