import React from 'react';
import ReactDOM from 'react-dom';

import Login from  './Login.js'
import TodoListMain from './Container.js'

import './index.css';


export default class Container extends React.Component {

	  constructor(props) {
	    super(props);
	    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
	    this.handleUsernameChange = this.handleUsernameChange.bind(this);
	    this.handleLogout = this.handleLogout.bind(this);
	    this.state = {
	      loggedIn: false,
	      username: ""
	    };
	  }

	  handleUsernameSubmit(e) {
	    e.preventDefault();
	    // console.log(this.state.username)
	    this.setState({
	          username: this.state.username,
	          loggedIn: true
	        })
	  }

	  handleUsernameChange () {
	    return function (e) {
	      var state = {};
	      state.username = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
	      this.setState(state);
	    }.bind(this);
	  }

	  handleLogout(){
	      this.setState({
	          username: "",
	          loggedIn: false
	        })
	  }

	  render() {
	    return (
	      <div>
	        { !this.state.loggedIn ?
	            <Login username={this.state.username} handleUsernameChange={this.handleUsernameChange} handleUsernameSubmit={this.handleUsernameSubmit} />
	            : null
	        }

	        { this.state.loggedIn ?
	          <TodoListMain username={this.state.username} handleLogout={this.handleLogout}/>
	          : null
	        }
	      </div>

	    );
	  }
}




ReactDOM.render(
	<Container />,
  document.getElementById('root')
);
