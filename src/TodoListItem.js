import React from 'react';
import {SortableElement} from 'react-sortable-hoc';
import {ItemEditor} from './ItemEditor.js'



const TodoListItem = SortableElement( function({value, handleRemove, itemIndex, key}){

            return(
              <div
                className="todoListItem noselect"
                style={{background: value.uid}}
                >
                  <p style={{display: "inline"}}>{value.name}</p>

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





//<ItemEditor className="item" text={value.name}/>
