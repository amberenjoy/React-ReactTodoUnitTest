import React from 'react';
import { shallow } from 'enzyme';
import UndoList from '../../components/UndoList';
import { findTestWrapper } from '../../../../utils/testUtils';

const listData = [
  { status: 'div', value: 'Study Jest' },
  { status: 'div', value: 'Study Enzyme' },
  { status: 'div', value: 'Study Jasmine' }
];

describe('UndoList test', () => {
  it('should render UndoList', () => {
    const wrapper = shallow(<UndoList list={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render the default status, no item', () => {
    const wrapper = shallow(<UndoList list={[]} />);
    const countElem = findTestWrapper(wrapper, 'count');
    const listItems = findTestWrapper(wrapper, 'list-item');
    expect(countElem.text()).toEqual('0');
    expect(listItems.length).toEqual(0);
  });
  it('should render no null list, display right length of list and the number of delete buttons', () => {
    const wrapper = shallow(<UndoList list={listData} />);
    const countElem = findTestWrapper(wrapper, 'count');
    const listItems = findTestWrapper(wrapper, 'list-item');
    const deleteItems = findTestWrapper(wrapper, 'delete-item');
    expect(countElem.text()).toEqual('3');
    expect(listItems.length).toEqual(3);
    expect(deleteItems.length).toEqual(3);
  });
  it('should remove the item, after delete item function executed', () => {
    const fn = jest.fn();
    const wrapper = shallow(<UndoList list={listData} deleteItem={fn} />);
    const deleteItems = findTestWrapper(wrapper, 'delete-item');
    deleteItems.at(1).simulate('click');
    expect(fn).toHaveBeenCalledWith(1);
  });
  it('should change status of that item, when click a specific item', () => {
    const fn = jest.fn();
    const wrapper = shallow(<UndoList list={listData} changeStatus={fn} />);
    const changeItems = findTestWrapper(wrapper, 'list-item');
    changeItems.at(1).simulate('click');
    expect(fn).toHaveBeenCalledWith(1);
  });
  it('should render changestatus()', () => {
    const listTestData = [
      { status: 'input', value: 'Study Jest' },
      { status: 'div', value: 'Study Enzyme' },
      { status: 'div', value: 'Study Jasmine' }
    ];
    const wrapper = shallow(<UndoList list={listTestData} />);
    const changeInputItems = findTestWrapper(wrapper, 'input');
    expect(changeInputItems.length).toEqual(1);
  });
  it('should invoke handleBlur()', () => {
    const listTestData = [
      { status: 'input', value: 'Study Jest' },
      { status: 'div', value: 'Study Enzyme' },
      { status: 'div', value: 'Study Jasmine' }
    ];
    const fn = jest.fn();
    const index = 0;
    const wrapper = shallow(<UndoList list={listTestData} handleBlur={fn} />);
    const inputElem = findTestWrapper(wrapper, 'input');
    inputElem.simulate('blur');
    expect(fn).toHaveBeenCalledWith(index);
  });
  it('should invoke valueChange()', () => {
    const listTestData = [{ status: 'input', value: 'Study Jest' }];
    const value = 'Study TDD';
    const fn = jest.fn();
    const wrapper = shallow(<UndoList valueChange={fn} list={listTestData} />);
    const inputElem = findTestWrapper(wrapper, 'input');
    inputElem.simulate('change', {
      target: { value }
    });
    expect(fn).toHaveBeenLastCalledWith(0, value);
  });
});
