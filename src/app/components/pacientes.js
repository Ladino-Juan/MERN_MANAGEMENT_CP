import React, { Component } from 'react'
import Pagination from './pagination'
import {axiosInstance} from '../config'

class Pacientes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nombre: '',
      apellido: '',
      email: '',
      cel: '',
      fecha_i: '',
      ultima_c: '',
      proxima_c: '',
      hora: '',
      procedimiento: '',
      causa_na: '',
      estado: '',
      pacientes: [],
      search: '',
      currentPage: 1,
      postsPerPage: 6,
      _id: '',
    }
    this.addPacient = this.addPacient.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.searcher = this.searcher.bind(this)
    this.paginate = this.paginate.bind(this)

    axiosInstance.defaults.headers.common = {
      Authorization: `Bearer ${this.props.token}`,
    }
  }

  addPacient = async (e) => {
    const URL = `/usuario/${this.props.usuarioID}/api/clientes`
    e.preventDefault()
    if (this.state._id) {
      await axiosInstance.put(`${URL}/${this.state._id}`, this.state).then(() => {
        M.toast({ html: 'Paciente Actualizado' })
      })
      this.setState({
        nombre: '',
        apellido: '',
        email: '',
        cel: '',
        fecha_i: '',
        ultima_c: '',
        proxima_c: '',
        hora: '',
        procedimiento: '',
        causa_na: '',
        estado: '',
        pacientes: [],
        _id: '',
      })
      this.showData()
    } else {
      await axios
        .post(`/usuario/${this.props.usuarioID}/api/clientes`, this.state)
        .then(() => {
          M.toast({ html: 'paciente almacenado' })
        })
        .catch((err) => console.log(err))
      this.setState({
        nombre: '',
        apellido: '',
        email: '',
        cel: '',
        fecha_i: '',
        ultima_c: '',
        proxima_c: '',
        hora: '',
        procedimiento: '',
        causa_na: '',
        estado: '',
      })
      this.showData()
    }
  }

  componentDidMount() {
    let elems = document.querySelectorAll('select')
    let element = document.getElementById('textarea1')
    M.FormSelect.init(elems)
    M.CharacterCounter.init(element)
    this.showData()
  }

  showData = async () => {
    const URL = `/usuario/${this.props.usuarioID}/api/clientes`
    const res = await axiosInstance.get(URL)
    this.setState({ pacientes: res.data })
  }

  editPaciente = async (id) => {
    const URL = `/usuario/${this.props.usuarioID}/api/clientes`
    const res = await axiosInstance.get(`${URL}/${id}`)

    this.setState({
      nombre: res.data.nombre,
      apellido: res.data.apellido,
      email: res.data.email,
      cel: res.data.cel,
      fecha_i: res.data.fecha_i,
      ultima_c: res.data.ultima_c,
      proxima_c: res.data.proxima_c,
      hora: res.data.hora,
      procedimiento: res.data.procedimiento,
      causa_na: res.data.causa_na,
      estado: res.data.estado,
      _id: res.data._id,
    })
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  searcher(e) {
    const { value } = e.target
    this.setState({ search: value })
  }

  //Paginator
  paginate = (pageNumber) => this.setState({ currentPage: pageNumber })

  render() {
    const pacientes = this.state.pacientes

    //metodo de filtrado
    const results = !this.state.search
      ? pacientes
      : pacientes.filter((paciente) =>
          paciente.nombre
            .toLowerCase()
            .includes(this.state.search.toLocaleLowerCase()),
        )

    //Get current posts
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage
    const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost)

    return (
      <div className="container">
        <div className="row">
          <div style={{ marginTop: '50px' }} className="col s12">
            <div className="card">
              <div className="card-content">
                <form onSubmit={this.addPacient}>
                  <label>
                    <h5>ADMINISTRADOR DE PACIENTES</h5>
                  </label>
                  <div className="row">
                    <div className="input-field col s2">
                      <input
                        name="nombre"
                        onChange={this.handleChange}
                        type="text"
                        placeholder="nombre"
                        value={this.state.nombre}
                      ></input>
                    </div>
                    <div className="input-field col s2">
                      <input
                        name="apellido"
                        onChange={this.handleChange}
                        type="text"
                        placeholder="apellido"
                        value={this.state.apellido}
                      ></input>
                    </div>
                    <div className="input-field col s2">
                      <input
                        name="email"
                        onChange={this.handleChange}
                        type="email"
                        className="validate"
                        placeholder="email"
                        value={this.state.email}
                      ></input>
                    </div>
                    <div className="input-field col s2">
                      <input
                        name="cel"
                        onChange={this.handleChange}
                        type="tel"
                        className="validate"
                        placeholder="cel"
                        value={this.state.cel}
                      ></input>
                    </div>
                    <div className="input-field col s2">
                      <select
                        name="procedimiento"
                        onChange={this.handleChange}
                        value={this.state.procedimiento}
                      >
                        <option value="ortodoncia">Ortodoncia</option>
                        <option value="higiene">Higiene</option>
                        <option value="cirugia">Cirugia</option>
                        <option value="rehabilitacion">Rehabilitacion</option>
                        <option value="diseño de sonrisa">
                          Diseño de sonrisa
                        </option>
                        <option value="oby">Oby</option>
                        <option value="observacion">observacion</option>
                      </select>
                      <label>procedimiento</label>
                    </div>
                    <div className="input-field col s2">
                      <input
                        name="fecha_i"
                        onChange={this.handleChange}
                        type="date"
                        className="datepicker"
                        placeholder="fecha i"
                        value={this.state.fecha_i}
                      />
                      <label>Fecha Inicio</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s2">
                      <input
                        name="ultima_c"
                        onChange={this.handleChange}
                        type="date"
                        className="datepicker"
                        placeholder="ult consulta"
                        value={this.state.ultima_c}
                      />
                      <label>Ultima Consulta</label>
                    </div>
                    <div className="input-field col s2">
                      <input
                        name="proxima_c"
                        onChange={this.handleChange}
                        type="date"
                        className="datepicker"
                        placeholder="prox consulta"
                        value={this.state.proxima_c}
                      />
                      <label>Proxima consulta</label>
                    </div>
                    <div className="input-field col s2">
                      <input
                        name="hora"
                        onChange={this.handleChange}
                        type="time"
                        className="timepicker"
                        placeholder="hora"
                        value={this.state.hora}
                      />
                      <label>Hora</label>
                    </div>
                    <div className="input-field col s2 m6">
                      <textarea
                        id="textarea1"
                        className="materialize-textarea"
                        data-length="300"
                        name="causa_na"
                        onChange={this.handleChange}
                        value={this.state.causa_na}
                      ></textarea>
                      <label>Causa no asistencia</label>
                    </div>
                    <div className="input-field col s2">
                      <select
                        name="estado"
                        onChange={this.handleChange}
                        value={this.state.estado}
                      >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="finalizado">Finalizado</option>
                        <option value="reprogramado">Reprogramado</option>
                      </select>
                      <label>estado</label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-teal lighten-2">
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '30px' }} className="col s12">
            <div className="input-field col s12 m4">
              <i className="material-icons prefix">search</i>
              <input
                type="text"
                placeholder="Search"
                value={this.state.search}
                onChange={this.searcher}
              />
            </div>
            <table id="myTable" className="responsive-table highlight">
              <thead>
                <tr className="grey-text">
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Cel</th>
                  <th>Fecha Inicio</th>
                  <th>Última Consulta</th>
                  <th>Próxima Consulta</th>
                  <th>Hora</th>
                  <th>Procedimiento</th>
                  <th>Causa N/A</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((paciente) => {
                  return (
                    <tr
                      key={paciente._id}
                      className={
                        paciente.estado == 'activo'
                          ? 'light-green-text accent-1'
                          : paciente.estado == 'inactivo'
                          ? 'red-text lighten-2'
                          : paciente.estado == 'finalizado'
                          ? 'grey-text'
                          : 'deep-purple-text lighten-3'
                      }
                    >
                      <td>{paciente.nombre}</td>
                      <td>{paciente.apellido}</td>
                      <td>{paciente.email}</td>
                      <td>{paciente.cel}</td>
                      <td>{paciente.fecha_i}</td>
                      <td>{paciente.ultima_c}</td>
                      <td>{paciente.proxima_c}</td>
                      <td>{paciente.hora}</td>
                      <td>{paciente.procedimiento}</td>
                      <td>{paciente.causa_na}</td>
                      <td>{paciente.estado}</td>
                      <td>
                        <button
                          onClick={() => this.editPaciente(paciente._id)}
                          className="btn btn-teal lighten-2"
                        >
                          <i className="material-icons">edit</i>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <Pagination
              postsPerPage={this.state.postsPerPage}
              totalPosts={results.length}
              paginate={this.paginate}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Pacientes
