import Timer from "../components/Timer";
import Box from "../components/ui/Box";

const MainPage = () => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      {/* Header Section */}

      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 tracking-wide">
        Driving License Management System
      </h1>

      {/* Logo Section */}
      <Box className="mb-10">
        <img
          src="your-logo.png"
          alt="Logo"
          className="w-24 h-24 mx-auto rounded-full shadow-md"
        />
      </Box>

      {/* Stats Section */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {[
          { label: "People", value: 6 },
          { label: "Drivers", value: 4 },
          { label: "Users", value: 3 },
          { label: "Licences", value: 6 },
        ].map((stat, index) => (
          <Box
            key={index}
            className="p-6 bg-primary hover:bg-primary-hover cursor-pointer text-white rounded-lg text-center shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-lg font-semibold">{stat.label}</h2>
            <p className="text-5xl font-extrabold mt-4">{stat.value}</p>
          </Box>
        ))}
      </Box>

      {/* Timer and Date Section */}
      <Timer />
      <p className="text-lg text-gray-600 mt-6">{formattedDate}</p>

      {/* Footer Section */}
      <footer className="mt-10 text-gray-600">
        <p className="text-sm font-medium">
          Developed by{" "}
          <span className="text-primary-hover font-bold">Moath Haimour</span>
        </p>
      </footer>
    </Box>
  );
};

export default MainPage;
