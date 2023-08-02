interface iConfig {
  env?: string;
  port: number;
  database: string;
  appPrefix: string;
  swaggerPrefix: string;
  keys: {
    privateKey: string;
    publicKey: string;
    aes256Secret: string;
    consumerKey: string;
  };
  useEncrypt: boolean;
}
export default (): iConfig => ({
  env: process.env.NODE,
  port: parseInt(process.env.PORT, 10) || 3000,
  database:
    process.env.STRING_DB === ""
      ? `mongodb://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.HOST_DB}/${process.env.NAME_DB}?${process.env.METHOD_DB}`
      : process.env.STRING_DB,
  appPrefix: process.env.PREFIX,
  swaggerPrefix: process.env.SWAGGER_API,
  keys: {
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLICKEY,
    aes256Secret: process.env.SECRET,
    consumerKey: process.env.CONSUMER_KEY,
  },
  useEncrypt: process.env.ENCRYPT ? true : false,
});
