import React from 'react';
import {SortableElement} from 'react-sortable-hoc';
import {ItemEditor} from './Todo-Editor.js'



const TodoListItem = SortableElement( function({value, handleRemove, handleUpdate, itemIndex, key}){

            return(
              <div
                className="todoListItem noselect"
                style={{background: value.uid}}
                >
                  <ItemEditor className="item" handleUpdate={handleUpdate} itemIndex={itemIndex} name={value.name}/>

                  <button
                      onClick={handleRemove.bind(this, itemIndex)}
                      className="removeButton"
                      >
                      Remove
                  </button>
              </div>
            )
          }
);

export default TodoListItem;





// <p style={{display: "inline"}}>{value.name}</p>
