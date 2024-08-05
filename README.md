
# NFT Mint With Metaplex, Umi 

Within this project, we generated an NFT image and minted an NFT using the Metaplex NFT protocol standard


## Acknowledgements

 - [Turbin3](https://turbin3.com)
 - [WBA](https://https://solana.web3builders.dev/)
 - [Solana cookbook](https://solanacookbook.com)
 - [Metaplex](https://developers.metaplex.com/)
 


## Documentation

The files created in this projects include
```bash
spl_init.ts
spl_metadata.ts
spl_mint.ts
```


## Deployment
run:
generate a new typescript project by running

```bash
  yarn init -y
```

Install all required dependencies
```bash
yarn add @types/node typescript @solana/web3.js bs58 @metaplex-foundation/umi-bundle-defaults @metaplex-foundation/umi @metaplex-foundation/umi-uploader-irys
yarn add -D ts-node
touch spl_init.ts
touch spl_metadata.ts
touch spl_mint.ts
```
Also ensure to create a tsconfig file with the following:
```bash
yarn tsc --init --rootDir ./ --outDir ./dist --esModuleInterop --lib ES2019 --module commonjs --resolveJsonModule true --noImplicitAny true
```

Add the following scripts to package.json, make the neccesary adjustments depending on your project structure:
```bash
"spl_init": "ts-node ./nft_image.ts",
"spl_metadata": "ts-node ./nft_metadata.ts",
"spl_mint": "ts-node ./nft_mint.ts"

```

To initialize a spl token, execute:
```bash
    yarn spl_init
```
To generate an spl metadata, execute:
```bash
  yarn spl_metadata
```
To mint an spl_mint, execute:
```bash
  yarn spl_mint
```




## Authors

- [@princeadxisrael](https://www.github.com/princeadxisrael)

