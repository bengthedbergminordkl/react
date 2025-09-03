import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "./types/checkout";
import type { CheckoutFormFields } from "./types/checkout";
import FormInput from "./components/FormInput";
import RadioInputGroup from "./components/RadioInputGroup";

const App: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormFields>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
  });

  const paymentMethod = watch("paymentMethod");

  const onSubmit = (data: CheckoutFormFields) => {
    // This is where you would send the data to your backend API
    console.log("Form data submitted:", data);
    alert("Form submitted successfully!");
  };

  const paymentOptions = [
    { value: "card", label: "Credit Card" },
    { value: "paypal", label: "PayPal" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Secure Checkout
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Shipping Information
          </h2>
          <FormInput
            label="Full Name"
            name="fullName"
            register={register}
            error={errors.fullName}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
          />
          <FormInput
            label="Phone"
            name="phone"
            type="tel"
            register={register}
            error={errors.phone}
          />
          <FormInput
            label="Street Address"
            name="streetAddress"
            register={register}
            error={errors.streetAddress}
          />
          <FormInput
            label="City"
            name="city"
            register={register}
            error={errors.city}
          />
          <FormInput
            label="Zip Code"
            name="zipCode"
            register={register}
            error={errors.zipCode}
          />
          <FormInput
            label="Country"
            name="country"
            register={register}
            error={errors.country}
          />
          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">
            Payment Method
          </h2>
          <Controller
            name="paymentMethod"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <RadioInputGroup
                options={paymentOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.paymentMethod && (
            <p className="mt-1 text-sm text-red-500">
              {errors.paymentMethod.message}
            </p>
          )}
          {paymentMethod === "card" && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Card Details
              </h3>
              <FormInput
                label="Cardholder Name"
                name="cardHolderName"
                register={register}
                error={errors.cardHolderName}
              />
              <FormInput
                label="Card Number"
                name="cardNumber"
                register={register}
                error={errors.cardNumber}
              />
              <FormInput
                label="Expiry Date"
                name="expiryDate"
                register={register}
                error={errors.expiryDate}
              />
              <FormInput
                label="CVV"
                name="cvv"
                register={register}
                error={errors.cvv}
              />
            </div>
          )}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
