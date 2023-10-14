import express from 'express';
import { authorize } from './auth-logic.js';
import { generateAuthToken } from './auth-logic.js';
const app = express()
const port = 3000

/* -------------------- フルスクラッチのトークンベース認可 -------------------- */
app.get('/login', (req, res) => {
    //ユーザ情報
    const user = {
        id: 1,
        username: 'test_user_at_auth-token-tutorials',
        email: 'test_email_at_auth-token-tutorials@email.com'
    };

    //シンプルなトークンを生成
    const authToken = generateAuthToken(user);

    res.json({ authToken });
});

//プロテクトされたリソースにアクセスするエンドポイント
app.get('/protected-resource', authorize, (req, res) => {
    res.json({ message: "プロテクトされたリソースにアクセスしました" });
});


/* -------------------- JWTを使ったトークンベース認可 -------------------- */
//秘密鍵
secretKey = 'userSecretKey';


app.listen(port, () => {
  console.log(`${port}番ポートでアプリを実行中です。`)
})