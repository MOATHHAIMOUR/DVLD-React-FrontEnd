import { Oval } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "85%",
      }}
    >
      <Oval
        height={80}
        width={80}
        color="#FFFFFF" // Match your theme's color
        secondaryColor="#1A1F24" // A complementing secondary color
        strokeWidth={2}
        ariaLabel="loading"
      />
    </div>
  );
};

export default LoadingSpinner;
