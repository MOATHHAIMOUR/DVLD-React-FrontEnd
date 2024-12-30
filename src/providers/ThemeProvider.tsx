import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../store";

interface IProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: IProps) => {
  const theme = useAppSelector((state) => state.theme.selectedTheme);

  // Update theme class on document root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
