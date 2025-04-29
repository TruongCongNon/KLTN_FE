// import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import { useModelContext } from "../../context/ModelProvider";
// import { useSelector } from "react-redux";
// import StarRating from "../Rating/StarRating";
// import Button from "../Button/Button";

 export default function Modal({}) {
//   const { modalConfig = {}, closeModal } = useModelContext();
//   const { isOpen = false, data = null } = modalConfig;
//   const dataOrderById = useSelector((state) => state.order?.getOrderById?.data);
//   console.log("data modal", dataOrderById);

//   return (
//     <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
//       <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity md:block" />

//       <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//         <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
//           <DialogPanel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
//             <div className="relative  w-full rounded-lg items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
//               <button
//                 onClick={closeModal}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
//               >
//                 <XMarkIcon aria-hidden="true" className="size-6" />
//               </button>

//               {dataOrderById?.items?.map((item) => (
//                 <div
//                   key={item._id}
//                   className="flex mt-10 justify-between items-center border rounded-xl p-4 bg-white shadow-sm mb-4"
//                 >
//                   {/* Trái: ảnh + thông tin */}
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={`http://localhost:5000${item.productId?.images[0]||"/default-image.jpg"}`}
//                       alt={item.productId.name}
//                       className=" h-20  rounded-md border"
//                     />
//                     <div >
//                       <p className="font-semibold text-lg text-gray-900">
//                         {item.productId.name}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Màu: {item.productId.color}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Số lượng: {item.quantity}
//                       </p>
//                     </div>
                    
//                   </div>
//                   <div ><StarRating/></div>
            
                  
//                 </div>
//               ))}
//               <div className="flex justify-end "><Button title="Gửi đánh giá"/></div>
//             </div>
//           </DialogPanel>
//         </div>
//       </div>
//     </Dialog>
//   );
}
