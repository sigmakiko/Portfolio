import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./styles.module.css";

const MyNavbar = () => {
  return (
    <Navbar expand="sm" className={styles.nav} data-bs-theme="dark">
      <Container className={styles.navContainer}>
        <Navbar.Brand href="#home">KIKO</Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={styles.burgerBtn}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" activeKey="">
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#projects">Projects</Nav.Link>
            <Nav.Link href="#github">GitHub</Nav.Link>
            <Nav.Link href="#tech">Tech Sharing</Nav.Link>
            <Nav.Link href="#skills">Skills</Nav.Link>
            <Nav.Link href="#contact">Contact Me</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
