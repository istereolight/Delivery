import { Order } from "@/types/order";
import { v4 as uuidv4 } from "uuid";

export function initOrders() {
  if (typeof window === "undefined") return;

  const existing = localStorage.getItem("orders");

  if (!existing) {
    localStorage.setItem("orders", JSON.stringify([]));
  }

  const mockOrders: Order[] = [
    {
      id: uuidv4(),
      senderName: "Иван",
      senderCity: "Москва",
      recipientName: "Петр",
      destinationCity: "Казань",
      cargoType: "documents",
      weight: 1,
      createdAt: new Date().toISOString(),
      status: "created",
    },
    {
      id: uuidv4(),
      senderName: "Анна",
      senderCity: "СПб",
      recipientName: "Олег",
      destinationCity: "Новосибирск",
      cargoType: "fragile",
      weight: 3.5,
      createdAt: new Date().toISOString(),
      status: "processing",
    },
  ];

  localStorage.setItem("orders", JSON.stringify(mockOrders));
}
