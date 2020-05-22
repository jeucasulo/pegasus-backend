const axios = require('axios');
const braintree = require("braintree");

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "vn22qp9k6sgcys5s",
  publicKey: "stk8rk4qp8sf855c",
  privateKey: "d079e4485744c649b62ff46fad3e0701"
  // accessToken:"access_token$sandbox$dw77h479hh298f2m$743f08154343522bcd2ffec590f9f8b1"
});


module.exports = {

  async getClientToken(req, res) {
    // https://developers.braintreepayments.com/start/hello-server/node
    // https://sandbox.braintreegateway.com/merchants/vn22qp9k6sgcys5s/users/n4kdgwyp7fdp8bjd/api_keys/krbtpzd7d9xhr8t5
    const clientTokenFunction = await gateway.clientToken.generate({
      // customerId: aCustomerId
    }, function (err, response) {
      const clientToken = response.clientToken;
      return res.json({ clientToken: clientToken });
    });
  },
  async createPayment(req, res) {
    /*
    To create a transaction, you must include an amount and either a paymentMethodNonce, a paymentMethodToken, or a customerId.
    Passing a customerId is equivalent to passing the paymentMethodToken
    of the customer's default payment method.
    */
    //https://developers.braintreepayments.com/reference/request/transaction/sale/node#credit_card.token

    var saleRequest = {
      amount: req.body.amount,
      paymentMethodNonce: req.body.nonce,
      // deviceData: req.body.device_data,
      // orderId: "Mapped to PayPal Invoice Number",
      orderId: Date.now(),
      options: {
        submitForSettlement: true,
        paypal: {
          customField: "PayPal custom field",
          description: "Description for PayPal email receipt",
        },
      }
    };

    gateway.transaction.sale(saleRequest, function (err, result) {
      if (err) {
        // res.send("<h1>Error:  " + err + "</h1>");
        res.json({ 'Error': err });
      } else if (result.success) {
        // res.send("<h1>Success! Transaction ID: " + result.transaction.id + "</h1>");
        res.json({ 'Success': result });
      } else {
        // res.send("<h1>Error:  " + result.message + "</h1>");
        res.json({ 'Error': result.message });
      }
    });
  },
  async createCustomer(req, res) {
    let nonceFromTheClient = req.body.payment_method_nonce;

    //https://developers.braintreepayments.com/reference/request/customer/create/node
    gateway.customer.create({
      firstName: "Charity",
      lastName: "Smith",
      paymentMethodNonce: nonceFromTheClient
    }, function (err, result) {
      // result.success;
      // true
      if (result.success) {
        return res.json(result);
      } else {
        return res.json({ "error": "error" });
      }

      // result.customer.id;
      // e.g 160923

      // result.customer.paymentMethods[0].token;
      // e.g f28wm
    });
  },

}
