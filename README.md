# Contract Testing APIs with Prism & OpenAPI

元リポジトリ
https://github.com/11sigma/prism-contract-testing

OAS定義とprismを使ってサーバーのcontract testをする実験。


### Prerequisites

Run server (今の所、OAS仕様を使ったモックサーバー)

```
cd server
sh start_prism_4011_expected.sh
```

### Running tests

```bash
yarn # or `npm install`
yarn test
```

### 実行時の注意点
2020/8現在、axios 0.19.2 (Http Client) は、compress されたデータがサーバーから返されると
incorrect header check エラーを起こしてしまう。(https://github.com/axios/axios/issues/2406)

回避のため、axiosに以下のパッチを当てると、エラーが起きなくなる。
https://github.com/doplic/axios/commit/0e83cc5422a54ccca37b992e0d2741bb3c96e3ca


