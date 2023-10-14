import express from 'express';
import { authorize } from './auth-logic.js';
import { generateAuthToken } from './auth-logic.js';
import { generateJWT } from './JWT-auth-logic.js';
import { authorizeJWT } from './JWT-auth-logic.js';
const app = express()
const port = 3000

/* -------------------- フルスクラッチのトークンベース認可 -------------------- */
app.post('/login', (req, res) => {
    //ユーザ情報
    const user = {
        id: 1,
        username: 'username',
        email: 'email'
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
const secretKey = 'userSecretKey';

// トークン生成のエンドポイント
app.post('/login-JWT', async (req, res) => {
    //ユーザ情報
    const user = {
        id: 1,
        username: 'username',
        email: 'email'
    };

    try {
        const result = await generateJWT(user, secretKey);
        if (result.error) {
            res.status(500).json(result);
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//プロテクトされたリソースにアクセスするエンドポイント
app.get('/protected-resource-JWT', async (req, res) => {

    try {
        const result = await authorizeJWT(req, secretKey);
        if(result.error){
            res.status(500).json(result.error);
        }else{
            res.status(200).json({decodedUsername: result.decoded, message: "プロテクトされたリソースにアクセスしました。"});
        }
    } catch (error) {
        res.status(500).json(error);
    }

});


app.listen(port, () => {
  console.log(`${port}番ポートでアプリを実行中です。`)
})