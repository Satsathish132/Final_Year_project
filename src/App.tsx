import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CareerRecommendationInput from "./pages/CareerRecommendationInput";
import CareerRecommendationResults from "./pages/CareerRecommendationResults";
import CareerRoadmaps from "./pages/CareerRoadmaps";
import CareerRoadmapDetail from "./pages/CareerRoadmapDetail";
import Chatbot from "./pages/Chatbot";
import SavedCareers from "./pages/SavedCareers";
import Settings from "./pages/Settings";
import ChangePassword from "./pages/ChangePassword";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import Jobs from "./pages/Jobs";
import CareerTips from "./pages/CareerTips";
import IndustryInsights from "./pages/IndustryInsights";
import SuccessStories from "./pages/SuccessStories";
import Legal from "./pages/Legal";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/career-recommendation" element={<ProtectedRoute><CareerRecommendationInput /></ProtectedRoute>} />
          <Route path="/career-recommendation/results" element={<ProtectedRoute><CareerRecommendationResults /></ProtectedRoute>} />
          <Route path="/roadmaps" element={<ProtectedRoute><CareerRoadmaps /></ProtectedRoute>} />
           <Route path="/roadmaps/:careerId" element={<ProtectedRoute><CareerRoadmapDetail /></ProtectedRoute>} />
           <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
           <Route path="/saved-careers" element={<ProtectedRoute><SavedCareers /></ProtectedRoute>} />
           <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
           <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
           <Route path="/two-factor-auth" element={<ProtectedRoute><TwoFactorAuth /></ProtectedRoute>} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/career-tips" element={<CareerTips />} />
          <Route path="/industry-insights" element={<IndustryInsights />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/legal" element={<Legal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
