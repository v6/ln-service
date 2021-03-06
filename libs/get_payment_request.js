const _ = require('lodash');

/** Get balance

  {
    lnd_grpc_api: <Object>
    payment_request: <Serialized Payment Request String>
  }

  @returns via cbk
  {
    destination: <Public Key String>
    id: <Payment Request Hash string>
  }
*/
module.exports = (args, cbk) => {
  if (!args.lnd_grpc_api) { return cbk([500, 'Missing lnd grpc api', args]); }

  if (!args.payment_request) {
    return cbk([500, 'Missing payment request', args]);
  }

  return args.lnd_grpc_api.decodePayReq({
    pay_req: args.payment_request,
  },
  (err, res) => {
    if (!!err) { return cbk([500, 'Get payment request error', err]); }

    if (!res.destination) { return cbk([500, 'Expected destination', res]); }

    if (!res.payment_hash) { return cbk([500, 'Expected payment hash', res]); }

    if (res.num_satoshis === undefined) {
      return cbk([500, 'Expected num satoshis', res]);
    }

    return cbk(null, {
      amount: parseInt(res.num_satoshis),
      destination: res.destination,
      id: res.payment_hash,
    });
  });
};

