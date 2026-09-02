import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AboutPage from "./AboutPage";
import WorksPage from "./WorksPage";
import "../styles.css";

const pathname = window.location.pathname.toLowerCase().replace(/\/$/, "");
const Page =
  pathname === "/about"
    ? AboutPage
    : pathname === "/work" || pathname === "/works"
    ? WorksPage
    : App;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
  </StrictMode>
);

