export default {
  shuffle(array) {
    return array.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  },
  generateID() {
    return `${Math.random().toString(36).substr(2, 9)}`;
  },
  playerNamesToString(players) {
    let names = '';
    players.forEach(({ name }, index) => {
      let prefix = ', ';

      if (index === players.length - 1) {
        prefix = ' & ';
      }
      if (index === 0) {
        prefix = '';
      }

      names += `${prefix}${name}`;
    });
    return names;
  },
};
