import React from 'react';
import {SortableElement} from 'react-sortable-hoc';
import {ItemEditor} from './ItemEditor.js'



const TodoListItem = SortableElement( function({value, handleRemove, itemIndex, key}){

            return(
              <div
                className="todoListItem noselect"
                style={{background: value.uid}}
                >
                  <ItemEditor className="item" text={value.name}/>
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





//onDoubleClick={editToggle}
//onKeyDown={this._keyAction}
