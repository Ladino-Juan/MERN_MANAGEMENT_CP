import React from 'react'
import { useState, useEffect } from 'react'
import Pagination from './pagination'
import { axiosInstance } from '../config'

const Agenda = (props) => {
  axiosInstance.defaults.headers.common = { Authorization: `Bearer ${props.token}` }

  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(8)

  //función para traer los datos de la API
  const URL = `/usuario/${props.usuarioID}/api/clientes`

  const showData = async () => {
    const res = await axiosInstance.get(URL)
    setUsers(res.data)
  }
  //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value)
  }
  //metodo de filtrado 2
  const results = !search
    ? []
    : users.filter((dato) =>
        dato.proxima_c.toLowerCase().includes(search.toLocaleLowerCase()),
      )

  //envia peticion PUT a la base de datos, de acuerdo a su estado se cambia su ultima consulta o la proxima

  const updateState = async (id, estate, fecha) => {
    const newState =
      estate == 'activo'
        ? { ultima_c: fecha, estado: estate }
        : estate == 'inactivo'
        ? { estado: estate }
        : { proxima_c: fecha, estado: estate }
    await axiosInstance.put(`${URL}/${id}`, newState).then(async () => {
      M.toast({ html: `Estado Actualizado: ${estate}` })
      await axiosInstance.get(URL).then((response) => {
        setUsers(response.data)
      })
    })
  }

  useEffect(() => {
    showData()
  }, [])
  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost)

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  //Get current date
  let dates = new Date()
  //Current date format yyyy-mm-dd
  let date = dates.toISOString().slice(0, 10)
  //Reschedule one week
  let nextweek = new Date(dates.setDate(dates.getDate() + 7))
    .toISOString()
    .slice(0, 10)

  return (
    <div className="container">
      <div className="row" style={{ minHeight: '80vh', marginTop: '50px' }}>
        <div className="input-field col s12 m4">
          <input
            name="calendario"
            type="date"
            className="datepicker"
            placeholder="Calendario"
            value={search}
            onChange={searcher}
            style={{ textAlign: 'center' }}
          />
        </div>
        <div className="col s8">
          <table className="centered responsive-table">
            <thead>
              <tr className="grey-text">
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cel</th>
                <th>Hora</th>
                <th>Procedimiento</th>
                <th>Última C</th>
                <th>Próxima C</th>
                <th>
                  <span className="new badge red" data-badge-caption="">
                    {
                      currentPosts.filter((user) => user.estado === 'inactivo')
                        .length
                    }
                  </span>
                  <span className="new badge purple" data-badge-caption="">
                    {
                      currentPosts.filter(
                        (user) => user.estado === 'reprogramado',
                      ).length
                    }
                  </span>
                </th>
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
                  <td>{user.apellido}</td>
                  <td>{user.cel}</td>
                  <td>{user.hora}</td>
                  <td>{user.procedimiento}</td>
                  <td>{user.ultima_c}</td>
                  <td>{user.proxima_c}</td>
                  <td>
                    <a
                      className="btn-floating btn-small waves-effect waves-light green"
                      onClick={() => updateState(user._id, 'activo', date)}
                    >
                      <i className="material-icons">done</i>
                    </a>
                  </td>
                  <td>
                    <a
                      className="btn-floating btn-small waves-effect waves-light red"
                      onClick={() => updateState(user._id, 'inactivo', date)}
                    >
                      <i className="material-icons">close</i>
                    </a>
                  </td>
                  <td>
                    <a
                      className="btn-floating btn-small waves-effect waves-light purple"
                      onClick={() =>
                        updateState(user._id, 'reprogramado', nextweek)
                      }
                    >
                      <i className="material-icons">update</i>
                    </a>
                  </td>
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
  )
}

export default Agenda
