import React from 'react';
// import logo from './logo.svg';
import './TodoListItem.css';


  function TodoListItem(props) {
      return (
  				<div className="todoListItem">
            <p 
            style={{display: "inline"}}
            key={props.index}
            > 
            {props.item.name} &nbsp;
            <span style={{color: 'grey', fontSize:'0.7rem', fontFamily:"sans-serif", fontWeight:"ultralight"}} >
              {props.item.address}
            </span> &nbsp;
            </p>
            <button
                onClick={props.handleRemove(props.index)}
                className="removeButton"
                >
                Remove
            </button>
            <br />
            <br />
          </div>
          
      );
  }

export default TodoListItem;
