import { clusterApiUrl, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";

async function main(sender: PublicKey, recipient: PublicKey, amount: number) {
    const transaction = new Transaction()

    const sendSOLInstructions = SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: recipient,
        lamports: LAMPORTS_PER_SOL * amount
    })

    const result = await transaction.add(sendSOLInstructions)
    console.log('result', result)
}


main(new PublicKey('8gMU99KdwYLFBidkioA6k4F1BriHBfu424Ns34GdvLBo'), new PublicKey('7aMCSCgsUcTQkCGBoYEubU2zoeTtfW9jGaLztKY1cj9K'), 0.1)