import { useState } from "react";
import useDarkTheme from "../hooks/useDarkTheme";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const ThemeSwitcher = ({ moonColor, sunColor }:{
  moonColor: string; sunColor: string;
}) => {
  const [colorMode, setColorMode] = useDarkTheme();
  const [darkTheme, setDarkTheme] = useState(colorMode === "light" ? true : false);
  
  const toggleDarkMode = (checked:boolean|((prevState: boolean) => boolean)) => {
    setColorMode(colorMode);
    setDarkTheme(checked);
  }

  return (
    <>
    <DarkModeSwitch
      checked={darkTheme}
      onChange={toggleDarkMode}
      size={30}
      moonColor={moonColor}
      sunColor={sunColor}
    />
    </>
  );
}
 
export default ThemeSwitcher;