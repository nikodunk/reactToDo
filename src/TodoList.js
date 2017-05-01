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
    this.dropHandler = this.dropHandler.bind(this);

    this.state = {
      name: '',
      address: '',
      uid: '',
      items: [],
      username: this.props.username,
    };
    this.ref = firebase.database().ref(this.state.username);

  }

  componentWillMount() {
    this.items = [{}];
    this.ref.on("child_added", function(dataSnapshot) {
      this.items.push( dataSnapshot.val());
      var newStuff = this.items.slice(1,50)
      this.setState({
          items: newStuff
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

  handleRemove (id) {
    return function () {
      this.items = [{}];

      var newData = this.state.items.slice();
      newData.splice(id, 1);

      this.setState({items: newData})
      this.ref.set(this.state.items);
      }.bind(this);
  }


  dropHandler(a, b, c, d){
      console.log("dropHandler:");
      console.log('item ' + a.id +' dropped before before '+ d.id)
      var newData = this.state.items.slice()
      var originalData = this.state.items.slice()
      newData.splice(a.id, 1);
      newData.splice(d.id-1, 0, originalData[a.id]);
      console.log(this.state, newData)
      this.setState({items: newData}, this.updateFB())

  }

  updateFB(){
    console.log('updating FB...')
    this.ref.set(this.state.items)
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
                <div id={i} key={i}>
                  <TodoListItem handleRemove={this.handleRemove} id={i} item={item} />
                </div>
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
