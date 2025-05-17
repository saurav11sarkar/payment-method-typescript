"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { createOrder } from "@/services/order";
import { Loader2 } from "lucide-react";

const HomePage = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await createOrder(data);
    if (res.success) {
      window.location.href = res.data.url;
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h1 className="text-xl font-semibold text-center mb-4">Place an Order</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
        <Input
          type="number"
          placeholder="Enter amount"
          {...register("amount", { required: true })}
        />
        <Button type="submit">
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Pay Now"}
        </Button>
      </form>
    </div>
  );
};

export default HomePage;
