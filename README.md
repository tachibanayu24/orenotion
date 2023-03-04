# [Orenotion](https://doc.tachibanayu24.com)

tachibanayu24の個人ドキュメント（兼ブログ）です。

Notionライクな書き心地で、インターネットでの公開を前提とした個人ドキュメントの管理ができるようになっています。  
自分用ドキュメントを作成してシェアしたり、ブログのように利用したりします。

# Features

機能の一覧などは、[紹介記事](TODO: 記事書いてリンク)を参照してください。

# RoadMap

* [in progress][orenition v0.1.0(beta)](https://github.com/users/tachibanayu24/projects/1)

* [orenotion v1.0.0](https://github.com/users/tachibanayu24/projects/2)

* [orenotion v2.0.0](https://github.com/users/tachibanayu24/projects/3)


# Clone

Cloneすることを想定していませんが、以下のような手順で、ご自身の環境に複製可能なはずです。

```sh
$ git clone git@github.com:tachibanayu24/orenotion.git

$ cd orenotion

$ cp .env.sample .env

# firebaseプロジェクトを作成し、各種環境変数を入力してください

$ yarn install

$ yarn dev
```

最低1ユーザーをFirebase AuthenticationのコンソールからID/PWで作成し、UIからログインすることで、ページの追加や編集ができるようになります。
