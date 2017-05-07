import React from 'react';

export default class Login extends React.Component {

  render() {

    return (
            <div>
              <p style={{color: "lightgrey", fontSize: "small"}}>Get a good good to-do list in the cloud</p>
              { !this.props.username ? <h1>Hi! What's your name?</h1> : null}
              { this.props.username ? <h1>Hi, {this.props.username}!</h1> : null}
              <form>
                <input
                  autoFocus
                  type="text"
                  className="addItemInput"
                  onSubmit={this.props.handleUsernameSubmit}
                  onChange={this.props.handleUsernameChange('username')}
                  value={this.props.username}

                />
                <input
                  className="submitButton"
                  type="submit"
                  value="Let's Go!"
                  onClick={this.props.handleUsernameSubmit} />
              </form>
            </div>

    );
  }
}
