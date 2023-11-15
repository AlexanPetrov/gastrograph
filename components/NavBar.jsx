import { NavLink } from 'react-router-dom';
import '../styles/navBar.css';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={'/'} className="title-class" active="active">Gastrograph</NavLink>
        </li>
        <li>
          <NavLink to={'/about'} active="active">About Us</NavLink>
        </li>
        <li>
          <NavLink to={'/recipes'} active="active">Our Recipes</NavLink>
        </li>
        <li>
          <NavLink to={'/join'} active="active">Share Recipes</NavLink>
        </li>
        <li>
          <NavLink to={'/contact'} active="active">Contact Us</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;
