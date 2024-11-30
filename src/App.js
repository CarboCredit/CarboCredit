import { Routes, Route } from "react-router-dom";
import { Contacts } from "./components/contact";
import { Home } from "./components/home";
import SignUp from "./components/signup";
import Projects from "./components/projects";
import Purchase from "./components/purchase";
import {Admin} from "./components/admin";
import Classroom from "./components/classroom";
import TransTermsOfService from "./TransTracker/TermsOfService";
import TransPrivacyNotice from "./TransTracker/PrivacyNotice";
import SupportPage from "./TransTracker/support";
import CarboCreditEducator from "./components/carbocrediteducator";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="contact" element={<Contacts />} />
      <Route path="sign_up" element={<SignUp />} />
      <Route path="projects" element={<Projects />} />
      <Route path="purchase" element={<Purchase />} />
      <Route path="admin" element={<Admin />} />
      <Route path="classroom" element={<CarboCreditEducator />} />
      <Route path="transterms" element={<TransTermsOfService />} />
      <Route path="transprivacy" element={<TransPrivacyNotice />} />\
      <Route path="support" element={<SupportPage />} />
    </Routes>
  );
}

export default App;
