import Vue from 'vue';
import Pin from '@/components/Pin';

import {
  mount,
  shallowMount
} from '@vue/test-utils'


describe('Pin.vue', () => {
  let vm, cmp;

  beforeEach(() => {
    cmp = mount(Pin, {
      propsData: {
        number: 12,
        isSelected: false
      }
    });
  });

  it('should render the number', () => {
    expect(cmp.find('.number').text()).toEqual('12');
  });

  it('pin click should throw event', () => {
    cmp.trigger('click');
    expect(cmp.emitted('pinClicked')).toBeTruthy();
    expect(cmp.emitted('pinClicked')[0]).toEqual([12]);
  });
});
