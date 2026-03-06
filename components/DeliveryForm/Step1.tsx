"use client";

import { SenderData, senderSchema, Step1Props } from "@/types/deliveryForm";
import { useState } from "react";
import { z } from "zod";

export default function Step1({ data, onNext }: Step1Props) {
  const [formData, setFormData] = useState<SenderData>(data);
  const [errors, setErrors] = useState<
    Partial<Record<keyof SenderData, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof SenderData;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const result = senderSchema.safeParse(formData);

    if (!result.success) {
      const tree = z.treeifyError(result.error);
      const fieldErrors: Partial<Record<keyof SenderData, string>> = {};

      if (tree.properties) {
        for (const key in tree.properties) {
          const prop = tree.properties[key as keyof typeof tree.properties];
          if (prop?.errors && prop.errors.length > 0) {
            fieldErrors[key as keyof SenderData] = prop.errors[0];
          }
        }
      }

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onNext(result.data);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Шаг 1: Данные отправителя</h2>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Имя</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Имя"
          className="w-full border rounded px-2 py-1"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Телефон</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+79991234567"
          className="w-full border rounded px-2 py-1"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Город</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Город"
          className="w-full border rounded px-2 py-1"
        />
        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
      </div>

      <div className="flex justify-end mt-4">
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
