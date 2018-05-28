import settingsStore from '@/stores/settings';
import Themes from '@/util/themes';

const {
  mutations,
  getters,
} = settingsStore;

describe('Game settings', () => {
  const state = {
    theme: {},
  };

  it('should init state with empty theme', () => {
    const initialState = settingsStore.state();

    expect(initialState.theme).toEqual(Themes[0]);
  });

  it('should set a theme', () => {
    mutations.setTheme(state, { start: '#000000', stop: '#ffffff' });

    expect(state.theme.start).toEqual('#000000');
    expect(state.theme.stop).toEqual('#ffffff');
  });

  it('should return correct CSS for the theme', () => {
    state.theme = { start: '#000000', stop: '#ffffff' };
    const themeCSS = getters.themeCSS(state);

    expect(themeCSS.indexOf('#000000')).not.toEqual(-1);
    expect(themeCSS.indexOf('#ffffff')).not.toEqual(-1);
  });
});
