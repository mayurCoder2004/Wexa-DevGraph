import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("wexa-settings");

      if (!saved) return true;

      return JSON.parse(saved).darkMode ?? true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode
      ? "dark"
      : "light";
  }, [darkMode]);

  useEffect(() => {
    function handleSettingsUpdate(event) {
      const nextDarkMode = event.detail?.darkMode ?? true;
      setDarkMode(nextDarkMode);
    }

    window.addEventListener(
      "wexa-settings-updated",
      handleSettingsUpdate
    );

    return () => {
      window.removeEventListener(
        "wexa-settings-updated",
        handleSettingsUpdate
      );
    };
  }, []);

  return <AppRoutes />;
}

export default App;
