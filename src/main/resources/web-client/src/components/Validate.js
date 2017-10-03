import React, { Component } from 'react'
import queryString from 'query-string'
import Logout from './Logout'

export default class Validate extends Component {

  constructor (props) {
    super(props)

    this.state = {
      isValid: false,
      accessToken: ''
    }

    this.fetchValidateUri = this.fetchValidateUri.bind(this)
  }

  componentDidMount () {
    const { accessToken } = this.props
    this.setState({ accessToken })
  }

  fetchValidateUri () {
    const { accessToken } = this.props

    const authPath = 'http://localhost:8080/wso2Example/api/validate-token'
    const query = queryString.stringify({ accessToken })
    const requestUri = `${authPath}?${query}`

    fetch(requestUri)
      .then(response => response.json())
      .then(message => {
        this.setState({ isValid: message.tokenValid })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render () {
    return (
      <div>
        <p>Your token <strong> { this.state.accessToken } </strong></p>

        <p>
          {
            this.state.isValid ?
            'Token is valid' :
            'Your token has not been validated or it has been expired'
          }
        </p>

        <button onClick={this.fetchValidateUri}> Validate again </button>

        <br />
        <br />

        <Logout />

      </div>
    )
  }
}