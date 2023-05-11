import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Component } from 'react'

import Routes from './routes'
import AuthService from '../services/auth.service'
import Navigation from './layout/Navigation/Navigation'
import Footer from './layout/Footer/Footer'
import Alert from './shared/Alert/Alerts'


class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedUser: undefined,
      alert: {
        show: false,
        text: ''
      }
    }
    this.authService = new AuthService()
  }

  storeUser = loggedUser => this.setState({ loggedUser })

  fetchUser = () => {
    this.authService
      .isLoggedIn()
      .then(theLoggedUser => this.storeUser(theLoggedUser.data))
      .catch(() => this.storeUser(null))
  }

  componentDidMount = () => this.fetchUser()

  showMessage = text => this.setState({ alert: { show: true, text } })

  render() {

    return (
      <>
        <Navigation {...this.props} storeUser={this.storeUser} loggedUser={this.state.loggedUser} showMessage={this.showMessage} />

        <Routes {...this.props} fetchUser={this.fetchUser} storeUser={this.storeUser} loggedUser={this.state.loggedUser} showMessage={this.showMessage} />

        <Footer />

        <Alert show={this.state.alert.show} text={this.state.alert.text} closeAlert={() => this.setState({ alert: { ...this.state.alert, show: false } })} />
      </>
    )
  }
}


export default App
