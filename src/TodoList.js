import React from 'react';

import TodoListItem from './TodoListItem.js'
import TodoListForm from './TodoListForm.js'
import './TodoList.css';

import firebase from 'firebase';
import Dragula from 'react-dragula';



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
      state[key] = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
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
      this.ref.set(this.state.items);
      }.bind(this);
  }


  dropHandler(el){
    console.log()
  }

  render() {
    return (

        <div>
            <div className="titleBox">
              <h2 className="title">
                {this.props.username}'s To-Do List
              </h2>
              <button onClick={this.props.handleLogout} className="logoutButton">¡Adios!</button>
            </div>

            <div className="container" ref={this.dragulaDecorator}>
              {this.state.items.map((item, i) =>
                  <TodoListItem key={i} handleRemove={this.handleRemove} item={item} />
              )}
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

  dragulaDecorator = (componentBackingInstance) => {
      if (componentBackingInstance) {
        let options = { };
        Dragula([componentBackingInstance], options)
        .on('drop', this.dropHandler)
      }

    };

}