import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import styles from "./styles.module.css";

const MyNavbar = () => {
  return (
    <>
      <Navbar className={`${styles.nav}`} data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">KIKO</Navbar.Brand>
          <Nav className="d-flex justify-content-right">
            <Nav.Link href="#home">About</Nav.Link>
            <Nav.Link href="#features">Portfolio</Nav.Link>
            <Nav.Link href="#pricing">Contact Me</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;