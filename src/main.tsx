import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AboutPage from "./AboutPage";
import WorksPage from "./WorksPage";
import PrivacyPage from "./PrivacyPage";
import ResumeGateModal from "./ResumeGateModal";
import "../styles.css";

const pathname = window.location.pathname.toLowerCase().replace(/\/$/, "");
const Page =
  pathname === "/about"
    ? AboutPage
    : pathname === "/work" || pathname === "/works"
    ? WorksPage
    : pathname === "/privacy" || pathname === "/privacy-policy"
    ? PrivacyPage
    : App;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
    <ResumeGateModal />
  </StrictMode>
);

