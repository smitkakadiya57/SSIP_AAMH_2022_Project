const cryptoHash = require('./crypto-hash');
const hexToBinary = require('hex-to-binary');
const {GENESIS_DATA, MINE_RATE} = require ('./config');
class Block {
    constructor ({timestamp,prevHash,hash,data,nonce,difficulty}) {
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;  
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis(){
        return new this(GENESIS_DATA);
    }

    static mineBlock({prevBlock,data}){
        let hash,timestamp;
        const prevHash = prevBlock.hash;
        let nonce = 0;
        let { difficulty } = prevBlock;
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({originalBlock: prevBlock,timestamp})
            hash = cryptoHash(timestamp,prevHash,data,nonce,difficulty);
        } while (hexToBinary(hash).substring(0,difficulty) !== '0'.repeat(difficulty));

        return new Block ({
            timestamp,
            prevHash,
            data,
            difficulty,
            nonce, 
            hash,
        });
    }

    static adjustDifficulty({originalBlock,timestamp}) {
        const { difficulty } = originalBlock;
        if (difficulty<1) return 1;
        const difference = timestamp - originalBlock.timestamp;
        if (difference > MINE_RATE) return difficulty-1;
        return difficulty + 1;
    }
}


const Block1 = new Block({
    timestamp: '17/10/2022',
    prevHash: '0x001',
    hash: '0xMR1',
    data: 'hello world',
});

// const genesisBlock = Block.genesis();

// const result = Block.mineBlock ({prevBlock: Block1, data: 'BLOCK2'});

// console.log(result);

module.exports = Block;

