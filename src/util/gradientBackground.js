const gradientBackground = {
  methods: {
    gradientBackground(theme) {
      const {
        start,
        stop
      } = theme;

      return `background-image: linear-gradient(135deg, ${start} 10%, ${stop} 100%);`;
    }
  }
}

export default gradientBackground;
