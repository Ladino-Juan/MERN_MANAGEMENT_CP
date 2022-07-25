import React from 'react'

function IndexPage() {
  return (
    <div>
      <div id="index-banner" className="parallax-container">
        <div className="section no-pad-bot">
          <div className="container">
            <br />
            <h1 className="header center teal-text text-lighten-2">
              Cesar Posada Ortodoncia Y Bioestética
            </h1>
            <div className="row center">
              <h5 className="header col s12 light">
                Ortodoncista y ortopedista maxilofacial, Ortodoncia Bioestética
                Universidad de Nueva York.
              </h5>
            </div>
            <div className="row center">
              <a
                href="#contact"
                id="download-button"
                className="btn-large waves-effect waves-light teal lighten-1"
              >
                Contáctanos
              </a>
            </div>
            <br />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block" id="servicios">
                <h2 className="center text-brown darken-2">
                  <i className="material-icons">mood</i>
                </h2>
                <h5 className="center">Diseño de sonrisa</h5>

                <p className="center light">
                  es un procedimiento dental que crea artísticamente sonrisas
                  con armonía, estética y función. Los diseños de sonrisas
                  pueden hacer maravillas para restaurar completamente tu salud
                  dental y apariencia, independientemente del estado original de
                  tus dientes existentes.
                </p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center teal-text text-lighten-2">
                  <img
                    width={35}
                    src="https://www.clinicakader.com/wp-content/uploads/2016/09/icono-ortodoncia.png"
                  />
                </h2>
                <h5 className="center">Ortodoncia</h5>

                <p className="center light">
                  sirve para asegurar una correcta posición de los dientes y un
                  mejor funcionamiento de la mandíbula. Todo ello nos ayuda a
                  establecer un correcto equilibrio morfológico y funcional de
                  la cara y de la boca, mejorando la estética facial y el
                  proceso de masticación.
                </p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center teal-text text-lighten-2">
                  <img
                    className="teal-text text-lighten-2"
                    width={24}
                    src="https://cdn-icons-png.flaticon.com/512/993/993322.png"
                  />
                </h2>
                <h5 className="center">Implantes</h5>

                <p className="center light">
                  El implante se fusiona con el hueso mandibular, proporcionando
                  un soporte estable para los dientes artificiales. Las prótesis
                  y los puentes colocados sobre los implantes no se deslizan ni
                  se corren en la boca, lo cual es una ventaja especialmente
                  importante para la masticación y el habla.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
              <h4 className="col s12 m6 header light">Nuestros Servicios</h4>
              <h6 className="header col s12 m6 light">
                Ofrecemos diferentes tratamientos de acuerdo a sus necesidades e
                intereses, contamos con profesionales en la salud altamente
                capacitados para dar la mejor atención y resultados en:
                Ortodoncia, Estética, Higiene Oral, Cirugías, Rehabilitación,
                Implantes, Blanqueamiento, Recorte de encía. Garantizamos todos
                nuestros tratamientos con la mejor calidad. Sacando una sonrisa
                del alma ese es el SECRETO DEL DETALLE
              </h6>
            </div>
          </div>
        </div>
        <div className="parallax">
          <img
            src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/2MONO3DA7NBHJOGK75IIDKWLKI.jpg"
            alt="cesar posada ortodoncia"
          />
        </div>
      </div>

      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m6" id="contact">
              <h3>
                <i className="mdi-content-send brown-text"></i>
              </h3>
              <h4>Contáctanos</h4>
              <p className="left-align light">
                Consultorio 410 - Torre 2 Megacentro Pinares
              </p>
              <p className="left-align light">(+57) 310 401 2749 Llámanos</p>
              <p className="left-align light">drcesaraugustoposada@gmail.com</p>
            </div>
            <div className="col s12 m6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15903.20402859572!2d-75.6900611!3d4.8041957!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf3577e527367b0a6!2sCesar%20Posada%20Ortodoncia%20Y%20Bioestetica!5e0!3m2!1sen!2sco!4v1658639097550!5m2!1sen!2sco"
                style={{
                  width: '500px',
                  height: '300px',
                  borderRadius: '10px',
                  border: '0',
                  maxWidth: '70vw',
                  maxHeight: '50vh',
                }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
              <div className='col s12 m6'>
              <h4 className="header col s12 left-align">Horarios</h4>
              <h6 className="header col s12 left-align">
                Lunes: 10:00 am a 12:00 pm-2:30 pm a 6:00 pm
              </h6>
              <h6 className="header col s12 left-align">
                Martes: 10:00 am a 12:00 pm-2:30 pm a 6:00 pm
              </h6>
              <h6 className="header col s12 left-align">
                Miercoles: 10:00 am a 12:00 pm-2:30pm a 6:00
              </h6>
              <h6 className="header col s12 left-align">
                Jueves: 10:00 am a 12:00 pm-2:30 pm a 6:00 pm
              </h6>
              <h6 className="header col s12 left-align">
                Viernes: 10:00 am a 12:00 pm-2:30 pm a 6:00 pm
              </h6>
              <h6 className="header col s12 left-align">
                Sabado: 10:00 am a 12:00 pm
              </h6>
              </div>
              <div className='col s12 m6'>
              <img 
                className='right-align'
                style={{width:'300px', 'borderRadius':'10px', maxWidth:'70vw'}}
                src="https://pps.whatsapp.net/v/t61.24694-24/260709399_1297379894107878_3709039661787132795_n.jpg?ccb=11-4&oh=01_AVzwDP2mzoL4qrsFrmuIIkjvUaJCVr9avdCfd91mP2JQcQ&oe=62EC7813"
                alt="cesar posada estetica"
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
