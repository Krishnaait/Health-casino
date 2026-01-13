import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

import About from "./pages/About";
import GamesHub from "./pages/GamesHub";
import Mines from "./pages/games/Mines";
import Slots from "./pages/games/Slots";
import Plinko from "./pages/games/Plinko";
import Diamonds from "./pages/games/Diamonds";
import Roulette from "./pages/games/Roulette";
import FairPolicy from "./pages/FairPolicy";
import ResponsibleGaming from "./pages/ResponsibleGaming";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Legal from "./pages/Legal";
import Disclaimer from "./pages/Disclaimer";
import Contact from "./pages/Contact";

function Router() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path={"/"}>
        {() => (
          <Layout>
            <Home />
          </Layout>
        )}
      </Route>

      <Route path={"/about"}>
        {() => (
          <Layout>
            <About />
          </Layout>
        )}
      </Route>
      <Route path={"/games"}>
        {() => (
          <Layout>
            <GamesHub />
          </Layout>
        )}
      </Route>
      <Route path="/game/mines">
        {() => (
          <Layout>
            <Mines />
          </Layout>
        )}
      </Route>
      <Route path="/game/slots">
        {() => (
          <Layout>
            <Slots />
          </Layout>
        )}
      </Route>
      <Route path="/game/plinko">
        {() => (
          <Layout>
            <Plinko />
          </Layout>
        )}
      </Route>
      <Route path="/game/diamonds">
        {() => (
          <Layout>
            <Diamonds />
          </Layout>
        )}
      </Route>
      <Route path="/game/roulette">
        {() => (
          <Layout>
            <Roulette />
          </Layout>
        )}
      </Route>
      <Route path="/fair-policy">
        {() => (
          <Layout>
            <FairPolicy />
          </Layout>
        )}
      </Route>
      <Route path="/responsible-gaming">
        {() => (
          <Layout>
            <ResponsibleGaming />
          </Layout>
        )}
      </Route>
      <Route path="/privacy">
        {() => (
          <Layout>
            <Privacy />
          </Layout>
        )}
      </Route>
      <Route path="/terms">
        {() => (
          <Layout>
            <Terms />
          </Layout>
        )}
      </Route>
      <Route path="/legal">
        {() => (
          <Layout>
            <Legal />
          </Layout>
        )}
      </Route>
      <Route path="/disclaimer">
        {() => (
          <Layout>
            <Disclaimer />
          </Layout>
        )}
      </Route>
      <Route path="/contact">
        {() => (
          <Layout>
            <Contact />
          </Layout>
        )}
      </Route>
      <Route path={"/404"}>
        {() => (
          <Layout>
            <NotFound />
          </Layout>
        )}
      </Route>
      {/* Final fallback route */}
      <Route>
        {() => (
          <Layout>
            <NotFound />
          </Layout>
        )}
      </Route>
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
