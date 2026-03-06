export type CargoType = "documents" | "fragile" | "regular";

export interface Order {
  id: string;
  senderName: string;
  senderCity: string;
  recipientName: string;
  destinationCity: string;
  cargoType: CargoType;
  weight: number;
  createdAt: string;
  status: "created" | "processing" | "delivered";
}

export type CargoFilter = CargoType | "all";
