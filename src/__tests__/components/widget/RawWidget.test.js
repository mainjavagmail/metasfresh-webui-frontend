import React from 'react';
import { mount, shallow, render } from 'enzyme';

import { RawWidget } from '../../../components/widget/RawWidget';
import fixtures from '../../../../test_setup/fixtures/raw_widget.json';

const createDummyProps = function(props) {
  return {
    dispatch: jest.fn(),
    modalVisible: false,
    entity: "window",
    dataId: "1001282",
    ...props,
  };
};

describe('RawWidget component', () => {
  describe('generic tests using LongText widget:', () => {
    it('renders widget without errors', () => {
      const props = createDummyProps(
        {
          ...fixtures.longText.layout1,
          widgetData: [{ ...fixtures.longText.data1 }],
        },
      );

      const wrapper = shallow(<RawWidget {...props} />);
      const html = wrapper.html();

      expect(html).toContain('form-group row');
      expect(html).toContain('input-block');
      expect(wrapper.find('textarea').length).toBe(1);
      expect(html).toContain(fixtures.longText.data1.value)
      expect(html).toContain(fixtures.longText.layout1.description)
    });

    it('renders nothing when widget is not displayed', () => {
      const props = createDummyProps(
        {
          ...fixtures.longText.layout1,
          widgetData: [{ ...fixtures.longText.data1, displayed: false }],
        },
      );

      const wrapper = shallow(<RawWidget {...props} />);
      const html = wrapper.html();

      expect(html).toEqual(null);
    });

    it('calls `handlePatch` on `{enter}/{tab}` keydown', () => {
      const handlePatchSpy = jest.fn();
      const props = createDummyProps(
        {
          ...fixtures.longText.layout1,
          widgetData: [{ ...fixtures.longText.data1 }],
          handlePatch: handlePatchSpy,
        },
      );

      const wrapper = shallow(<RawWidget {...props} />);
      const spy = jest.spyOn(wrapper.instance(), 'handleKeyDown');

      wrapper.find('textarea').simulate(
        'keyDown',
        {
          key: 'Enter',
          target: { value: fixtures.longText.data1.value },
          preventDefault: jest.fn(),
        },
      );

      expect(spy).toHaveBeenCalled();
      expect(handlePatchSpy).toHaveBeenCalled();

      wrapper.find('textarea').simulate(
        'keyDown',
        {
          key: 'Tab',
          target: { value: fixtures.longText.data1.value },
          preventDefault: jest.fn(),
        },
      );

      expect(spy).toHaveBeenCalled();
      expect(handlePatchSpy).toHaveBeenCalled();
    });

    it('doesn\'t call `handlePatch` on `{shift}{enter}` keydown', () => {
      const handlePatchSpy = jest.fn();
      const props = createDummyProps(
        {
          ...fixtures.longText.layout1,
          widgetData: [{ ...fixtures.longText.data1 }],
          handlePatch: handlePatchSpy,
        },
      );

      const wrapper = shallow(<RawWidget {...props} />);
      const spy = jest.spyOn(wrapper.instance(), 'handleKeyDown');

      wrapper.find('textarea').simulate(
        'keyDown',
        {
          key: 'Enter',
          shiftKey: true,
          target: { value: fixtures.longText.data1.value },
          preventDefault: jest.fn(),
        },
      );

      expect(spy).toHaveBeenCalled();
      expect(handlePatchSpy).not.toHaveBeenCalled();
    });

    it('doesn\'t call `handlePatch` on `{shift}{enter}` keydown', () => {
      const handlePatchSpy = jest.fn();
      const props = createDummyProps(
        {
          ...fixtures.longText.layout1,
          widgetData: [{ ...fixtures.longText.data1 }],
          handlePatch: handlePatchSpy,
        },
      );

      const wrapper = shallow(<RawWidget {...props} />);
      const spy = jest.spyOn(wrapper.instance(), 'handleKeyDown');

      wrapper.find('textarea').simulate(
        'keyDown',
        {
          key: 'Enter',
          shiftKey: true,
          target: { value: fixtures.longText.data1.value },
          preventDefault: jest.fn(),
        },
      );

      expect(spy).toHaveBeenCalled();
      expect(handlePatchSpy).not.toHaveBeenCalled();
    });

    it('correct handlers/prop functions are called on focus/blur', () => {
      const patchSpy = jest.fn();
      const blurSpy = jest.fn();
      const focusSpy = jest.fn();
      const clickOutsideSpy = jest.fn();
      const listenOnKeysTrueSpy = jest.fn();
      const listenOnKeysFalseSpy = jest.fn();
      const props = createDummyProps(
        {
          ...fixtures.longText.layout1,
          widgetData: [{ ...fixtures.longText.data1 }],
          handlePatch: patchSpy,
          handleBlur: blurSpy,
          handleFocus: focusSpy,
          listenOnKeysFalse: listenOnKeysFalseSpy,
          listenOnKeysTrue: listenOnKeysTrueSpy,
          enableOnClickOutside: clickOutsideSpy,
        },
      );

      const wrapper = mount(<RawWidget {...props} />);
      const instance = wrapper.instance();
      const handleFocusSpy = jest.spyOn(instance, 'handleFocus');
      const handleBlurSpy = jest.spyOn(instance, 'handleBlur');

      wrapper.instance().forceUpdate();
      wrapper.update();

      wrapper.find('textarea')
        .prop('onFocus')({ target: { value: fixtures.longText.data1.value } });

      expect(focusSpy).toHaveBeenCalled();
      expect(handleFocusSpy).toHaveBeenCalled();
      expect(listenOnKeysFalseSpy).toHaveBeenCalled();

      wrapper.find('textarea')
        .prop('onBlur')(
          { target: { value: fixtures.longText.data1.value } }
        );

      expect(patchSpy).toHaveBeenCalled();
      expect(blurSpy).toHaveBeenCalled();
      expect(handleBlurSpy).toHaveBeenCalled();
      expect(clickOutsideSpy).toHaveBeenCalled();
      expect(listenOnKeysTrueSpy).toHaveBeenCalled();
    });
  });
});
