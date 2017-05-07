import React from 'react';

import TodoList from './Todo-List.js'
import TodoListAdder from './Todo-Adder.js'
import './Container.css';

import firebase from 'firebase';
import {arrayMove} from 'react-sortable-hoc';


var config = {
  // apiKey: "some-api-key",
  authDomain: "solarforms-b9faa.firebaseio.com/",
  databaseURL: "https://solarforms-b9faa.firebaseio.com/",
  // storageBucket: "some-app.appspot.com",
};

firebase.initializeApp(config);


export default class TodoListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleChangedText = this.handleChangedText.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this._fbUpdate = this._fbUpdate.bind(this);

    this.state = {
      name: '',
      uid: '',
      items: [],
      username: this.props.username,
    };
    this.ref = firebase.database().ref(this.state.username);
  }

  componentWillMount() {
    this.items = [{}];
    this.ref.on("value", (dataSnapshot) => {
      this.items = dataSnapshot.val()
      this.items = Object.keys(this.items).map(key => this.items[key])
      this.setState({
          items: this.items
      })
      // console.log(this.state.items)
    })
  }

  componentWillUnmount() {
    this.ref.off();
  };

  handleChangedText (key) {
    return function (e) {
      var _newState = {};
      _newState[key] = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
      this.setState(_newState);
    }.bind(this);
  }

  handleCreate(e) {
      e.preventDefault();
      if(this.state.name === "") {
        this.setState({name: "Double click me to edit, drag me to reorder!"}).bind(this)
      }
      this.ref.push({
        name: this.state.name,
        uid: this._getRandomColor()
      });
      this.setState({name: ""});
      console.log(this.state.items)
    }


  handleUpdate = (e, key) => {
    //  console.log(key, e)
     var _newData = this.state.items
     var _updated = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
     _newData[key].name = _updated
    //  console.log(_newData)
     this.setState({
       items: _newData
     })
     console.log(this.state)
     this._fbUpdate(this.state.items)
  };

  handleDelete (id) {
      if(this.state.items.length !== 1){
        var _newData = this.state.items;
        _newData.splice(id, 1);
        this._fbUpdate(_newData)
      }
      else{
        console.log('branch running')
        _newData =  [{}]
        this.setState({
          items: _newData
        })
        this._fbUpdate(this._newData)
      }
  }

  handleSort = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
    this._fbUpdate(this.state.items)
  };

  _getRandomColor () {
    var hex = Math.floor(Math.random() * 0xFFFFFF);
    return "#" + ("000000" + hex.toString(16)).substr(-6);
  }

  _fbUpdate(_newData){
    console.log('updating server...')
    this.ref.set(_newData)
    // this.componentWillMount()
  }

  render() {
    return (
      <div>
      <ul className="container">

      </ul>
          <div className="titleBox">
            <h2 className="title">
              {this.props.username}'s To-Do List
            </h2>
            <button onClick={this.props.handleLogout} className="logoutButton">¡Adios!</button>
          </div>

            <TodoList
              items={this.state.items}
              distance={5}
              onSortEnd={this.handleSort}
              handleRemove={this.handleDelete}
              handleUpdate={this.handleUpdate} />

            <TodoListAdder
              name={this.state.name}
              handleSubmit={this.handleCreate}
              handleChange={this.handleChangedText}
            />
      </div>
    )
  }
}
