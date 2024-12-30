import { FiMoon, FiSun } from "react-icons/fi";
import { useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../store/ThemeSlice";
import Button from "./ui/Button";

export const DarkModeToggle = () => {
  const theme = useAppSelector((state) => state.theme.selectedTheme);
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-full bg-transparent  transition-colors"
    >
      {theme === "dark" ? (
        <FiSun size={28} className="text-yellow-300" />
      ) : (
        <FiMoon size={18} className="text-gray-300" />
      )}
    </Button>
  );
};
