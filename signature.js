require('dotenv').config()
const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
var async = require('async')
var await = require('await')
const web3 = new Web3('https://ropsten.infura.io/v3/7bc3250b95194b04b89d7ca9284d4e5a')

const account1 = "0xe3eadD86BB71dA3b05489029Dbc4574fc24F0C4f"
const account2 = "0xc84518768Ae3b1a0481C628f74618c3a198F0e26"

// Private Keys of respective accounts
const privateKey1 = Buffer.from(
    process.env.PRIV_KEY1,
    'hex')

const privateKey2 = Buffer.from(
    process.env.PRIV_KEY1,
    'hex')


    
web3.eth.getTransactionCount(account1,(err,txCount) =>{
    console.log("In the Block")
    console.log("Error",err)
   
const txObject = {
    nonce:web3.utils.toHex(txCount),
    to:account2,
    value:web3.utils.toHex(web3.utils.toWei('0.02','ether')),
    gasLimit:web3.utils.toHex(21000),
    gasPrice:web3.utils.toHex(web3.utils.toWei('10','gwei'))
}

console.log("Transaction Object",txObject)

const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' },)
console.log("tx obj",tx)
tx.sign(privateKey1)
const serializedTransaction = tx.serialize()

console.log("serialized Transaction",serializedTransaction)
const raw = '0x'+ serializedTransaction.toString('hex')
console.log("Raw Transaction",raw)
web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
    console.log("Error",err)
    console.log('txHash:',txHash)
})

// web3.eth.sendSignedTransaction(raw).then(txHash => {
//     console.log("Transaction Hash",txHash)
// }).catch(e =>{
//     console.log("Error",e)
// })

})

web3.eth.getBalance(account1,(err,result) =>{
    console.log("Error",err)
    console.log("Balance of ",account1, result)
    })
