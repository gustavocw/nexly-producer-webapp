import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const profileSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: "First name is required" })
    .min(2, { message: "First name must have at least 2 characters" }),
  lastName: z
    .string()
    .nonempty({ message: "Last name is required" })
    .min(2, { message: "Last name must have at least 2 characters" }),
  email: z
    .string()
    .email({ message: "Enter a valid email address" })
    .nonempty({ message: "Email is required" }),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, { message: "Enter a valid phone number" })
    .nonempty({ message: "Phone number is required" }),
  address: z.object({
    zipCode: z
      .string()
      .regex(/^\d{5}-?\d{3}$/, { message: "Enter a valid zip code" })
      .nonempty({ message: "Zip code is required" }),
    state: z
      .string()
      .nonempty({ message: "State is required" }),
    city: z
      .string()
      .nonempty({ message: "City is required" }),
    street: z
      .string()
      .nonempty({ message: "Street is required" }),
    number: z
      .string()
      .nonempty({ message: "Number is required" }),
    complement: z.string().optional(),
  }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const useFormProfileController = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: {
        zipCode: "",
        state: "",
        city: "",
        street: "",
        number: "",
        complement: "",
      },
    },
  });

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    console.log("Profile Data:", data);
    reset();
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    reset,
  };
};
