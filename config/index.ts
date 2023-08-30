interface iConfig {
  env?: string;
  port: number;
  database: string;
  appPrefix: string;
  swaggerPrefix: string;
  keys: {
    privateKey: string;
    publicKey: string;
    jwt_secret: string;
    consumerKey: string;
    refresh_secrest: string;
  };
  useEncrypt: boolean;
}
export default (): iConfig => ({
  env: process.env.NODE,
  port: parseInt(process.env.PORT, 10) || 3000,
  database:
    process.env.STRING_DB === ""
      ? `mongodb://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.HOST_DB}:${process.env.PORT_DB}/${process.env.NAME_DB}?${process.env.METHOD_DB}`
      : process.env.STRING_DB,
  appPrefix: process.env.PREFIX,
  swaggerPrefix: process.env.SWAGGER_API,
  keys: {
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLICKEY,
    jwt_secret: process.env.JWT_SECRET,
    refresh_secrest: process.env.JWT_REFRESH_SECRET,
    consumerKey: process.env.CONSUMER_KEY,
  },
  useEncrypt: process.env.ENCRYPT ? true : false,
});
