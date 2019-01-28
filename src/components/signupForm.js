import React, { Component }from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { signupUser } from '../actions/user'
import { Container, Button, Form, Segment, Message } from 'semantic-ui-react'

class SignupForm extends Component {
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
    this.props.signupUser(this.state.username, this.state.password)
    this.setState({ username: '', password: '' })
  }
  // state = {
  //   username: '',
  //   password: '',
  // }
  //
  // handleChange = e => {
  //   this.setState({
  //     [e.target.username]: e.target.value
  //    })
  // }
  //
  // handleLoginSubmit = () => {
  //   let password_digest = sha256(this.state.password).toString();
  //   this.props.signupUser(this.state.username, password_digest)
  //   this.setState({ username: '', password: '' })
  // }

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
            <Button type="submit">Sign Up</Button>
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

export default connect(mapStateToProps, { signupUser })(SignupForm)
