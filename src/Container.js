import React from 'react';
import Login from  './Login.js'
import TodoList from './TodoList.js'
import './Container.css'

export default class Container extends React.Component {

  constructor(props) {
    super(props);
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.state = {
      loggedIn: false,
      username: ""
    };
  }

  handleUsernameSubmit(e) {
    e.preventDefault();
    console.log(this.state.username)
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
  
  render() {

    return (
      <div>
        { !this.state.loggedIn ? 
            <Login username={this.state.username} handleUsernameChange={this.handleUsernameChange} handleUsernameSubmit={this.handleUsernameSubmit} />  
            : null  
        }

        { this.state.loggedIn ?  
          <TodoList username={this.state.username} /> 
          : null  
        }
      </div>

    );
  }
}


