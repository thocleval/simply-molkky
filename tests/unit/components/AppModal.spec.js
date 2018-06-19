import AppSimpleModal from '@/components/AppSimpleModal';

import { mount } from '@vue/test-utils';

describe('AppSimpleModal.vue', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(AppSimpleModal, {
      propsData: {
        title: 'Modal title',
        content: 'This is some content with <strong>html</strong>',
      },
    });
  });

  it('should render correctly', () => {
    expect(cmp.find('.title').text()).toEqual('Modal title');
    expect(cmp.find('.content').text()).toEqual('This is some content with html');
    expect(cmp.find('.content').html()).toEqual('<p class="content">This is some content with <strong>html</strong></p>');
  });

  it('pin click should throw event', () => {
    cmp.vm.validate();

    expect(cmp.emitted('validate')).toBeTruthy();
  });
});
