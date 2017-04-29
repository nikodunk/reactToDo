import React from 'react';
// import TodoListItem from './TodoListItem.js'
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

var placeholder = document.createElement("div");
placeholder.className = "placeholder";


export default class TodoList extends React.Component {

  constructor(props) {

    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
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

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    console.log('za')
    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    e.dataTransfer.setData("text/html", e.currentTarget);
  }

  dragEnd(e) {
    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);

    // Update state
    var newData = this.state.items;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    
    if(from < to) to--;
    if(this.nodePlacement == "after") to++;

    newData.splice(to, 0, newData.splice(from, 1)[0]);
    this.setState({items: newData});

    this.ref = firebase.database().ref(this.state.username);
    this.ref.set(this.state.items);

  }
  
  dragOver(e) {
    e.preventDefault();


    this.dragged.style.display = "none";
    if(e.target.className == "placeholder") return;
    this.over = e.target;



    // Inside the dragOver method
    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    var parent = e.target.parentNode;

    if(relY > height) {
      this.nodePlacement = "after";
      parent.insertBefore(placeholder, e.target.nextElementSibling);
    }
    else if(relY < height) {
      this.nodePlacement = "before"
      parent.insertBefore(placeholder, e.target);
    }


    
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

            <div onDragOver={this.dragOver} style={{marginTop:50}}>
              {this.state.items.map((item, i) =>
                  <div
                    className="todoListItem"
                    data-id={i}
                    key={i}
                    draggable="true"
                    onDragEnd={this.dragEnd}
                    onDragStart={this.dragStart}
                  > <b>{item.name}</b> &nbsp; {item.address}
                  <button
                        className="removeButton"
                        style={{color:"salmon"}}
                        onClick={this.handleRemove(i)}
                        >
                        Remove
                    </button>  
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

}



