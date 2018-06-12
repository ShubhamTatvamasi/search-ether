const EthereumWallet = require('ethereumjs-wallet')
const EthereumUtil = require('ethereumjs-util')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"))
const fs = require('fs')

setInterval( () => {

  var wallet = EthereumWallet.generate()
  var walletPrivateKey = wallet.privKey

  var publicKeyBuff = EthereumUtil.privateToAddress(walletPrivateKey)
  var privateKey = EthereumUtil.bufferToHex(walletPrivateKey)
  var publicKey = EthereumUtil.bufferToHex(publicKeyBuff)
  var publicKeyCheckSum = EthereumUtil.toChecksumAddress(publicKey)

	web3.eth.getBalance(publicKeyCheckSum, (error, result) => {

		if (result > 0) {
			var answer = publicKeyCheckSum + '\n' + privateKey + '\n' + result + '\n\n'
			fs.appendFile('result.txt', answer, () => {})
			console.log(answer)
		} else {
				console.log(result)
			}

	})

}, 1000)
