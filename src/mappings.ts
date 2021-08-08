import { ethereum } from '@graphprotocol/graph-ts'

// @ts-ignore
import { Block, Transaction } from '../generated/schema'

export function handleBlock(block: ethereum.Block): void {
  let entity = new Block(block.number.toString())
  entity.number = block.number
  entity.size = block.size

  entity.gasUsed = block.gasUsed
  entity.gasLimit = block.gasLimit
  entity.timestamp = block.timestamp

  entity.save()
}

export function handleTransaction(call: ethereum.Call): Transaction {
    const tx = new Transaction(call.transaction.hash.toHex());
    tx.blockNumber = call.block.number;
    tx.blockHash = call.block.hash;
    tx.timestamp = call.block.timestamp;

    tx.hash = call.transaction.hash;
    tx.index = call.transaction.index;
    tx.from = call.transaction.from;
    tx.to = call.transaction.to;
    tx.value = call.transaction.value;
    tx.gasUsed = call.transaction.gasUsed;
    tx.gasPrice = call.transaction.gasPrice;
    tx.input = call.transaction.input;

    return tx as Transaction;
}