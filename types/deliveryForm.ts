import { z } from "zod";

export const senderSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().regex(/^\+?\d{10,15}$/, "Неверный формат телефона"),
  city: z.string().min(1, "Город обязателен"),
});

export const step2Schema = z.object({
  recipientName: z
    .string()
    .min(2, "Имя получателя должно содержать минимум 2 символа"),
  destinationCity: z.string().min(1, "Город назначения обязателен"),
  cargoType: z.enum(["documents", "fragile", "regular"]),
  weight: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(0.1, "Минимальный вес 0.1 кг")
      .max(30, "Максимальный вес 30 кг"),
  ),
});

export type CargoType = "documents" | "fragile" | "regular";

export type SenderData = z.infer<typeof senderSchema>;

export type Step2Data = z.infer<typeof step2Schema>;

export interface Step1Props {
  data: SenderData;
  onNext: (data: SenderData) => void;
}

export interface Step2Props {
  data: Step2Data & { senderCity: string };
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}

export interface Step2Form {
  recipientName: string;
  destinationCity: string;
  cargoType: CargoType;
  weight: number;
}

export interface Step3Props {
  senderData: { name: string; phone: string; city: string };
  step2Data: Step2Form;
  onBack: () => void;
  onSubmit: () => void;
  agreement: boolean;
  setAgreement: (val: boolean) => void;
}
