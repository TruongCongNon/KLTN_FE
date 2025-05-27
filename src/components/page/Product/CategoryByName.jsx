import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductByCategoryName } from "../../../redux/api/productApiRequest";
import { formatCurrency } from "../../../utils/format";
import { set } from "lodash";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CategoryByName = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const [activeSeries, setActiveSeries] = useState("all");
  const dataProductByCategoryName = useSelector(
    (state) => state.product?.getProductByCategoryName?.data
  );

  useEffect(() => {
    getProductByCategoryName(dispatch, name);
  }, [name]);
  console.log("dataProductByCategoryName", dataProductByCategoryName);
  console.log(name);
  const filterSeries = [
    ...new Set(
      dataProductByCategoryName
        .map((p) => p.series?.toLowerCase().trim())
        .filter(Boolean)
    ),
  ];
  const filteredProducts =
    activeSeries === "all"
      ? dataProductByCategoryName
      : dataProductByCategoryName.filter(
        (p) => p.series?.toLowerCase().trim() === activeSeries
      );
  console.log("filterSeries", filterSeries);
  return (
    <div
    >
      <div className="mt-10">
        <ul className="flex justify-center space-x-5">
          <li
            className={`cursor-pointer pb-1 ${activeSeries === "all"
                ? "font-semibold border-b-2 border-black"
                : "text-gray-500"
              }`}
            onClick={() => setActiveSeries("all")}
          >
            Tất cả
          </li>

          {filterSeries.map((item, index) => (
            <li
              key={index}
              className={`cursor-pointer pb-1 ${activeSeries === item
                  ? "font-semibold border-b-2 border-black"
                  : "text-gray-500"
                }`}
              onClick={() => setActiveSeries(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full flex items-center justify-center"><div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-5  max-w-6xl">
        {filteredProducts.map((product) => {
          return (
            <div key={product._id} className="px-2">
              <Link
                to={`/product/${product._id}`}
                className="group block  py-3"
              >
                <div className="w-full flex items-center justify-center">
                  {" "}
                  <LazyLoadImage
                    effect="blur"
                    alt={product.images}
                    src={`http://localhost:5000${product.images[0]}`}
                    className=" h-auto hover:scale-105 w-56 duration-75 object-cover"
                    afterLoad={() => {
                      const spans = document.querySelectorAll(".lazy-load-image-background.blur");
                      spans.forEach(span => span.classList.remove("blur"));
                    }}
                  />
                </div>
                <h3 className="mt-4 text-xl   flex items-center justify-center text-gray-700 overflow-hidden truncate">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="mt-1 w-full text-lg  flex items-center justify-center font-medium text-gray-900">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div></div>
    </div>
  );
};

export default CategoryByName;
