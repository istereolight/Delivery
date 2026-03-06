"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Order } from "@/types/order";
import DeleteModal from "@/components/DeliveryForm/DeleteModal";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const orderId = params.id;

  function getStoredOrders(): Order[] {
    const stored = localStorage.getItem("orders");
    return stored ? (JSON.parse(stored) as Order[]) : [];
  }

  useEffect(() => {
    if (!orderId) return;

    const orders = getStoredOrders();
    const found = orders.find((o) => o.id === orderId);

    setOrder(found ?? null);
  }, [orderId]);

  if (!order) {
    return (
      <p className="p-4 text-gray-600 dark:text-gray-300">
        Заказ не найден или был удалён
      </p>
    );
  }

  const handleDelete = () => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      const orders: Order[] = JSON.parse(stored);
      const updated = orders.filter((o) => o.id !== order!.id);
      localStorage.setItem("orders", JSON.stringify(updated));
    }
    setIsDeleteModalOpen(false);
    router.push("/orders");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Детали заказа
      </h1>

      <div
        className="border border-gray-300 dark:border-gray-700 rounded-lg p-6
                    bg-gray-50 dark:bg-gray-800 shadow-sm dark:shadow-none space-y-2"
      >
        <p className="text-gray-800 dark:text-gray-200">
          <b>Отправитель:</b> {order.senderName} ({order.senderCity})
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <b>Получатель:</b> {order.recipientName} ({order.destinationCity})
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <b>Тип груза:</b> {order.cargoType}
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <b>Вес:</b> {order.weight} кг
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <b>Дата:</b> {new Date(order.createdAt).toLocaleString()}
        </p>
        <p className="text-gray-800 dark:text-gray-200">
          <b>Статус:</b> {order.status}
        </p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Назад
          </button>

          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Удалить
          </button>
        </div>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        order={order}
        onConfirm={() => handleDelete()}
      />
    </div>
  );
}
