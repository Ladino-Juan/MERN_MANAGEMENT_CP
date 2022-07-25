import React from 'react'
import { Link } from "react-router-dom";

const NavLoged = (props) => {
  return (
    <nav className="teal lighten-2" role="navigation">
      <div className="nav-wrapper container">
        <a id="logo-container" href="./" className="brand-logo">
          <img width={120} src="https://i.ibb.co/fXxcVKL/67879470-100634541304672-2673307560517304320-n-removebg-preview-1.png" />
        </a>
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to={`/usuario/${props.usuarioID}/api/agenda`}>Agenda</Link>
          </li>
          <li>
            <Link to={`/usuario/${props.usuarioID}/api/clientes`}>Pacientes</Link>
          </li>
          <li>
            <Link to={`/usuario/${props.usuarioID}/api/informes`}>Informes</Link>
          </li>
          <li>
            <Link to="usuario"><i className='material-icons'>login</i></Link>
          </li>
          
        </ul>

        <ul id="nav-mobile" className="sidenav">
          <li>
            <Link to="/usuario/:id/api/agenda">Agenda</Link>
          </li>
          <li>
            <Link to="/usuario/:id/api/clientes">Pacientes</Link>
          </li>
          <li>
            <Link to="/usuario/:id/api/informes">Informes</Link>
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

export default NavLoged