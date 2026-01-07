import {
  About,
  Contact,
  Hero,
  Projects,
  Skills,
  GitHubActivity,
  InstagramFeed,
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
      <Skills />
      <GitHubActivity />
      <InstagramFeed />
      <Contact />
    </>
  );
}

export default App;
