const _ = require('lodash');
const asyncAuto = require('async/auto');

const getInvoices = require('./get_invoices');
const getPayments = require('./get_payments');

/** Get history

  {
    lnd_grpc_api: <Object>
  }

  @returns via cbk
  [{
    amount: <Satoshi Number>
    confirmed: <Bool>
    created_at: <ISO8601 Date String>
    [destination]: <Compressed Public Key String>
    [fee]: <Satoshis Number>
    [hops]: <Route Hops Number>
    [id]: <String>
    [memo]: <String>
    outgoing: <Bool>
    [payment]: <Payment Request String>
  }]
*/
module.exports = (args, cbk) => {
  if (!args.lnd_grpc_api) { return cbk([500, 'Missing lnd grpc api', args]); }

  return asyncAuto({
    getInvoices: (cbk) => {
      return getInvoices({lnd_grpc_api: args.lnd_grpc_api}, cbk);
    },

    getPayments: (cbk) => {
      return getPayments({lnd_grpc_api: args.lnd_grpc_api}, cbk);
    },

    history: ['getInvoices', 'getPayments', (res, cbk) => {
      const allTransactions = res.getInvoices.concat(res.getPayments);

      return cbk(null, _(allTransactions).sortBy(['created_at']).reverse());
    }],
  },
  (err, res) => {
    if (!!err) { return cbk(err); }

    return cbk(null, res.history);
  });
};

