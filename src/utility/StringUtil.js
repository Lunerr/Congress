const Constants = require('./Constants.js');

class StringUtil {
  boldify(str) {
    return '**' + str.replace(Constants.regexes.markdown, '') + '**';
  }

  isNullOrWhiteSpace(input) {
    return typeof input !== 'string' || input.trim().length === 0;
  }

  upperFirstChar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  insertValues(array) {
    let str = '';

    for (let i = 0; i < array.length; i++) {
      str += '$' + (i + 1);

      if (i !== array.length - 1) {
        str += ', ';
      }
    }

    return str;
  }

  capitializeWords(str) {
    return str.replace('_', ' ').replace(Constants.regexes.capitalize, (x) => x.charAt(0).toUpperCase() + x.substr(1));
  }

  listItems(arr) {
    let description = '';

    for (let i = 0; i < arr.length; i++) {
      description += this.capitializeWords(arr[i].names[0]);

      if (i !== arr.length - 1) {
        description += ', ';
      }
    }

    return description;
  }
}

module.exports = new StringUtil();
