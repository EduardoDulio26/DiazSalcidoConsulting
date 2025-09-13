// src/App.jsx
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import About from "./components/About.jsx";
import Packages from "./components/Packages.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Packages />
        <Contact />
      </main>
      {/* Deja tu footer como lo tengas */}
    </>
  );
}
