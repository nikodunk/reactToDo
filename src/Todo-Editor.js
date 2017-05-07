import React from 'react';
import './Todo-Editor.css'


export class ItemEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false
    }
  }

  // static propTypes = {
  //   name: React.PropTypes.string,
  //   editing: React.PropTypes.bool
  // };


  _editElement = () => {
    this.setState({editing: true}, () => {});
  }

  _updateElement = (e) => {
     if(e.keyCode === 13) {
       // Enter to save
       this.props.handleUpdate(e, this.props.itemIndex)
       this.setState({editing: false});
     } else if(e.keyCode === 27) {
       // ESC to cancel
       this.setState({editing: false});
     }
  }

  _renderElement = () => {
    if(this.state.editing) {
      return(
          <p className="item">
          <input
            className="ItemEditorInput"
            type="text"
            onKeyDown={this._updateElement}
            defaultValue={this.props.name}
            ref="textField"

             /> &nbsp; <span style={{fontSize:"0.8rem"}}>Press enter</span>
             </p>
      );
    } else {
      return(
        <p className="item" onDoubleClick={this._editElement}> {this.props.name} </p>
      );
    }
  }

  render() {
    return this._renderElement();
  }
}
