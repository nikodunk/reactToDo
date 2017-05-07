import React from 'react';

import {SortableContainer} from 'react-sortable-hoc';

import TodoListItem from './TodoListItem.js'




const TodoList = SortableContainer(({items, handleRemove}) => {
  return (
    <div>
        <ul className="container">
          {items.map((value, index) => (
            <TodoListItem
              key={`item-${index}`}
              index={index}
              value={value}
              handleRemove={handleRemove}
              itemIndex={index} />
          ))}
        </ul>
    </div>
  );
});


export default TodoList;
