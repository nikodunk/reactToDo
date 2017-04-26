import React from 'react';
// import logo from './logo.svg';
import './TodoObject.css';


  function TodoObject(props) {
      return (
  				<p key={props.index}> 
                    <b>{props.item.name}</b> &nbsp;
                    <span style={{color: 'grey'}} >{props.item.address}</span> &nbsp;
                    <button onClick={props.handleRemove(props.index)}>
                      Remove
                    </button>
                </p> 
      );
  }

export default TodoObject;
