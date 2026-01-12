import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PlayNow from "./pages/PlayNow";
import About from "./pages/About";
import GamesHub from "./pages/GamesHub";
import Mines from "./pages/games/Mines";
import Slots from "./pages/games/Slots";
import Plinko from "./pages/games/Plinko";
import Diamonds from "./pages/games/Diamonds";
import DreamCatcher from "./pages/games/DreamCatcher";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/play-now"} component={PlayNow} />
      <Route path={"/about"} component={About} />
      <Route path={"/games"} component={GamesHub} />
      <Route path={"/game/mines"} component={Mines} />
      <Route path={"/game/slots"} component={Slots} />
      <Route path={"/game/plinko"} component={Plinko} />
      <Route path={"/game/diamonds"} component={Diamonds} />
      <Route path={"/game/dreamcatcher"} component={DreamCatcher} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
