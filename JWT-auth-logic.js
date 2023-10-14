import jwt from 'jsonwebtoken';

//トークン生成関数
export function generateJWT (user, secretKey) {
    jwt.sign(user, secretKey, (err, token) => {
        if(err){
            return {token: null, error: "トークン生成に失敗しました。"}
        }else{
            return {token: token, error: null};
        }
    });
}

//認可ミドルウェア
export function authorizeJWT (req, secretKey, next) {
    //ヘッダーからトークンを取得
    const token = req.header(Authorization);

    //トークンが存在しない場合は401 Unauthorizedを返す
    if(!token){
        return {token: null, error: "トークンが提供されていません。"};
    }

    //トークンを検証
    jwt.verify(token, secretKey, (err, decoded) => {
        if(err){
            return {decoded: null, error: "トークンの検証に失敗しました"};
        }

        req.user = decoded.user;
        next();
    });
}