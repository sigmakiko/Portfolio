import {
  About,
  Contact,
  Hero,
  Projects,
  Skills,
  GitHubActivity,
  KikoCommunityHub,
} from "./components";
import { MyNavbar } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <MyNavbar />
      <Hero />
      <About />
      <Projects />
      <GitHubActivity />
      <KikoCommunityHub />
      <Skills />

      <Contact />
    </>
  );
}

export default App;
