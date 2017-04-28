import React from 'react';
import TodoListItem from './TodoListItem.js'
import TodoListForm from './TodoListForm.js'
import firebase from 'firebase';
import './TodoList.css';

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



  handleChange (key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      state['uid'] = Date.now()
      this.setState(state);
    }.bind(this);
  }

  handleSubmit(e) {
      e.preventDefault();
      this.setState({name: "", address: ""});
      this.ref.push({
        name: this.state.name,
        address: this.state.address,
        uid: this.state.uid
      });
    }  

  handleRemove (key) {
    return function () {
      this.items = [{}];
      this.ref = firebase.database().ref(this.state.username);

      var newData = this.state.items.slice();
      newData.splice(key, 1);

      this.setState({items: newData})
      this.ref.set(newData);
      }.bind(this);
  }



  render() {
    return (
        <div>
            <h3>
              {this.props.username}'s To-Do List
            </h3>
            
            <br />

            <div>{this.state.items.map((item, index) =>
              <TodoListItem 
                index={index} 
                item={item} 
                handleRemove={this.handleRemove} 
              />)}
            </div>

            <TodoListForm
              name={this.state.name} 
              address={this.state.address} 
              handleSubmit={this.handleSubmit} 
              handleChange={this.handleChange} 
            />
        </div> 
    );
  }

}



