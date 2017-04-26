import React from 'react';
// import LoginPanel from  './LoginPanel.js'
import TodoList from './TodoList.js'


export default class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.handleUsername = this.handleUsername.bind(this);
    this.state = {
      loggedIn: false,
      username: ""
    };
  }

  handleUsername(e) {
    e.preventDefault();
    console.log(this.state.username)
    this.setState({ 
          username: this.state.username, 
          loggedIn: true 
        })
  }

  handleChange (key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value.toLowerCase();
      this.setState(state);
    }.bind(this);
  }
  
  render() {

    return (
      <div>
        { !this.state.loggedIn ?
        <div>
          { !this.state.username ? <h1>Hi there! What's your name?</ h1> : null}
          { this.state.username ? <h1>Hi, {this.state.username}!</ h1> : null}
          <form>
            <input 
              onChange={this.handleChange('username')} 
              value={this.state.username} 
            />
            <input type="button" value="Go!" onClick={this.handleUsername} />
          </form>
        </div> : null}

        { this.state.loggedIn ?  <TodoList username={this.state.username} /> : null }
      </div>

    );
  }



  

}



