
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { data } from "../../../constant/category_img";

const Category = () => {
  return (
    <div className="bg-white mt-10">
    <div className="pt-5">
      <p className="text-center font-bold text-[5vw] sm:text-[2vw]">
        Newest Collection Available
      </p>
      <div className="mx-5 flex relative justify-center space-x-5 mt-5 items-center">
        <div className="sm:hidden">
          <ArrowBackIosIcon className="absolute left-0 z-10  cursor-pointer rounded-full shadow"></ArrowBackIosIcon>
        </div>

        {data.map((item) => (
          <div
            key={item.id}
            className="space-y-3 cursor-pointer hover:scale-105 duration-150 "
          >
            <img src={item.img_path} alt="" />
            <p className="text-center ">{item.name}</p>
          </div>
        ))}
        <div className="sm:hidden ">
          <ArrowForwardIosIcon className="absolute right-0 z-10 cursor-pointer"></ArrowForwardIosIcon>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Category