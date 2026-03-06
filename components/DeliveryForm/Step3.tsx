"use client";

import { Step3Props } from "@/types/deliveryForm";

export default function Step3({
  senderData,
  step2Data,
  onBack,
  onSubmit,
  agreement,
  setAgreement,
}: Step3Props) {
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Шаг 3: Подтверждение</h2>

      <div className="mb-3">
        <h3 className="font-semibold">Отправитель</h3>
        <p>Имя: {senderData.name}</p>
        <p>Телефон: {senderData.phone}</p>
        <p>Город: {senderData.city}</p>
      </div>

      <div className="mb-3">
        <h3 className="font-semibold">Получатель и посылка</h3>
        <p>Имя: {step2Data.recipientName}</p>
        <p>Город: {step2Data.destinationCity}</p>
        <p>Тип груза: {step2Data.cargoType}</p>
        <p>Вес: {step2Data.weight} кг</p>
      </div>

      <div className="mb-3 flex items-center">
        <input
          type="checkbox"
          checked={agreement}
          onChange={(e) => setAgreement(e.target.checked)}
          className="mr-2"
        />
        <label>Согласен с условиями</label>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Назад
        </button>
        <button
          onClick={onSubmit}
          disabled={!agreement}
          className={`px-4 py-2 rounded ${agreement ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
        >
          Отправить
        </button>
      </div>
    </div>
  );
}
