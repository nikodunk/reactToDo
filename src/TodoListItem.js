import React from 'react';

// import logo from './logo.svg';
import {SortableElement} from 'react-sortable-hoc';




const TodoListItem = SortableElement(({value, handleRemove, itemIndex, key}) =>

        <div className="todoListItem noselect" style={{background: value.uid}}>
          <p style={{display: "inline", fontWeight:"400"}}>
            {value.name} &nbsp;|&nbsp;
            <span style={{fontWeight:"100"}} >
              {value.address}
            </span> &nbsp;
          </p>
          <button
              onClick={handleRemove.bind(this, itemIndex)}
              className="removeButton"
              >
              Remove
          </button>
        </div>
);

export default TodoListItem;
