import React from 'react';
import Header from './components/Header';
import UndoList from './components/UndoList';
import './style.css';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      undoList: []
    };
  }
  valueChange = (index, value) => {
    const newList = this.state.undoList.map((item, listIndex) => {
      if (index === listIndex) {
        return {
          ...item,
          value
        };
      }
      return item;
    });
    this.setState({ undoList: newList });
  };

  handleBlur = index => {
    const newList = this.state.undoList.map((item, listIndex) => {
      if (index === listIndex) {
        return {
          ...item,
          status: 'div'
        };
      }
      return item;
    });
    this.setState({ undoList: newList });
  };

  changeStatus = index => {
    const newList = this.state.undoList.map((item, listIndex) => {
      if (index === listIndex) {
        return {
          ...item,
          status: 'input'
        };
      }
      return {
        ...item,
        status: 'div'
      };
    });
    this.setState({ undoList: newList });
  };

  addUndoItem = value => {
    this.setState({
      undoList: [
        ...this.state.undoList,
        {
          status: 'div',
          value
        }
      ]
    });
  };

  deleteItem = index => {
    const newList = [...this.state.undoList];
    newList.splice(index, 1);
    this.setState({
      undoList: newList
    });
  };

  render() {
    const { undoList } = this.state;
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />

        <UndoList
          list={undoList}
          deleteItem={this.deleteItem}
          changeStatus={this.changeStatus}
          handleBlur={this.handleBlur}
          valueChange={this.valueChange}
        />
      </div>
    );
  }
}

export default TodoList;
