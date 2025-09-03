import { z } from "zod";

export const checkoutSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" }),
    streetAddress: z.string().min(1, { message: "Street address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    zipCode: z
      .string()
      .regex(/^[0-9]{5}$/, { message: "Zip code must be 5 digits" }),
    country: z.string().min(1, { message: "Country is required" }),
    paymentMethod: z
      .string()
      .min(1, { message: "Please select a payment method" }),
    cardHolderName: z.string().optional(),
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "card") {
        return (
          data.cardHolderName && data.cardNumber && data.expiryDate && data.cvv
        );
      }
      return true;
    },
    {
      message: "All card details are required for card payment",
      path: ["cardHolderName"],
    }
  );

export type CheckoutFormFields = z.infer<typeof checkoutSchema>;
