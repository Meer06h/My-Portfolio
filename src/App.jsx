
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Work from "./components/Work";
import Services from "./components/Services";

function App() {
  return (
    <main className="min-h-screen bg-bone font-sans text-ink">
      <Hero />
      <Intro />
      <Work />
      <Services />
    </main>
  );
}

export default App;
