const {
  Connection,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  Keypair,
} = require('@solana/web3.js');
const fs = require('fs');
const colors = require('colors');
const bip39 = require('bip39');
const { derivePath } = require('ed25519-hd-key');
const base58 = require('bs58');
const DEVNET_URL = 'https://devnet.sonic.game/';
const connection = new Connection(DEVNET_URL, 'confirmed');

async function sendSol(fromKeypair, toPublicKey, amount) {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: toPublicKey,
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    fromKeypair,
  ]);
  console.log(colors.green('Transaksi di Konfirmasi:'), signature);
}


function generateRandomAddresses(count) {
  return Array.from({ length: count }, () =>
    Keypair.generate().publicKey.toString()
  );
}


function getKeypairFromPrivateKey(privateKeyBase58) {
  const privateKeyBytes = base58.decode(privateKeyBase58);
  const keypair = Keypair.fromSecretKey(privateKeyBytes);
  return keypair;
}

function displayHeader() {
  console.log(colors.magenta('--- Solana Transaction Script ---'));
}

(async () => {
  displayHeader();

  const method = '1';

  let seedPhrasesOrKeys;
  
  if (method === '1') {
    seedPhrasesOrKeys = JSON.parse(fs.readFileSync('privateKeys.json', 'utf-8'));
    if (!Array.isArray(seedPhrasesOrKeys) || seedPhrasesOrKeys.length === 0) {
      throw new Error(
        colors.red('privateKeys.json is not set correctly or is empty')
      );
    }
  } else {
    throw new Error(colors.red('Invalid input method selected'));
  }

  const addressCount = 130;

  if (isNaN(addressCount) || addressCount <= 0) {
    throw new Error(colors.red('Invalid number of addresses specified'));
  }

  const randomAddresses = generateRandomAddresses(addressCount);

  console.log(
    colors.blue(`Generated ${addressCount} random addresses:`),
    randomAddresses
  );

  const amountToSend = 0.001;

  for (const [index, seedOrKey] of seedPhrasesOrKeys.entries()) {
    let fromKeypair;
    if (method === '0') {
      fromKeypair = await getKeypairFromSeed(seedOrKey);
    } else {
      fromKeypair = getKeypairFromPrivateKey(seedOrKey);
    }
    console.log(
      colors.yellow(
        `Kirim SOL Ke Wallet ${
          index + 1
        }: ${fromKeypair.publicKey.toString()}`
      )
    );

    for (const address of randomAddresses) {
      const toPublicKey = new PublicKey(address);
      try {
        await sendSol(fromKeypair, toPublicKey, amountToSend);
        console.log(
          colors.green(`Sukses ${amountToSend} SOL to ${address}`)
        );
      } catch (error) {
        console.error(colors.red(`Failed to send SOL to ${address}:`), error);
      }
    }
  }
})();
