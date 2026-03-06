"use client";

import { Step2Data, Step2Props, step2Schema } from "@/types/deliveryForm";
import { useState } from "react";
import { z } from "zod";

export default function Step2({ data, onNext, onBack }: Step2Props) {
  const [formData, setFormData] = useState<Step2Data>({
    recipientName: data.recipientName || "",
    destinationCity: data.destinationCity || "",
    cargoType: data.cargoType || "documents",
    weight: data.weight || 0.1,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof Step2Data, string>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const key = e.target.name as keyof Step2Data;
    const value =
      key === "weight" ? parseFloat(e.target.value) : e.target.value;
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    const result = step2Schema.safeParse(formData);
    const fieldErrors: Partial<Record<keyof Step2Data, string>> = {};

    if (!result.success) {
      const tree = z.treeifyError(result.error);

      if (tree.properties) {
        for (const key in tree.properties) {
          const prop = tree.properties[key as keyof typeof tree.properties];
          if (prop?.errors && prop.errors.length > 0) {
            fieldErrors[key as keyof Step2Data] = prop.errors[0];
          }
        }
      }

      setErrors(fieldErrors);
      return;
    }

    if (
      formData.destinationCity.toLowerCase() === data.senderCity.toLowerCase()
    ) {
      fieldErrors.destinationCity =
        "Город назначения не может совпадать с городом отправления";
    }
    if (fieldErrors.destinationCity) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onNext(result.data);
  };

  const handleBack = () => {
    onNext(formData);
    onBack();
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Шаг 2: Получатель и посылка</h2>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Имя получателя</label>
        <input
          type="text"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
        {errors.recipientName && (
          <p className="text-red-500 text-sm">{errors.recipientName}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Город назначения</label>
        <input
          type="text"
          name="destinationCity"
          value={formData.destinationCity}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
        {errors.destinationCity && (
          <p className="text-red-500 text-sm">{errors.destinationCity}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Тип груза</label>
        <select
          name="cargoType"
          value={formData.cargoType}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        >
          <option value="documents">Документы</option>
          <option value="fragile">Хрупкое</option>
          <option value="regular">Обычное</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Вес, кг</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          min={0.1}
          max={30}
          step={0.1}
          className="w-full border rounded px-2 py-1"
        />
        {errors.weight && (
          <p className="text-red-500 text-sm">{errors.weight}</p>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleBack}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Назад
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Далее
        </button>
      </div>
    </div>
  );
}
