import Vue from 'vue';
import VueI18n from 'vue-i18n'
import ScoreSelector from '@/components/ScoreSelector';
import Pin from '@/components/Pin';
import en from '@/i18n/en.json';
import {
  mount,
  shallowMount
} from '@vue/test-utils'


const messages = {
  en: en
};

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en',
  messages
});


describe('ScoreSelector.vue', () => {
  let vm, cmp;

  beforeEach(() => {
    cmp = mount(ScoreSelector, {
      i18n
    });
  });

  it('should render 12 pins', () => {
    cmp = shallowMount(ScoreSelector, {
      i18n
    });

    expect(cmp.findAll(Pin).length).toEqual(12);
  });

  it('pin event pinClicked should trigger onPinClick', async () => {
    const spy = spyOn(ScoreSelector.methods, 'onPinClick');
    cmp = mount(ScoreSelector, { i18n })
    const pins = cmp.findAll(Pin);

    pins.at(0).vm.$emit('pinClicked', 5);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(5);
  });

  it('should select number on pin click', () => {
    cmp.vm.onPinClick(2);

    expect(cmp.vm.selected.length).toEqual(1);
    expect(cmp.vm.selected[0]).toEqual(2);
  });

  it('should deselect number on already selected pin', () => {
    cmp.vm.selected = [2];
    cmp.vm.onPinClick(2);

    expect(cmp.vm.selected.length).toEqual(0);
  });

  it('should select multiple numbers', () => {
    cmp.vm.onPinClick(2);
    cmp.vm.onPinClick(5);

    expect(cmp.vm.selected.length).toEqual(2);
    expect(cmp.vm.selected[0]).toEqual(2);
    expect(cmp.vm.selected[1]).toEqual(5);
  });

  it('should score the pin number if only one selected', () => {
    cmp.vm.onPinClick(12);

    expect(cmp.vm.score).toEqual(12);
  });

  it('should score the quantity of solected if multiple selected', () => {
    cmp.vm.onPinClick(2);
    cmp.vm.onPinClick(5);
    cmp.vm.onPinClick(12);

    expect(cmp.vm.score).toEqual(3);
  });

  it('should reset the score', () => {
    cmp.vm.onPinClick(2);
    cmp.vm.onPinClick(5);
    cmp.vm.onPinClick(12);

    cmp.vm.resetScore();

    expect(cmp.vm.selected.length).toEqual(0);
    expect(cmp.vm.score).toEqual(0);
  });

  it('score validation should throw event and reset score', () => {
    cmp.vm.selected = [12, 5, 6, 9];
    cmp.vm.validateScore();

    expect(cmp.emitted('validateScore')).toBeTruthy();
    expect(cmp.emitted('validateScore')[0]).toEqual([4]);
  });

  it('score validation should throw event and reset score', () => {
    cmp.vm.selected = [12, 5, 6, 9];
    cmp.vm.validateScore();

    expect(cmp.emitted('validateScore')).toBeTruthy();
    expect(cmp.emitted('validateScore')[0]).toEqual([4]);
  });

  it('button click should call the validation', () => {
    const spy = spyOn(ScoreSelector.methods, 'validateScore');
    cmp = mount(ScoreSelector, { i18n })
    const button = cmp.find('.btn-validate');

    button.trigger('click');

    expect(spy).toHaveBeenCalled();
  });

});
