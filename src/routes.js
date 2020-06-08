const express = require('express');

const routes = express.Router();

const Braintree = require('./controllers/BraintreeController');



routes.get('/', (req, res) => {
  console.log('Server online');
  return res.json({ message: 'Server online' });
});
routes.get('/test', (req, res) => {
  return res.json({ teste: 'Ok...' });
});

routes.get('/get-client-token', Braintree.getClientToken);
routes.post("/get-client-token", Braintree.getClientTokenWithCustomer);

routes.post("/create-customer", Braintree.createCustomer);
routes.post("/create-customer-no-nonce", Braintree.createCustomerNoNonce);
routes.post("/create-payment", Braintree.createPayment);
routes.post("/create-vault-transaction", Braintree.createVaultTransaction);
// routes.post("/create-customer", function(req, res){
// return res.json({teste:'Ok...'});
// });

routes.post("/checkout", function (req, res) {
  var nonceFromTheClient = req.body.payment_method_nonce;
  // Use payment method nonce here
});

// routes.post('/devs', DevController.store);
// routes.post('/devs/:devId/likes', LikeController.store);
// routes.post('/devs/:devId/dislikes', DislikeController.store);





module.exports = routes;
