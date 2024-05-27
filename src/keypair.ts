import { Keypair } from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const keypair = Keypair.generate();
const secret = getKeypairFromEnvironment('SECRET_KEY')

console.log('the public key is: ', keypair.publicKey.toBase58())
console.log('the secret key:', keypair.secretKey)