"use client";

import { Order, CargoType, CargoFilter } from "@/types/order";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CargoFilter>("all");

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      const parsed = JSON.parse(stored) as Order[];
      setOrders(parsed);
    }
  }, []);

  const normalizedSearch = search.toLowerCase();

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.recipientName.toLowerCase().includes(normalizedSearch) ||
      order.destinationCity.toLowerCase().includes(normalizedSearch);

    const matchesFilter = filter === "all" || order.cargoType === filter;

    return matchesSearch && matchesFilter;
  });

  const cargoTypeMap: Record<CargoType, string> = {
    documents: "Документы",
    fragile: "Хрупкое",
    regular: "Обычное",
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-black">История заказов</h1>
        <button
          onClick={() => router.push("/")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Новый заказ
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Поиск по имени получателя или городу"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-700 rounded px-3 py-2
                     bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200
                     placeholder-gray-400 dark:placeholder-gray-500"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as CargoFilter)}
          className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2
                     bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        >
          <option value="all">Все типы груза</option>
          <option value="documents">Документы</option>
          <option value="fragile">Хрупкое</option>
          <option value="regular">Обычное</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-800 dark:text-black">Пока нет заказов</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => router.push(`/orders/${order.id}`)}
              className="cursor-pointer border border-gray-300 dark:border-gray-700 
                 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 shadow-sm dark:shadow-none
                 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <p className="text-gray-800 dark:text-gray-200">
                <b>{order.senderCity}</b> → <b>{order.destinationCity}</b>
              </p>

              <p className="text-gray-800 dark:text-gray-200">
                Получатель: {order.recipientName}
              </p>

              <p className="text-gray-800 dark:text-gray-200">
                Тип груза: {cargoTypeMap[order.cargoType]}
              </p>

              <p className="text-gray-800 dark:text-gray-200">
                Дата: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <p className="text-gray-800 dark:text-gray-200">
                Статус: {order.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
