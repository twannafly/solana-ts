import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers"
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js"
import readline from 'readline'
import dotenv from 'dotenv';
dotenv.config();


async function transfer(suppliedToPubkey: string) {

  if (!suppliedToPubkey) {
    console.log('please enter supplied address: ')
    return
  }

  const senderKeypair = getKeypairFromEnvironment("SECRET_KEY")

  const toPubkey = new PublicKey(suppliedToPubkey)

  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

  await airdropIfRequired(connection, senderKeypair.publicKey, 1 * LAMPORTS_PER_SOL, 0.5 * LAMPORTS_PER_SOL)

  console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
  );

  const transaction = new Transaction()
  const LAMPORTS_TO_SEND = 5000

  const sendSOLInstructions = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND
  })

  transaction.add(sendSOLInstructions)
  console.log('transaction', transaction)
  const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair])
  console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
  );
  console.log(`Transaction signature is ${signature}!`);
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter Supplied address: ', async (input) => {
    await transfer(input)
    rl.close()
  })
}

main()