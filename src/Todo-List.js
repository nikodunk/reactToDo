import React from 'react';

import {SortableContainer} from 'react-sortable-hoc';

import TodoItem from './Todo-Item.js'




const TodoList = SortableContainer(({items, handleRemove, handleUpdate}) => {
  return (
    <div>
        <ul className="container">
          {items.map((value, index) => (
            <TodoItem
              key={`item-${index}`}
              index={index}
              value={value}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
              itemIndex={index} />
          ))}
        </ul>
    </div>
  );
});


export default TodoList;
