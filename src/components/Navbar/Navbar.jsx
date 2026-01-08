import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import styles from "./styles.module.css";

const MyNavbar = () => {
  return (
    <>
      <Navbar className={`${styles.nav}`} data-bs-theme="dark">
        <Container className={styles.navContainer}>
          <Navbar.Brand href="#home">KIKO</Navbar.Brand>
          <Nav className="d-flex justify-content-right" activeKey="">
            <Nav.Link href="#about" active={false}>
              About
            </Nav.Link>
            <Nav.Link href="#projects" active={false}>
              Projects
            </Nav.Link>
            <Nav.Link href="#github" active={false}>
              GitHub
            </Nav.Link>
            <Nav.Link href="#tech" active={false}>
              Tech Sharing
            </Nav.Link>
            <Nav.Link href="#skills" active={false}>
              Skills
            </Nav.Link>
            <Nav.Link href="#contact" active={false}>
              Contact Me
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
