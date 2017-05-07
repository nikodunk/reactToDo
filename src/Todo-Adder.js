import React from 'react';

class TodoListForm extends React.Component {

  render() {

    return (
            <form style={{marginTop: "50px" }} className="divHover">
                <input
                  autoFocus
                  type="text"
                  className="addItemInput"
                  placeholder="Add an item here..."
                  onChange={this.props.handleChange('name')}
                  value={this.props.name}
                /> &nbsp;
                <button
                  className="addItemButton"
                  type="submit"
                  onClick={this.props.handleSubmit}>
                  <b>+</b>
                </button>
            </form>
    );
  }

}


export default TodoListForm
