"use client";

import { DeleteModalProps } from "@/types/ui/deletemodal";
import Modal from "./Modal";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  order,
}: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Удаление заказа">
      <p className="text-gray-800 dark:text-gray-200">
        Вы уверены, что хотите удалить заказ?
        {order && (
          <span className="block">
            {order.senderName} ({order.senderCity}) → {order.recipientName} (
            {order.destinationCity})
          </span>
        )}
      </p>

      <div className="flex gap-2 mt-4 justify-end">
        <button
          onClick={onConfirm}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Да, удалить
        </button>

        <button
          onClick={onClose}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Отмена
        </button>
      </div>
    </Modal>
  );
}
