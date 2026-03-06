"use client";

import { ModalProps } from "@/types/ui/modal";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-start justify-center pt-16 z-50
    bg-black/40 dark:bg-black/70"
    >
      <div className="bg-white dark:bg-gray-800 rounded shadow-lg max-w-sm w-full p-6">
        {title && (
          <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
            {title}
          </h2>
        )}

        <div className="mb-4 pb-4 text-black dark:text-white">{children}</div>

        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}
