const Block = require ('./block');
const cryptoHash = require('./crypto-hash');
const sample = require("./demo");


class Blockchain {
    constructor () {   
        this.chain = [Block.genesis()];
        // this.chain=this.chain.concat(sample);
    }

    addBlock({data}) {
        const newBlock = Block.mineBlock({
            prevBlock:this.chain[this.chain.length - 1],
            data,
        });
        this.chain.push(newBlock);
        return this.chain.length-1;
    }

    replaceChain(chain) {
        if(chain.length <= this.chain.length) {
            console.error("This is not of proper length !!");
            return;
        }
        if(!Blockchain.isValidChain(chain)) {
            console.error("This Chain is not Valid !!");
            return;
        }

        this.chain = chain;
    }

    static isValidChain(chain){
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())) {
            return false;
        }
        for(let i = 1; i<chain.length; i++) {
            const {timestamp, prevHash, hash, nonce, difficulty, data} = chain[i];
            const lastDifficuty = chain[i-1].difficulty;
            const realLastHash = chain[i-1].hash;

            if(prevHash!==realLastHash) return false;

            const validatedHash = cryptoHash(timestamp, prevHash, hash, nonce, difficulty, data);
            if(hash !== validatedHash) return false;
            if(Math.abs(lastDifficuty-difficulty)>1) return false;
        }
        return true;
    }
}

// const blockchain = new Blockchain();
// blockchain.addBlock({data: 'Block1'});


module.exports = Blockchain;