import { About, Contact, Hero, Projects, Skills } from './components';
import { MyNavbar } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  

  return (
    <>
      <MyNavbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  )
}

export default App