import React from 'react';
// import logo from './logo.svg';


  function TodoListItem(props) {
      return (
  				<div className="todoListItem">
            <p style={{display: "inline", fontWeight:"400"}}> 
              {props.item.name} &nbsp;
              <span style={{color: 'grey', fontWeight:"100"}} >
                {props.item.address}
              </span> &nbsp;
            </p>
            <button
                style={{color:"salmon"}}
                onClick={props.handleRemove(props.index)}
                className="removeButton"
                >
                Remove
            </button>
          </div>
          
      );
  }

export default TodoListItem;
