import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AboutPage from "./AboutPage";
import "../styles.css";
const Page = window.location.pathname === "/about" ? AboutPage : App;
createRoot(document.getElementById("root")!).render(<StrictMode><Page /></StrictMode>);
