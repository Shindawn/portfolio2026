import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AboutPage from "./AboutPage";
import CCWeddingCaseStudy from "./CCWeddingCaseStudy";
import HRPayrollCaseStudy from "./HRPayrollCaseStudy";
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
    : pathname === "/works/hr-payroll" ||
      pathname === "/work/hr-payroll" ||
      pathname === "/works/payroll-hris" ||
      pathname === "/case-study/hr-payroll" ||
      pathname === "/case-studies/hr-payroll" ||
      pathname === "/case-study/payroll" ||
      pathname === "/case-studies/payroll"
    ? HRPayrollCaseStudy
    : pathname === "/privacy" || pathname === "/privacy-policy"
    ? PrivacyPage
    : App;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
    <ResumeGateModal />
  </StrictMode>
);
