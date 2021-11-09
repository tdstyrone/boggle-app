import { Navbar, Container } from 'react-bootstrap';
import '../scss/NavBar.scss';

function NavBar() {
  return (
    <div className="NavBar">
        <Navbar id="bar" bg="primary" expand="lg">
        <Container>
            <Navbar.Brand href="/">Boggle Solver App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
        </Navbar>
    </div>
  );
}

export default NavBar;
