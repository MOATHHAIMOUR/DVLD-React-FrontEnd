import { zodResolver } from "@hookform/resolvers/zod";
import Box from "../../../components/ui/Box";
import { ILogin } from "../interfaces";
import { loginSchema } from "../validation";
import { useForm } from "react-hook-form";
import ErrorMsg from "../../../components/ui/ErrorMsg";
import Input from "../../../components/ui/Input";
import { MdEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  // Submit handler
  const onSubmit = (data: ILogin) => {
    console.log("Form Data:", data);
    // Handle login logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Box>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email Address
        </label>
        <Input
          className="p-2"
          type="email"
          PrefixIcon={MdEmail}
          id="email"
          {...register("email")}
          placeholder="you@example.com"
        />
        {errors.email?.message && <ErrorMsg message={errors.email.message} />}
      </Box>
      <Box>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <Input
          className="p-2"
          type="password"
          id="password"
          PrefixIcon={TbPasswordUser}
          {...register("password")}
          placeholder="Enter your password"
        />
        {errors.password?.message && (
          <ErrorMsg message={errors.password.message} />
        )}
      </Box>
      <Box className="ml-1 flex items-center space-x-2">
        <input
          type="checkbox"
          id="remember-me"
          className="h-4 w-4 text-primary focus:ring-primary border-primary-hover rounded checked:bg-primary-hover checked:border-primary"
        />
        <label
          htmlFor="remember-me"
          className="text-sm text-gray-600 cursor-pointer"
        >
          Remember me
        </label>
      </Box>
      <button
        type="submit"
        className="w-full py-3 bg-primary text-white font-bold text-lg rounded-lg shadow-md hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
