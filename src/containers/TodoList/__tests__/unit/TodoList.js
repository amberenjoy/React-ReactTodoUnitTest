import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '../../index';

const listData = [
  { status: 'div', value: 'Study Jest' },
  { status: 'div', value: 'Study Enzyme' },
  { status: 'div', value: 'Study Jasmine' }
];
const listTestData = [
  { status: 'input', value: 'Study Jest' },
  { status: 'div', value: 'Study Enzyme' },
  { status: 'div', value: 'Study Jasmine' }
];
const userInput = 'Study Jest';

describe('TodoList test', () => {
  it('should render the default TodoList', () => {
    const wrapper = shallow(<TodoList />);
    expect(wrapper.state('undoList')).toEqual([]);
    const Header = wrapper.find('Header');
    expect(Header.prop('addUndoItem')).toBeTruthy();
  });
  it('should add the undoItem function to Header', () => {
    const wrapper = shallow(<TodoList />);
    wrapper.instance().addUndoItem(userInput);
    expect(wrapper.state('undoList').length).toEqual(1);
    expect(wrapper.state('undoList')[0]).toEqual({
      status: 'div',
      value: userInput
    });
  });
  it('should pass  the list data and deleteItem() and changeStatus()', () => {
    const wrapper = shallow(<TodoList />);
    const UndoList = wrapper.find('UndoList');
    expect(UndoList.prop('list')).toBeTruthy();
    expect(UndoList.prop('deleteItem')).toBeTruthy();
    expect(UndoList.prop('changeStatus')).toBeTruthy();
    expect(UndoList.prop('handleBlur')).toBeTruthy();
    expect(UndoList.prop('valueChange')).toBeTruthy();
  });
  it('should remove an item, when executing delete function', () => {
    const wrapper = shallow(<TodoList />);
    wrapper.setState({
      undoList: listData
    });
    wrapper.instance().deleteItem(1);
    expect(wrapper.state('undoList')).toEqual([listData[0], listData[2]]);
  });
  it('should changeStatus()', () => {
    const wrapper = shallow(<TodoList />);
    wrapper.setState({
      undoList: listData
    });
    wrapper.instance().changeStatus(1);
    expect(wrapper.state('undoList')[1]).toEqual({
      ...listData[1],
      status: 'input'
    });
  });
  it('should handleBlur()', () => {
    const wrapper = shallow(<TodoList />);
    wrapper.setState({
      undoList: listTestData
    });
    wrapper.instance().handleBlur(0);
    expect(wrapper.state('undoList')[0]).toEqual({
      ...listData[0],
      status: 'div'
    });
  });
  it('should pass valueChange()', () => {
    const wrapper = shallow(<TodoList />);
    wrapper.setState({
      undoList: listTestData
    });
    wrapper.instance().handleBlur(0);
    expect(wrapper.state('undoList')[0]).toEqual({
      ...listData[0],
      status: 'div'
    });
  });
  it('should invoke valueChange()', () => {
    const wrapper = shallow(<TodoList />);
    wrapper.setState({
      undoList: listTestData
    });
    const value = 'Study TDD';
    wrapper.instance().valueChange(0, value);
    expect(wrapper.state('undoList')[0]).toEqual({
      ...listTestData[0],
      value
    });
  });
});
