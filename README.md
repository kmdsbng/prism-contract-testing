# Contract Testing APIs with Prism & OpenAPI

元リポジトリ
https://github.com/11sigma/prism-contract-testing

OAS定義とprismを使ってサーバーのcontract testをする実験。


### Prerequisites

Run server (今の所、OAS仕様を使ったモックサーバー)

```
cd server
sh start_prism_4011.sh
```

### Running tests

```bash
yarn # or `npm install`
yarn test
```
