import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import readline from 'readline';

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Please enter the public key: ', async (input) => {
        const connection = new Connection(clusterApiUrl('devnet'))
        const address = new PublicKey(input)
        const balance = await connection.getBalance(address)
        const balanceInSol = balance / LAMPORTS_PER_SOL

        console.log(`The balance of the account at ${address} is ${balance} lamports`);
        console.log('balance in sol', balanceInSol)
        console.log(`✅ Finished!`)

        rl.close();
    });
}

main()