import {
  About,
  Contact,
  Hero,
  Projects,
  Skills,
  GitHubActivity,
  KikoCommunityHub,
  Preloader,
  FootballGame,
} from "./components";
import { MyNavbar } from "./components";
import { CharacterProvider } from "./context/CharacterContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <CharacterProvider>
      <Preloader />
      <MyNavbar />
      <Hero />
      <About />
      <Projects />
      <GitHubActivity />
      <KikoCommunityHub />
      <Skills />
      <FootballGame />
      <Contact />
    </CharacterProvider>
  );
}

export default App;
