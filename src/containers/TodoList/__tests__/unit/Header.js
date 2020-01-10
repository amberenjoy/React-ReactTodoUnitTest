import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';
import { findTestWrapper } from '../../../../utils/testUtils';

describe('Header test', () => {
  it('should render header', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a input element', () => {
    const wrapper = shallow(<Header />);
    const inputElem = findTestWrapper(wrapper, 'input');
    expect(inputElem.length).toBe(1);
  });

  it('should set default value of the input element', () => {
    const wrapper = shallow(<Header />);
    const inputElem = findTestWrapper(wrapper, 'input');
    expect(inputElem.prop('value')).toEqual('');
  });

  it('should change input value when user type in5', () => {
    const wrapper = shallow(<Header />);
    const inputElem = findTestWrapper(wrapper, 'input');
    const userInput = 'Study Jest';
    inputElem.simulate('change', {
      target: { value: userInput }
    });
    expect(wrapper.state('value')).toEqual(userInput);
  });

  it('should submit failed, if input null', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn} />);
    const inputElem = findTestWrapper(wrapper, 'input');
    wrapper.setState({ value: '' });
    inputElem.simulate('keyUp', {
      keyCode: 13
    });
    expect(fn).not.toHaveBeenCalled();
  });

  it('should submit input notNull value and clear input value after submitted', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn} />);
    const inputElem = findTestWrapper(wrapper, 'input');
    const userInput = 'Study Jest';
    wrapper.setState({ value: userInput });
    inputElem.simulate('keyUp', {
      keyCode: 13
    });
    expect(fn).toHaveBeenCalledWith(userInput);
    const newInputElem = findTestWrapper(wrapper, 'input');
    expect(newInputElem.prop('value')).toBe('');
  });
});
