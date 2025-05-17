// app/success/[id]/page.tsx

import React from "react";

const PaymentSuccessPage = async () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
    </div>
  );
};

export default PaymentSuccessPage;
