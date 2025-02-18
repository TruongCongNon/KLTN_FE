import banner from "../../assets/banner1.png";
const Banner = () => {
  return (
    <div>
      <div className=" flex flex-col-reverse sm:flex-row  ">
        <div className="sm:pl-40 h-fit">
          <p className="text-[2.5rem] sm:text-start sm:text-[3rem] text-center font-bold text-[#f5f5f7] sm:mt-20 ">
            Discover Most Affordable <br></br> Apple products
          </p>
          <p className="hidden sm:block text-[#8B8E99] font-bold">
            Find the best, reliable and affordable apple products here. We focus
            on the product quality. Here you can find all the products apple
            ever made. Even the products apple officially stopped selling. So
            why you are waiting? Just order now!
          </p>
          <div className="mt-6 flex max-w-md gap-x-4 bg-white p-1 rounded-lg">
            <label htmlFor="text-address" className="sr-only">
              text address
            </label>
            <input
              id="text-address"
              name="text"
              type="text"
              autoComplete="off"
              required
              className="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-black outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Search
            </button>
          </div>
        </div>
        <img src={banner} alt="" className="brightness-[0.5] sm:h-[32rem]  " />
      </div>
    </div>
  );
};
export default Banner;
