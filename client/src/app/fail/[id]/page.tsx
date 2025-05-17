// app/fail/[id]/page.tsx
import React from "react";

const PaymentFailPage = async () => {
  // If you want to fetch data or log the fail event, do it here

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed!</h1>
    </div>
  );
};

export default PaymentFailPage;
