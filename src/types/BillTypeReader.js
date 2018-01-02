const patron = require('patron.js');
const bills = require('../singletons/bills.js');

class BillTypeReader extends patron.TypeReader {
  constructor() {
    super({
      type: 'bill'
    });
  }

  async read(command, message, argument, args, input) {
    const parsed = parseInt(input);

    if (Number.isNaN(parsed)) {
      return patron.TypeReaderResult.fromError(command, 'You have provided an invalid bill number.');
    }

    const bill = bills.get(parsed);

    if (bill === undefined) {
      return patron.TypeReaderResult.fromError(command, 'This bill does not exist.');
    }

    return patron.TypeReaderResult.fromSuccess(bill);
  }
}

module.exports = new BillTypeReader();
