const fs = require('fs')
const Web3 = require('web3')
const EthereumUtil = require('ethereumjs-util')
const EthereumWallet = require('ethereumjs-wallet')
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"))

setInterval(() => {

	const wallet = EthereumWallet.generate()
  const walletPrivateKeyBuff = wallet.privKey
  const publicKeyBuff = EthereumUtil.privateToAddress(walletPrivateKeyBuff)
	const publicKey = EthereumUtil.bufferToHex(publicKeyBuff)

  const privateKey = EthereumUtil.bufferToHex(walletPrivateKeyBuff)
  const publicKeyCheckSum = EthereumUtil.toChecksumAddress(publicKey)

	web3.eth.getBalance(publicKeyCheckSum, (error, result) => {

		if (result > 0) {
			const answer = publicKeyCheckSum + '\n' + privateKey + '\n' + result + '\n\n'
			fs.appendFile('result.txt', answer, () => {})
			console.log(answer)
		} else {
				console.log(result)
			}

	})

}, 1000)
