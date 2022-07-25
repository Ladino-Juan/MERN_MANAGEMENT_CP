import React from 'react'
import { Link } from "react-router-dom";

const Nav = () => {
    
  return (
    <nav className="teal lighten-2" role="navigation">
      <div className="nav-wrapper container">
        <a id="logo-container" href="./" className="brand-logo">
          <img width={120} src="https://i.ibb.co/fXxcVKL/67879470-100634541304672-2673307560517304320-n-removebg-preview-1.png" />
        </a>
        <ul className="right hide-on-med-and-down">
          <li>
            <a href="#servicios">Servicios</a>
          </li>
          <li>
            <a href="#contact">Contacto</a>
          </li>
          <li>
            <a href="#footer">Sobre nosotros</a>
          </li>
          <li>
            <Link to="usuario"><i className='material-icons'>login</i></Link>
          </li>
          
        </ul>

        <ul id="nav-mobile" className="sidenav">
          <li>
            <a href="#servicios">Servicios</a>
          </li>
          <li>
            <a href="#contact">Contacto</a>
          </li>
          <li>
            <a href="#footer">Sobre nosotros</a>
          </li>
          <li>
            <Link to="usuario"><i className='material-icons'>login</i></Link>
          </li>
        </ul>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
      </div>
    </nav>
  )
}

export default Nav
