import { zodResolver } from "@hookform/resolvers/zod";
import Box from "../../../components/ui/Box";
import { ILogin } from "../interfaces";
import { loginSchema } from "../validation";
import { useForm } from "react-hook-form";
import ErrorMsg from "../../../components/ui/ErrorMsg";
import Input from "../../../components/ui/Input";
import { TbPasswordUser } from "react-icons/tb";
import { useLoginHandler } from "../hooks/useLoginHandler";
import ErrorHandler from "../../../components/ui/ErrorHandler";
import { BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useLoginHandler(); // Use the custom hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  // Submit handler
  const onSubmit = async (data: ILogin) => {
    const response = await login(data);
    if (response?.data.isValid) navigate("/", { replace: true }); // Programmatically navigate
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ErrorHandler error={error} />
      <Box>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Email Address
        </label>
        <Input
          className="p-2"
          type="text"
          PrefixIcon={BiUser}
          id="username"
          {...register("username")}
          placeholder="Enter your username"
        />
        {errors.username?.message && (
          <ErrorMsg message={errors.username.message} />
        )}
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
        disabled={isLoading} // Disable the button while loading
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
