import React from 'react';
import './ItemEditor.css'


export class ItemEditor extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      editing: props.editing,
      text: props.text
    }
  }

  static propTypes = {
    text: React.PropTypes.string,
    editing: React.PropTypes.bool
  };


  _editElement = () => {
    this.setState({editing: true}, () => {});
  }

  _keyAction = (e) => {
     if(e.keyCode === 13) {
       // Enter to save
       this.setState({text: e.target.value, editing: false});
     } else if(e.keyCode === 27) {
       // ESC to cancel
       this.setState({editing: false});
     }
  }

  _renderElement = () => {
    if(this.state.editing) {
      return(
          <input
            type="text"
            onKeyDown={this._keyAction}
            defaultValue={this.state.text}
            ref="textField" />
      );
    } else {
      return(
        <p className="item" onDoubleClick={this._editElement}> {this.state.text} </p>
      );
    }
  }

  render() {
    return this._renderElement();
  }
}
