import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategory } from "../../../redux/api/apiRequestCategory";

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataCategory = useSelector(
    (state) => state.category?.getAllCategory?.data
  );
  useEffect(() => {
    getAllCategory(dispatch);
  }, [dispatch]);

  return (
    <div className="bg-white mt-10 lg:px-60">
      <div className="pt-5 flex justify-center items-center ">
        <div className="mx-5  mt-5 items-center flex grid-cols-2  xl:grid-cols-5 sm:gap-10 gap-3">
          {dataCategory.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/category/${item.name}`)}
              className="space-y-3  cursor-pointer hover:scale-105 duration-150 "
            >
              <img
                src={`http://localhost:5000${item?.images}`}
                className="sm:w-[150px] "
              />
              <p className="text-center ">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
