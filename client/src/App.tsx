import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Residential from "./pages/Residential";
import Commercial from "./pages/Commercial";
import ResidentialDetailNew from "./pages/ResidentialDetailNew";
import CommercialDetail from "./pages/CommercialDetail";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Switch>
            <Route path="/" component={Index} />
            <Route path="/residential" component={Residential} />
            <Route path="/residential/:type/:subtype" component={ResidentialDetailNew} />
            <Route path="/residential/:type" component={ResidentialDetailNew} />
            <Route path="/commercial" component={Commercial} />
            <Route path="/commercial/:type/:subtype" component={CommercialDetail} />
            <Route path="/commercial/:type" component={CommercialDetail} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
