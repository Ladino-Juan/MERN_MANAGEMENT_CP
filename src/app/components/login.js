import React from 'react'
import { useState } from 'react'
import { axiosInstance } from '../config'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {
  const [datos, setDatos] = useState({
    usuario: '',
    clave: '',
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    let { name, value } = e.target
    let newDatos = { ...datos, [name]: value }
    setDatos(newDatos)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!e.target.checkValidity()) {
      alert('please fill correct username or password')
    } else {
      let res = await axiosInstance.post('/usuario/login', datos)
      props.passData(true, res.data.id, res.data.token)
      navigate(`${res.data.id}/api/clientes`)
    }
  }

  return (
    <div className="container" style={{ minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} className="col s12">
        <div className="row">
          <div className="col s12 m8 l4 offset-m2 offset-l4">
            <div className="card">
              <div className="card-action teal lighten-2 white-text">
                <h3>Login</h3>
              </div>

              <div className="card-content">
                <div className="form-field">
                  <label for="username">Email</label>
                  <input
                    id="usuario"
                    type="email"
                    onChange={handleInputChange}
                    value={datos.usuario}
                    name="usuario"
                    required
                  />
                </div>
                <br />
                <div className="form-field">
                  <label for="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    onChange={handleInputChange}
                    value={datos.clave}
                    name="clave"
                    required
                  />
                </div>
                <br />

                <div className="form-field">
                  <input
                    className="waves-effect waves-light btn"
                    type="submit"
                    value="Ingresar"
                  />
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
