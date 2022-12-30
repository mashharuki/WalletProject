# 機能設計書

## 機能一覧表

| 機能名                 | 説明                                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| Bloctoログイン 機能    | コントラクトウォレットを作成する機能                                 |
| IDQトークン発行機能     | IDQトークンを発行する機能 |
| IDQトークン送信機能 | IDQトークンを送金する機能                                                                      |
|DID登録機能|新規ログイン時にDIDを発行し、スマコンに登録する機能|
|DID関連データの登録機能|DIDと紐づく情報をスマコンに登録する機能|
|DID関連情報表示機能|DIDと紐づく情報を表示する機能|
|共通資金プール作成機能|共通資金プールであるマルチシグコントラクトを作成する機能|
|共通資金プール送金機能|マルチシグコントラクトから目的のアドレスへ送金する機能|
|共通資金プール送金機能|共通資金プール送金のために承認する機能|
|deposit機能|IDQトークンを使ってマルチシグコントラクトにネイティブトークンをdepositする機能|

## 画面一覧

|画面名|概要|
|----|----|
|ログイン画面|blocto SDKの機能を使ってIDQにログインする画面|
|Home画面|DIDと保有しているIDQトークン・DIDと紐づく情報を表示する画面|
|送金画面|指定したDIDに対して送金する画面|
|MultiSigWallet画面|Walletを管理する画面。deposit機能が使える|
|create Transaction画面|トランザクションデータを作成する画面|
|Transation管理画面|MultiSigWalletが管理するトランザクションデータを操作する画面|

## 変数一覧

|コントラクト名| 変数名           | タイプ                          | 内容                                                                       |
| ---------------- | ---------------- | ------------------------------- | -------------------------------------------------------------------------- |
|  MyToken | tokenName  | string                  |  トークンの名前                                                  |
| MyToken  | tokenSymbol     | string                          | トークンのシンボル                                                              |
|  | bloodYype        | String                          | 血液型                                                                     |
|  | lastUpdate       | String                          | 最終更新日時(yyyy/mm/dd HH:mm:ss 形式)                                     |
|  | MedicalInsDatas  | Struct                          | 最終更新日時、最終更新医療機関                                             |
|  | medicalMap       | (address ⇨ medicalData)         | 患者のアドレスと医療データを紐付ける Map                                   |
|  | doctorMap        | (address → String)              | 医者のアドレスと名前を紐づける Map                                         |
|  | doctorRoleMap    | (address → bool)                | アドレスが医者であることを紐づける Map                                     |
|  | doctorBalanceMap | (address → uint256)             | 医者のアドレスと受け取る治療費を紐づける Map                               |
|  | doctors          | [address]                       | 医療機関に所属する医者のアドレスを格納する                                 |
|  | approveMap       | (address ⇨ (address ⇨ boolean)) | 患者のデータに対して医者側が閲覧権限を所有しているか保持するための Map     |
|  | requireMap       | (address ⇨ (address ⇨ boolean)) | 患者のデータに対して医者側が閲覧権限を要求している状態を保持するための Map |

## メソッド一覧

|コントラクト名| メソッド名        | 内容                                     |
| ----------------- | ----------------- | ---------------------------------------- |
|  MyToken | pause           | トークンを停止するための関数|
| MyToken  | unpause          | 停止状態を解除するための関数 |
|  MyToken | mint           | トークンを発行する関数|
|  MyToken | burnToken          |トークンを償却する関数  |
|  MyToken |  _beforeTokenTransfer           |トークン移転用の関数 |
|  MyToken | _afterTokenTransfer          |トークン移転用の関数  |
|  MyToken | _mint          |発行用の関数 |
|  MyToken |  _burn         | 償却用の関数 |
|   |            | |
|   |           |  |
|   |            | |
|   |           |  |
|   |            | |
|   |           |  |
|   |            | |
|   |           |  |


## API一覧

|API名|概要|
|----|----|
|/api/mintIDQ|IDQTokenを発行するAPI|
|/api/burnIDQ|IDQTokenを償却するAPI|
|/api/balance/IDQ|IDQTokenの残高を取得するAPI|
|/api/send|IDQTokenを送金するAPI|
|/api/create|DIDを作成するAPI|
|/api/resolve|DIDドキュメントを検索するAPI|
|/api/excute/factory|FactoryWalletのメソッドを実行するためのAPI|
|||