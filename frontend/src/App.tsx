import { Switch, Route } from "wouter";
import { queryClient } from './lib/queryClient'
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster} from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/pages/Theme-Provider"
import Home from "./components/pages/Home";
import NotFound from "./components/pages/Not-found";
import Check from "./components/pages/Check";
import { Signup } from "./components/pages/Signup";
import {Signin} from './components/pages/Signin'



function Router() {
  return (
    <Switch>
      <Route path='/signup' component={Signup}/>
      <Route  path='/signin' component={Signin}/>
      <Route path="/" component={Home} />
      <Route path='/test' component={Check}/>
      <Route component={NotFound} />
  
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster/>
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
