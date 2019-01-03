import React, { Component }from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { signupUser } from '../actions/user'
import { Container, Button, Form, Segment, Message } from 'semantic-ui-react'
import ReactDropzone from 'react-dropzone';

class SignupForm extends Component {
  state = {
    username: '',
    password_digest: '',
    email:'',
    avatar:null,
  }

  handleChange = e => {
    this.setState({
      [e.target.username]: e.target.value
     })
  }

  handleLoginSubmit = () => {
    this.props.signupUser(this.state.username, this.state.password_digest)
    this.setState({
      username: '',
      password_digest: ''
    })
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
                type="password_digest"
                label="password_digest"
                placeholder="password_digest"
                username="password_digest"
                onChange={this.handleChange}
                value={this.state.password_digest}
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
