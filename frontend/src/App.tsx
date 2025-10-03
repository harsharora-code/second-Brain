import { Switch, Route } from "wouter";
import { queryClient } from './lib/queryClient'
import { QueryClientProvider } from "@tanstack/react-query";
import { Toast } from "./components/ui/Toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "../src/components/pages/Theme-Provider";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/Not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toast />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
