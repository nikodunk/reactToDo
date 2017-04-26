import React from 'react';
// import TodoObject from './TodoObject.js'
import firebase from 'firebase';

var config = {
  // apiKey: "some-api-key",
  authDomain: "solarforms-b9faa.firebaseio.com/",
  databaseURL: "https://solarforms-b9faa.firebaseio.com/",
  // storageBucket: "some-app.appspot.com",
};

firebase.initializeApp(config);



export default class TodoList extends React.Component {

  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.state = {
      name: '', 
      address: '',
      uid: '',
      items: [],
      username: this.props.username,
    };
  }

  componentWillMount() {
    this.items = [{}];
    this.ref = firebase.database().ref(this.state.username);
    this.ref.on("child_added", function(dataSnapshot) {
      this.items.push( dataSnapshot.val()); 
      this.setState({ 
          items: this.items.slice(1,100)
      })
    }.bind(this));
  }

  componentWillUnmount() {
    this.ref.off();
  };

  render() {

    return (
        <div>
          <h3>My To Do List Today <span style={{color:"grey"}} >{this.props.username}</span></h3>
            <br />
            <div>
                {this.state.items.map((item, index) =>
                      <p key={index}> 
                        <b>{item.name}</b> &nbsp;
                        <span style={{color: 'grey'}} >{item.address}</span> &nbsp;
                        <button onClick={this.handleRemove(index)}>
                          Remove
                        </button>
                      </p> 
                )}
            </div>
            <form>
              <input 
                placeholder="Item"
                onChange={this.handleChange('name')} 
                value={this.state.name} 
              />
              <input 
                placeholder="Comment"
                onChange={this.handleChange('address')} 
                value={this.state.address}
              />
              <input type="submit" value="Add" onClick={this.handleSubmit} />
            </form>
        </div> 
    );
  }
  // <p> {this.state.name} - {this.state.address}</p>
  //<p><b>uid:</b> {this.state.uid}</p>

  handleChange (key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      state['uid'] = Date.now()
      this.setState(state);
    }.bind(this);
  }

  

  handleRemove (key) {
    return function () {
      this.items = [{}];
      this.ref = firebase.database().ref(this.state.username);

      var newData = this.state.items.slice();
      newData.splice(key, 1);

      this.ref.set(newData);
      this.setState({items: newData})
      
      }.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    this.ref.push({
      name: this.state.name,
      address: this.state.address,
      uid: this.state.uid
    });
    this.setState({name: "", address: ""});
  }


  handleUsername() {
    console.log(this.state.username)
    this.setState({ 
          username: this.state.username, 
          loggedIn: true 
        })
  }

}



