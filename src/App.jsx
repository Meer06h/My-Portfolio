
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Work from "./components/Work";
import Services from "./components/Services";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="min-h-screen bg-bone font-sans text-ink">
      <Hero />
      <Intro />
      <Work />
      <Services />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
