import FaultsCounter from '@/components/game/FaultsCounter';

import { mount } from '@vue/test-utils';

describe('FaultsCounter.vue', () => {
  let cmp;

  it('should render empty', () => {
    cmp = mount(FaultsCounter, {
      propsData: {
        faults: 0,
      },
    });

    expect(cmp.findAll('.fault').length).toEqual(3);
    expect(cmp.findAll('.fault.x').length).toEqual(0);
  });

  it('should render correctly', () => {
    cmp = mount(FaultsCounter, {
      propsData: {
        faults: 2,
      },
    });

    expect(cmp.findAll('.fault').length).toEqual(3);
    expect(cmp.findAll('.fault.x').length).toEqual(2);
  });

  it('should render more than 3 faults', () => {
    cmp = mount(FaultsCounter, {
      propsData: {
        faults: 5,
      },
    });

    expect(cmp.findAll('.fault').length).toEqual(5);
    expect(cmp.findAll('.fault.x').length).toEqual(5);
  });

  it('should adapt rendering over 6 faults', () => {
    cmp = mount(FaultsCounter, {
      propsData: {
        faults: 6,
      },
    });

    expect(cmp.findAll('.fault').length).toEqual(1);
    expect(cmp.findAll('.fault.x').length).toEqual(1);
    expect(cmp.find('.faults-number').text()).toEqual('6');
  });
});
