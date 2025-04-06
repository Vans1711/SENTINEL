import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Families from "./pages/Families";
import WelfareMap from "./pages/WelfareMap";
import Volunteer from "./pages/Volunteer";
import ReportConcern from "./pages/ReportConcern";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import NotFound from "./pages/NotFound";
import EducationalSupport from "./pages/Resources/EducationalSupport";
import FinancialAid from "./pages/Resources/FinancialAid";
import CounselingServices from "./pages/Resources/CounselingServices";
import LegalHelp from "./pages/Resources/LegalHelp";
import VolunteerProfile from "./pages/Volunteer/Profile";
import FamilyProfile from "./pages/Family/Profile";
import LanguageSettings from "./pages/LanguageSettings";
import LegacyWall from "./pages/LegacyWall";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/families" element={<Families />} />
            <Route path="/welfare-map" element={<WelfareMap />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/report-concern" element={<ReportConcern />} />
            
            {/* Resource Routes */}
            <Route path="/resources/educational-support" element={<EducationalSupport />} />
            <Route path="/resources/financial-aid" element={<FinancialAid />} />
            <Route path="/resources/counseling-services" element={<CounselingServices />} />
            <Route path="/resources/legal-help" element={<LegalHelp />} />
            <Route path="/legal-help" element={<Navigate to="/resources/legal-help" replace />} />
            
            <Route path="/legacy-wall" element={<LegacyWall />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            
            {/* Profile Routes */}
            <Route path="/volunteer/profile" element={<VolunteerProfile />} />
            <Route path="/family/profile" element={<FamilyProfile />} />
            
            {/* Language Settings */}
            <Route path="/language-settings" element={<LanguageSettings />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
