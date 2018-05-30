import AppIcon from '@/components/AppIcon';

import { mount } from '@vue/test-utils';

describe('AppIcon.vue', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(AppIcon, {
      propsData: {
        icon: 'test',
      },
    });
  });

  it('should render correctly', () => {
    expect(cmp.html()).toContain('<i class="icon icon-test"></i>');
  });
});
