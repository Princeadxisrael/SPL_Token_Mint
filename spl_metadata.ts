// import wallet from "./wba-wallet.json"
// import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
// import { 
//     createMetadataAccountV3, 
//     CreateMetadataAccountV3InstructionAccounts, 
//     CreateMetadataAccountV3InstructionArgs,
//     DataV2Args
// } from "@metaplex-foundation/mpl-token-metadata";
// import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";

// // Define our Mint address
// const mint = publicKey("<mint address>")

// // Create a UMI connection
// const umi = createUmi('https://api.devnet.solana.com');
// const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
// const signer = createSignerFromKeypair(umi, keypair);
// umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

// (async () => {
//     try {
//         // Start here
//         // let accounts: CreateMetadataAccountV3InstructionAccounts = {
//         //     ???
//         // }

//         // let data: DataV2Args = {
//         //     ???
//         // }

//         // let args: CreateMetadataAccountV3InstructionArgs = {
//         //     ???
//         // }

//         // let tx = createMetadataAccountV3(
//         //     umi,
//         //     {
//         //         ...accounts,
//         //         ...args
//         //     }
//         // )

//         // let result = await tx.sendAndConfirm(umi);
//         // console.log(bs58.encode(result.signature));
//     } catch(e) {
//         console.error(`Oops, something went wrong: ${e}`)
//     }
// })();

import wallet from "./wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey, createGenericFile } from "@metaplex-foundation/umi";
import bs58 from "bs58"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

import { readFile } from "fs/promises";
// Define our Mint address
const mint = publicKey("LmG7naHGu3xdKRMyc9rwHuJx3fEBkKBCBB2DMSL4Bzy")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com', "confirmed");
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(irysUploader());
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here

        // const image = await readFile("./images/genrug.png");

        // const umiImageFile = createGenericFile(image, "genrug.png", {
        //     tags: [{ name: "Content-Type", value: "image/png" }],
        //   });

        //   const imageUri = await umi.uploader.upload([umiImageFile]).catch((err) => {
        //     throw new Error(err);
        //   });

        //   console.log("Your image URI: ", imageUri[0]);
        
          const metadata = {
            name: "Seneca",
            symbol: "senca-spl_token",
            description: "Own senca and be deadpool",
            uri: " https://arweave.net/x1_ClA0f0RBSfuiCO3eniWloYMFgLBSd1mQkNqG0fwo",
            creators: [{
                address:"",
            }]
         };
         
        const umiJSOnFile = createGenericFile(JSON.stringify(metadata), "senca-metadata", {
            tags: [{ name: "Content-Type", value: "JSON" }],
          });

        const Uri = await umi.uploader.upload([umiJSOnFile]).catch((err) => {
            throw new Error(err);
          });
        console.log("Your image URI: ", Uri);


        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint: mint,
            mintAuthority: signer,
          };
          let data: DataV2Args = {
            name: "Senca coin",
            symbol: "SEC",
            uri: Uri[0],
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
          };
          let args: CreateMetadataAccountV3InstructionArgs = {
            data: data,
            isMutable: true,
            collectionDetails: null,
          };
          let tx = createMetadataAccountV3(umi, {
            ...accounts,
            ...args,
          });
          let result = await tx.sendAndConfirm(umi);
          console.log(bs58.encode(result.signature));
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
