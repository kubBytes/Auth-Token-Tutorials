//技術的要素を取り出して試して学ぶファイルです。

//Base64はバイナリデータをASCII文字セット内で表現するエンコーディング方式
const user = {
    id: 1,
    username: 'username',
    email: 'email'
}
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
