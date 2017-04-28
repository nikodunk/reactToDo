import React from 'react';
// import logo from './logo.svg';
import './TodoObject.css';


  function TodoObject(props) {
      return (
  				<p key={props.index}> 
                    {props.item.name} &nbsp;
                    <span style={{color: 'grey', fontSize:'0.7rem', fontFamily:"sans-serif", fontWeight:"ultralight"}} >{props.item.address}</span> &nbsp;
                    <button
                      onClick={props.handleRemove(props.index)}
                      className="removeButton">
                      Remove
                    </button>
                </p> 
      );
  }

export default TodoObject;
