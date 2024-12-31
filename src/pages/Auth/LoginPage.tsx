import Box from "../../components/ui/Box";
import LoginForm from "../../features/Auth/Components/LoginForm";

const LoginPage = () => {
  return (
    <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Main Form Section */}
      <Box className="z-10 w-full max-w-xl bg-white rounded-lg shadow-lg p-8 space-y-10">
        <Box className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Driving License Management System
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Secure access to manage your account
          </p>
        </Box>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default LoginPage;
