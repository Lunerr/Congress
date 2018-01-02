class NumberUtil {
  static realValue(input) {
    return input / 100;
  }

  static format(input) {
    return (input / 100).USD();
  }

  static secondsToMs(input) {
    return input * 1000;
  }

  static hoursToMs(input) {
    return input * 3600000;
  }

  static daysToMs(input) {
    return input * 86400000;
  }

  static msToTime(input) {
    return {
      milliseconds: parseInt(input % 1000 / 100),
      seconds: parseInt(input / 1000 % 60),
      minutes: parseInt(input / (1000 * 60) % 60),
      hours: parseInt(input / (1000 * 60 * 60) % 24),
      days: parseInt(input / (1000 * 60 * 60 * 24))
    };
  }

  static pad(num, size) {
    let s = num.toString();

    while (s.length < size) {
      s = '0' + s;
    }

    return s;
  }
}

module.exports = NumberUtil;
