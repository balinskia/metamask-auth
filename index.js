var cookies = require('cookies-js');
var view = require('./view.js');
var auth = require('./auth.js');

const COOKIES_SIGN = 'cookie sign';


if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  alert('Please install metamask to log in');
  // set the provider you want from Web3.providers
  // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.getAccounts((err, accounts) => {
  if (err) return console.dir(err);
  if (!accounts || accounts.length < 1) return;
  var address = accounts[0];
  var _view = view.init({
    onLoginButtonClick: auth.login.bind(null, address, onSuccessLogin),
    onLogoutButtonClick
  });
  function onSuccessLogin(newSignature) {
    cookies.set(COOKIES_SIGN, newSignature);
    _view.setLoggedInView();
  }

  function onLogoutButtonClick() {
    cookies.expire(COOKIES_SIGN);
    _view.setNotLoggedInView();
  }

  function isLoggedIn() {
    var signature = cookies.get(COOKIES_SIGN);
    return auth.determineAuth(signature, address);
  }

  if (isLoggedIn(address)) {
    _view.setLoggedInView();
  } else {
    _view.setNotLoggedInView();
  }
})
