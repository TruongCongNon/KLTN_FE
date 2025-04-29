import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const AlertPage = ({ isOpen, title, description, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <DialogPanel className="max-w-md w-full rounded-lg bg-white shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => {
                onConfirm(); // Chỉ gọi khi bấm "Xác nhận"
                onClose();
              }}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-500"
            >
              Xác nhận
            </button>
            <button
              onClick={onClose} // Chỉ đóng alert, không gọi onConfirm
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Hủy
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AlertPage;