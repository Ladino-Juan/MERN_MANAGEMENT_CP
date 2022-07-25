import React from 'react'

const Footer = () => {
  return (
    <footer className="page-footer teal" id="footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Sobre nosotros</h5>
            <p className="grey-text text-lighten-4">
              Somos un consultorio ubicado en MegaCentro pinares, contamos con profesionales especializados que estará siempre a tu lado con el mejor resultado para tu tratamiento garantizado. Te esperamos!
            </p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          <p><i className="tiny material-icons">copyright</i> Todos los derechos reservados</p>
          Made by{' '}
          <a
            className="brown-text text-lighten-3"
            href="https://wa.link/hu7yen"
            target="_blank"
          >
            David Ladino-3205279852
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
