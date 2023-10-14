//技術的要素を取り出して試して学ぶファイルです。

const user = {
    id: 1,
    username: 'username',
    email: 'email'
}

/*
//Base64はバイナリデータをASCII文字セット内で表現するエンコーディング方式
const userJSON = JSON.stringify(user);
const userBuffer = Buffer.from(userJSON);
const userBase64 = userBuffer.toString('base64');
console.log('user : ', user);
console.log('userJSON : ', userJSON);
console.log('userBuffer : ', userBuffer);
console.log('base64 : ', userBase64);

validateAuthToken(`Bearer ` + userBase64);

//デコードしてみる
function validateAuthToken (authToken) {
    //シンプルなトークンをデコード
    const authTokenWithoutBearer = authToken.replace('Bearer ', '');
    const tokenBuffer = Buffer.from(authTokenWithoutBearer, 'base64');
    const tokenData = tokenBuffer.toString('utf-8');

    console.log('authToken : ', authToken);
    console.log('authTokenWithoutBearer : ', authTokenWithoutBearer);
    console.log('tokenBuffer : ', tokenBuffer);
    console.log('tokenData :', tokenData);
}
*/

//JWTによる認証を試す。
import jwt from 'jsonwebtoken';

const payload = user;
const secretKey = 'mySecretKey'; //署名に使われる秘密鍵
const options = {expiresIn: '1h'};

jwt.sign(payload, secretKey, options, (err, token) => {
    if(err){
        console.log('トークンの生成に失敗しました。', err);
    }else{
        console.log('生成されたトークン :', token);
    }
});

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VybmFtZSIsImVtYWlsIjoiZW1haWwiLCJpYXQiOjE2OTcyNzA0MDQsImV4cCI6MTY5NzI3NDAwNH0.fdjxbF1f28v4tVna0d8p1fzCczArMNWppQNZOB43lHk';

jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log('トークンの検証に失敗しました。');
    }

    console.log(decoded);
  });
  