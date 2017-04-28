import React from 'react';


export default class TodoListForm extends React.Component {

  render() {

    return (
            <form style={{marginTop: "30" }}>
                <input 
                  autoFocus
                  type="text"
                  className="addItemInput"
                  placeholder="Item"
                  onChange={this.props.handleChange('name')} 
                  value={this.props.name}
                /> &nbsp;
                <input 
                  className="addItemInput"
                  placeholder="Comment"
                  onChange={this.props.handleChange('address')} 
                  value={this.props.address}
                />
                <input 
                  className="addButton"
                  type="submit" 
                  value="Add" 
                  onClick={this.props.handleSubmit} />
            </form>
    );
  }

}



