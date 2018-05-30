import GamePin from '@/components/game/GamePin';

import { mount } from '@vue/test-utils';

describe('GamePin.vue', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(GamePin, {
      propsData: {
        number: 12,
        isSelected: false,
      },
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
