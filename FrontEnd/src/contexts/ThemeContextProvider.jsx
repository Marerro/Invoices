import { useState } from "react";
import ThemeContext from "./ThemeContext";
import { useEffect } from "react";

const ThemeContextProvider = ({ children }) => {
  const [myTheme, setMyTheme] = useState(
    () => localStorage.getItem("Theme") || "dark"
  );

  useEffect(() => {
    if (myTheme) {
      document.documentElement.className = myTheme; // document.documentElement: This refers to the root element of the document, which is usually the <html> tag in an HTML document.
      document.body.className = myTheme === "dark" ? "#141625;" : "bg-neutral-500 text-black";
    }
  }, [myTheme]);

  return (
    <>
    
      <ThemeContext.Provider value={{ myTheme, setMyTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};

export default ThemeContextProvider;
