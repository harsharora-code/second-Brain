import { Switch, Route } from "wouter";
import { queryClient } from './lib/queryClient'
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster} from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
// import { ThemeProvider } from "./components/pages/Theme-Provider"
import Home from "./components/pages/Home";
import NotFound from "./components/pages/Not-found";
import { Theater } from "lucide-react";

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
      {/* <ThemeProvider defaultTheme="dark"> */}
        <TooltipProvider>
          <Toaster/>
          <Router />
        </TooltipProvider>
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  );
}

export default App;
