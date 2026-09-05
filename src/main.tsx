import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AboutPage from "./AboutPage";
import CCWeddingCaseStudy from "./CCWeddingCaseStudy";
import LGUWaterCaseStudy from "./LGUWaterCaseStudy";
import PrivacyPage from "./PrivacyPage";
import ResumeGateModal from "./ResumeGateModal";
import "../styles.css";

const pathname = window.location.pathname.toLowerCase().replace(/\/$/, "");

if (pathname === "/work" || pathname === "/works") {
  window.location.replace("/#work");
}

const Page =
  pathname === "/about"
    ? AboutPage
    : pathname === "/works/cc-wedding" ||
      pathname === "/work/cc-wedding" ||
      pathname === "/case-study/cc-wedding" ||
      pathname === "/case-studies/cc-wedding"
    ? CCWeddingCaseStudy
    : pathname === "/works/lgu-water" ||
      pathname === "/work/lgu-water" ||
      pathname === "/works/lgu-water-district" ||
      pathname === "/case-study/lgu-water" ||
      pathname === "/case-studies/lgu-water"
    ? LGUWaterCaseStudy
    : pathname === "/privacy" || pathname === "/privacy-policy"
    ? PrivacyPage
    : App;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
    <ResumeGateModal />
  </StrictMode>
);

