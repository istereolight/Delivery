"use client";

import { useEffect, useState } from "react";
import Step1 from "../components/DeliveryForm/Step1";
import Step2 from "../components/DeliveryForm/Step2";
import Step3 from "../components/DeliveryForm/Step3";
import Modal from "@/components/DeliveryForm/Modal";
import ProgressBar from "@/components/DeliveryForm/ProgressBar";
import { initOrders } from "@/utils/initOrders";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Order } from "@/types/order";
import { SenderData, Step2Form } from "@/types/deliveryForm";

export default function Page() {
  useEffect(() => {
    initOrders();
  }, []);

  const [senderData, setSenderData] = useState<SenderData>({
    name: "",
    phone: "",
    city: "",
  });
  const [step2Data, setStep2Data] = useState<Step2Form>({
    recipientName: "",
    destinationCity: "",
    cargoType: "documents",
    weight: 0.1,
  });
  const [step, setStep] = useState(1);
  const [agreement, setAgreement] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = () => {
    const order: Order = {
      id: uuidv4(),
      senderName: senderData.name,
      senderCity: senderData.city,
      recipientName: step2Data.recipientName,
      destinationCity: step2Data.destinationCity,
      cargoType: step2Data.cargoType,
      weight: step2Data.weight,
      createdAt: new Date().toISOString(),
      status: "created",
    };

    const existing: Order[] = JSON.parse(
      localStorage.getItem("orders") || "[]",
    );

    existing.push(order);

    localStorage.setItem("orders", JSON.stringify(existing));

    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/orders");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <ProgressBar step={step} totalSteps={3} />
      {step === 1 && (
        <Step1
          data={senderData}
          onNext={(data) => {
            setSenderData(data);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <Step2
          data={{ ...step2Data, senderCity: senderData.city }}
          onBack={() => setStep(1)}
          onNext={(data) => {
            setStep2Data(data);
            setStep(3);
          }}
        />
      )}
      {step === 3 && (
        <Step3
          senderData={senderData}
          step2Data={step2Data}
          onBack={() => setStep(2)}
          onSubmit={handleSubmit}
          agreement={agreement}
          setAgreement={setAgreement}
        />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Заявка отправлена!"
      >
        Ваша заявка успешно отправлена.
      </Modal>
    </div>
  );
}
