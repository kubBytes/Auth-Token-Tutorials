import jwt from 'jsonwebtoken';

//jwt.sign, jwt.varifyは非同期処理

//トークン生成関数
export function generateJWT (user, secretKey) {
    return new Promise((resolve, reject) => {
        jwt.sign(user, secretKey, (err, token) => {
            if(err){
                reject({token: null, error: "トークン生成に失敗しました。"});
            }else{
                resolve({token: token, error: null});
            }
        });
    });
}

//トークンの検証
export function authorizeJWT (req, secretKey) {
    //ヘッダーからトークンを取得
    const token = req.header('Authorization');

    //トークンが存在しない場合は401 Unauthorizedを返す
    if(!token){
        return {token: null, error: "トークンが提供されていません。"};
    }

    //トークンを検証
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if(err){
                reject({decoded: null, error: "トークンの検証に失敗しました"});
            }else{
                resolve({decoded: decoded.username, error: null});
            }
        });
    });
}