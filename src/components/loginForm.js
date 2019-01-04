import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { loginUser } from '../actions/user'
import { Button, Form, Segment, Message } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'


class LoginForm extends React.Component {
  state = {
    username: '',
    password_digest: ''
  }

  handleChange = (e, semanticInputData) => {
    this.setState({ [semanticInputData.username]: semanticInputData.value })
  }

  handleLoginSubmit = () => {
    this.props.loginUser(this.state.username, this.state.password_digest)
    this.setState({ username: '', password_digest: '' })
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
                label="username"
                placeholder="username"
                name="username"
                onChange={this.handleChange}
                value={this.state.username}
              />
              <Form.Input
                type="password"
                label="password_digest"
                placeholder="password_digest"
                name="password_digest"
                onChange={this.handleChange}
                value={this.state.password_digest}
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
