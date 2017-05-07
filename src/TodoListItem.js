import React from 'react';

// import logo from './logo.svg';
import {SortableElement} from 'react-sortable-hoc';




const TodoListItem = SortableElement(

        function({value, handleRemove, itemIndex, key}){
          
          return(
            <div className="todoListItem noselect" style={{background: value.uid}}>
              <p onDoubleClick={null}>
                {value.name}
              </p>
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
