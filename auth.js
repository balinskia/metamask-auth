var ethUtil = require('ethereumjs-util')
var sigUtil = require('eth-sig-util')

const CHALLENGE_DESCRIPTION = "Authorization challenge"
const CHALLENGE_VALUE = "from getline"

const msgParams = [{
  type: 'string',
  name: CHALLENGE_DESCRIPTION,
  value: CHALLENGE_VALUE
}];

module.exports = {
  login(address, onSuccess, event) {
    // https://medium.com/metamask/scaling-web3-with-signtypeddata-91d6efc8b290
    event.preventDefault()
    var params = [msgParams, address]
    var method = 'eth_signTypedData'

    web3.currentProvider.sendAsync({
      method,
      params,
      address,
    }, function (err, result) {
      if (err) return console.dir(err)
      if (result.error) {
        alert(result.error.message)
      }
      if (result.error) return console.error(result)
      console.log('PERSONAL SIGNED:' + JSON.stringify(result.result))

      const recovered = sigUtil.recoverTypedSignature({ data: msgParams, sig: result.result })
      if (recovered === address) {
        console.log('Successfully ecRecovered signer as ' + address)
        onSuccess(result.result);
      } else {
        console.log('Failed to verify signer when comparing ' + result + ' to ' + address)
      }
    })
  },
  determineAuth(signature, address) {
    if (!signature || !address) return false;
    const recovered = sigUtil.recoverTypedSignature({ data: msgParams, sig: signature })
    return recovered === address;
  }
}