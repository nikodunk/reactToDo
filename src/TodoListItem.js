import React from 'react';
// import logo from './logo.svg';
import './TodoListItem.css';


  function TodoListItem(props) {
      return (
  				<p key={props.index}> 
            {props.item.name} &nbsp;
            <span style={{color: 'grey', fontSize:'0.7rem', fontFamily:"sans-serif", fontWeight:"ultralight"}} >
              {props.item.address}
            </span> &nbsp;
            <button
              onClick={props.handleRemove(props.index)}
              className="removeButton">
              Remove
            </button>
            <hr />
          </p> 
      );
  }

export default TodoListItem;
