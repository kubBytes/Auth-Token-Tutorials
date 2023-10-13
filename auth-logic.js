//JSONパーサーを利用する
append.use(bodyParser.json());

//シークレットトークン
export const secretToken = 'your-secret-token';

//トークン生成関数
export function generateAuthToken (user) {
    const userJSON = JSON.stringify(user);
    const userBase64 = Buffer.from(userJSON).toString('base64');

    return `Bearer ${userBase64}`;
}

//認可ミドルウェア
export function authorize (req, res, next) {
    //ヘッダーからトークンを取得
    const authToken = req.header('Authorization');

    //トークンが存在しない場合、401 Unauthorizedを返す
    if (!authToken) {
        return res.status(401).json({error : "トークンが提供されていません"});
    }

    //トークンを検証
    const user = validateAuthToken(authToken);
    if (!user) {
        return res.status(403).json({error : "トークンの検証に失敗しました"});
    }

    //ユーザ情報をリクエストに追加
    req.user = user;
    next();
}

//トークン検証関数
export function validateAuthToken (authToken) {
    //シンプルなトークンをデコード
    const authTokenWithoutBearer = authToken.replace('Bearer ', '');
    const tokenData = Buffer.from(authTokenWithoutBearer, 'base64').ttoString('utf-8');

    try {
        return JSON.parse(tokenData);
    } catch (error) {
        return null;
    }

}