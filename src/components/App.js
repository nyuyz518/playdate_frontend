import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { fetchCurrentUser } from '../actions/user';
import LoginForm from './loginForm';
import SignupForm from './signupForm';
import EventsIndex from './eventsIndex';
import EventsNew from './eventsNew';
import EventsShow from './eventsShow';
import Footer from './footer'

class App extends Component {
  componentDidMount() {
    if (this.props.location.pathname !== '/login'
      && this.props.location.pathname !== '/signup'
      && this.props.location.pathname !== '/'){
        if (this.props.user.user === null) this.props.fetchCurrentUser()
      }
    }

  render() {
    const loggedIn = this.props.user.loggedIn
    return (
      <Router>
        <Fragment>
            <Switch>
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/signup" component={SignupForm} />
              <Route path="/" component={EventsIndex} />
            </Switch>
            { loggedIn ? (
              <Fragment>
                <Route path="/events/new" key="event_new" component={EventsNew} />
                <Route path="/events/update/:id" key="event_update" component={EventsNew} />
                <Route path="/events/:id" component={EventsShow} />
                <Route path="/" component={EventsIndex} />
              </Fragment>
            ) : null}
            <Footer />
        </Fragment>
      </Router>
    )
  }
}

const mapStateToProps = ({ usersReducer: user }) => ({ user })

function mapDispatchToProps(dispatch) {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
