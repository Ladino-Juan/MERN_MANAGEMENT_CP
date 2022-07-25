import React from 'react'
import { useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import {axiosInstance} from '../config'
import { Bar } from 'react-chartjs-2'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'
import Pagination from './pagination'

ChartJS.register(...registerables)

const Informes = (props) => {
  axiosInstance.defaults.headers.common = { Authorization: `Bearer ${props.token}` }

  const [users, setUsers] = useState([])
  const [searchM, setSearchM] = useState('')
  const [searchE, setSearchE] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(4)

  //función para traer los datos de la API
  const URL = `/usuario/${props.usuarioID}/api/clientes`

  const showData = async () => {
    const res = await axiosInstance.get(URL)
    setUsers(res.data)
  }
  //función de búsqueda
  const searcherMes = (e) => {
    setSearchM(e.target.value)
  }
  const searcherEstado = (e) => {
    setSearchE(e.target.value)
  }

  //metodo de filtrado 2
  const results =
    !searchM && !searchE
      ? users
      : users.filter(
          (dato) =>
            dato.ultima_c.split('-')[1] === searchM && dato.estado == searchE,
        )
  //dowload pdf
  const columns = [
    { title: 'Nombre', field: 'name' },
    { title: 'Cel', field: 'cel' },
    { title: 'Ultima Consulta', field: 'ultima_c' },
    { title: 'Procedimiento', field: 'procedimiento' },
    { title: 'Causa N/A', field: 'causa_na' },
    { title: 'Estado', field: 'estado' },
  ]

  const downloadPDF = () => {
    const doc = new jsPDF()
    doc.text('Informe de pacientes', 20, 10)
    doc.autoTable({
      columns: columns.map((col) => ({ ...col, datakey: col.field })),
      body: results.map((user) => [
        user.nombre,
        user.cel,
        user.ultima_c,
        user.procedimiento,
        user.causa_na,
        user.estado,
      ]),
    })
    doc.save('informe.pdf')
  }

  //chart

  const myChart = {
    labels: ['activo', 'inactivo', 'finalizado', 'reprogramado'],
    datasets: [
      {
        label: 'pacientes',
        backgroundColor: 'rgba(71, 120, 139, 0.8)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderwidth: 1,
        hoverBackgroundColor: 'rgba(31, 38, 87, 0.8)',
        hoverBorderColor: 'rgba(72,209,204)',
        data: [
          users.filter((user) => user.estado == 'activo').length,
          users.filter((user) => user.estado == 'inactivo').length,
          users.filter((user) => user.estado == 'finalizado').length,
          users.filter((user) => user.estado == 'reprogramado').length,
        ],
      },
    ],
  }
  const options = {
    maintainAspectRatio: false,
    responsive: true,
  }

  const myChart2 = {
    labels: [
      'Ortodoncia',
      'Higiene',
      'Cirugia',
      'Rehabilitacion',
      'Diseño de sonrisa',
      'Oby',
      'Observacion',
    ],
    datasets: [
      {
        label: 'pacientes',
        backgroundColor: [
          'rgba(10, 100, 156, 1)',
          'rgba(23, 139, 211, 1)',
          'rgba(22, 153, 236, 1)',
          'rgba(110, 158, 188, 1)',
          'rgba(137, 168, 188, 1)',
          'rgba(66, 102, 124, 1)',
          'rgba(59, 173, 143, 0.8)',
        ],
        borderwidth: 1,
        hoverBackgroundColor: 'rgba(5, 67, 105, 1)',
        data: [
          users.filter((user) => user.procedimiento == 'ortodoncia').length,
          users.filter((user) => user.procedimiento == 'higiene').length,
          users.filter((user) => user.procedimiento == 'cirugia').length,
          users.filter((user) => user.procedimiento == 'rehabilitacion').length,
          users.filter((user) => user.procedimiento == 'diseño de sonrisa')
            .length,
          users.filter((user) => user.procedimiento == 'oby').length,
          users.filter((user) => user.procedimiento == 'observacion').length,
        ],
      },
    ],
  }
  const options2 = {
    maintainAspectRatio: false,
    responsive: true,
  }

  useEffect(() => {
    let elems = document.querySelectorAll('select')
    M.FormSelect.init(elems)
    showData()
  }, [])

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost)

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container" style={{ minHeight: '100vh' }}>
      <div className="row">
        <div className="col s12 m4" style={{ marginTop: '50px' }}>
          <div className="card">
            <div className="card-content">
              <form>
                <label>
                  <h5>Filtros</h5>
                </label>
                <div className="row">
                  <div className="input-field col s12">
                    <select name="mes" onChange={searcherMes}>
                      <option value="01">Enero</option>
                      <option value="02">Febrero</option>
                      <option value="03">Marzo</option>
                      <option value="04">Abril</option>
                      <option value="05">Mayo</option>
                      <option value="06">Junio</option>
                      <option value="07">Julio</option>
                      <option value="08">Agosto</option>
                      <option value="09">Septiembre</option>
                      <option value="10">Octubre</option>
                      <option value="11">Noviembre</option>
                      <option value="12">Diciembre</option>
                    </select>
                    <label>Mes ultima consulta</label>
                  </div>

                  <div className="input-field col s12">
                    <select name="estado" onChange={searcherEstado}>
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                      <option value="finalizado">Finalizado</option>
                      <option value="reprogramado">Reprogramado</option>
                    </select>
                    <label>Estado</label>
                  </div>
                  <a
                    className="waves-effect waves-light btn-small"
                    onClick={downloadPDF}
                  >
                    <i className="material-icons right">print</i>Imprimir
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m8 grey-text" style={{ marginTop: '50px' }}>
            <div className="card medium">
              <div className="card-content">
                <table className="centered responsive-table">
                  <thead>
                    <tr className="grey-text">
                      <th>Nombre</th>
                      <th>Cel</th>
                      <th>Última Consulta</th>
                      <th>Procedimiento</th>
                      <th>Causa N/A</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((user) => (
                      <tr
                        key={user._id}
                        className={
                          user.estado == 'activo'
                            ? 'light-green-text accent-1'
                            : user.estado == 'inactivo'
                            ? 'red-text lighten-2'
                            : user.estado == 'finalizado'
                            ? 'grey-text'
                            : 'deep-purple-text lighten-3'
                        }
                      >
                        <td>{user.nombre}</td>
                        <td>{user.cel}</td>
                        <td>{user.ultima_c}</td>
                        <td>{user.procedimiento}</td>
                        <td>{user.causa_na}</td>
                        <td>{user.estado}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={results.length}
                  paginate={paginate}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m6 grey-text">
            <div className="card small">
              <div className="card-content">
                <span className="card-title">
                  Estado de pacientes, total actual={users.length}
                </span>
                <Bar data={myChart} options={options} />
              </div>
            </div>
          </div>
          <div className="col s12 m6 grey-text">
            <div className="card small" style={{ height: '600px' }}>
              <div className="card-content">
                <span className="card-title">Procedimientos</span>
                <Pie data={myChart2} options={options2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Informes
