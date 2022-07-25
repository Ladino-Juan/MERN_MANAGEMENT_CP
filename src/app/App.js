import React, { Component } from 'react'
import IndexPage from './pages/indexpage'
import Nav from './components/nav'
import Informes from './components/informes'
import Agenda from './components/agenda'
import NavLoged from './components/navLoged'
import Pacientes from './components/pacientes'
import Footer from './components/footer'
import Login from './components/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

class App extends Component {
  constructor() {
    super()
    this.state = {
      isLoged: false,
      userId: '',
      authToken: '',
    }
    this.passData = this.passData.bind(this)
  }
  passData(data, dataId, token) {
    this.setState({ isLoged: data })
    this.setState({ userId: dataId })
    this.setState({ authToken: token })
  }
  render() {
    return (
      <BrowserRouter>
        {!this.state.isLoged ? (
          <Nav />
        ) : (
          <NavLoged usuarioID={this.state.userId} />
        )}
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="usuario" element={<Login passData={this.passData} />} />
          <Route
            path="/usuario/:id/api/agenda"
            element={
              <Agenda
                usuarioID={this.state.userId}
                token={this.state.authToken}
              />
            }
          />
          <Route
            path="/usuario/:id/api/clientes"
            element={
              <Pacientes
                usuarioID={this.state.userId}
                token={this.state.authToken}
              />
            }
          />
          <Route
            path="/usuario/:id/api/informes"
            element={
              <Informes
                usuarioID={this.state.userId}
                token={this.state.authToken}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    )
  }
}

export default App
