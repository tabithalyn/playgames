import { useState } from "react";
import useDarkTheme from "../hooks/useDarkTheme";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const ThemeSwitcher = () => {
  const [colorMode, setColorMode] = useDarkTheme();
  const [darkTheme, setDarkTheme] = useState(colorMode === "light" ? true : false);
  
  const toggleDarkMode = (checked:boolean|((prevState: boolean) => boolean)) => {
    setColorMode(colorMode);
    setDarkTheme(checked);
  }

  return (
    <>
    <DarkModeSwitch checked={darkTheme} onChange={toggleDarkMode} size={30} />
    </>
  );
}
 
export default ThemeSwitcher;