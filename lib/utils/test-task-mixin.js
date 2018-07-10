'use strict';

function setTestemFile(options, file = 'testem-electron.js') {
  if (typeof options === 'object') {
    options.file = file;
  }

  return options;
}

module.exports = {
  init() {
    // Make sure to use our version of testem, rather than ember-cli's
    this.testem = this.testem || new (require('testem'))();
/*
    const original = {
      //configureLogging: this.testem.configureLogging,
      //restart: this.testem.restart,
      //setDefaultOptions: this.testem.setDefaultOptions,
      startCI: this.testem.startCI,
      //startDev: this.testem.startDev,
      //startServer: this.testem.startServer,
    };
    Object.keys(original).forEach(method => {
      this.testem[method] = function() {
        console.log(`Monkey-patched ${method} called with`, ...arguments);

        let options = arguments[0];
        if (options && options.file === undefined) {
          console.log(`DEBUG: rewriting .file property`);
          options.file = `testem-electron.js`;
        }

        return original[method].apply(this, arguments);
      };
    });
*/
    this._super(...arguments);
  },

  defaultOptions() {
    return setTestemFile(this._super(...arguments));
  },

  testemOptions() {
    return setTestemFile(this._super(...arguments)) || this.defaultOptions(...arguments);
  },
};
