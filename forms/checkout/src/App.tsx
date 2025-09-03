import React from 'react';
import { useForm, Controller, UseFormRegister, FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define the Zod schema for validation
const checkoutSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  streetAddress: z.string().min(1, { message: 'Street address is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  zipCode: z.string().regex(/^\d{5}$/, { message: 'Zip code must be 5 digits' }),
  country: z.string().min(1, { message: 'Country is required' }),
  paymentMethod: z.string().min(1, { message: 'Please select a payment method' }),
  cardHolderName: z.string().optional(),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
}).refine(data => {
  // Conditional validation: require card details only if card payment is selected
  if (data.paymentMethod === 'card') {
    return data.cardHolderName && data.cardNumber && data.expiryDate && data.cvv;
  }
  return true;
}, {
  message: "All card details are required for card payment",
  path: ["cardHolderName"], // This path will show the error on the card holder name field
});

// Infer the form field types from the Zod schema for type safety
type CheckoutFormFields = z.infer<typeof checkoutSchema>;

// Props interface for the reusable input component
interface FormInputProps {
  label: string;
  name: keyof CheckoutFormFields;
  register: UseFormRegister<CheckoutFormFields>;
  error?: FieldError;
  type?: string;
}

// A simple reusable input component to reduce boilerplate
const FormInput: React.FC<FormInputProps> = ({ label, name, register, error, type = 'text' }) => (
  <div className="flex flex-col mb-4">
    <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
    <input
      id={name}
      {...register(name)}
      type={type}
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 ${error ? 'border-red-500' : ''}`}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
  </div>
);

// Props interface for the radio group component
interface RadioInputGroupProps {
  options: { value: string; label: string; }[];
  value?: string;
  onChange: (value: string) => void;
}

// A simple custom radio group for demonstrating the Controller
const RadioInputGroup: React.FC<RadioInputGroupProps> = ({ options, value, onChange }) => (
  <div className="flex flex-col mt-2">
    {options.map(opt => (
      <label key={opt.value} className="inline-flex items-center cursor-pointer">
        <input
          type="radio"
          value={opt.value}
          checked={value === opt.value}
          onChange={() => onChange(opt.value)}
          className="form-radio text-blue-600 h-4 w-4"
        />
        <span className="ml-2 text-gray-700">{opt.label}</span>
      </label>
    ))}
  </div>
);


const App: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormFields>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur", // Validate on blur for better user experience
  });

  const paymentMethod = watch("paymentMethod");

  const onSubmit = (data: CheckoutFormFields) => {
    // This is where you would send the data to your backend API
    console.log('Form data submitted:', data);
    alert('Form submitted successfully!');
  };

  const paymentOptions = [
    { value: 'card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Secure Checkout</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipping Information</h2>
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
          
          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Payment Method</h2>
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
          {errors.paymentMethod && <p className="mt-1 text-sm text-red-500">{errors.paymentMethod.message}</p>}
          
          {paymentMethod === 'card' && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Card Details</h3>
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
