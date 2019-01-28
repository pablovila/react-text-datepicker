module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactTextDatepicker',
      externals: {
        react: 'React'
      }
    }
  }
}
