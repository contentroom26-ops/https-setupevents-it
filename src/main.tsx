import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { i18nReady } from "./i18n/config";

const container = document.getElementById("root")!;

i18nReady.then(() => {
  createRoot(container).render(<App />);
});
