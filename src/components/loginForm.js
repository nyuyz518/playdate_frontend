import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { loginUser } from '../actions/user'
import { Button, Form, Segment, Message } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import sha256 from 'crypto-js/sha256'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
  }

  handleChange (e, semanticInputData) {
    this.setState({
      [semanticInputData.name]: semanticInputData.value
    })
  }

  handleLoginSubmit () {
    let password_digest = sha256(this.state.password).toString();
    this.props.loginUser(this.state.username, password_digest)
    this.setState({ username: '', password: '' })
  }

  render() {
    return this.props.loggedIn ? (
      <Redirect to="/events" />
    ) : (
      <Container>
        <Segment>
          <Form
            onSubmit={this.handleLoginSubmit}
            size="mini"
            key="mini"
            loading={this.props.authenticatingUser}
            error={this.props.failedLogin}
          >
            <Message error header={this.props.failedLogin ? this.props.error : null} />
            <Form.Field>
              <Form.Input
                placeholder="username"
                name="username"
                onChange={this.handleChange}
                value={this.state.username}
              />
              <Form.Input
                type="password"
                placeholder="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </Form.Field>
            <Button type="submit">Login</Button>
          </Form>
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = ({ usersReducer: { authenticatingUser, failedLogin, error, loggedIn } }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn
})

export default connect(mapStateToProps, { loginUser })(LoginForm)
