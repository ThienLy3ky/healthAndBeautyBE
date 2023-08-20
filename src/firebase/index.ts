import admin from "firebase-admin";
import * as fs from "fs";
import * as uuid from "uuid";
import * as firebaseConfig from "../../config/hbshops-34e0a-firebase-adminsdk-210kc-b1ff2d11d3.json";
const firebase_params = {
  type: firebaseConfig.type,
  projectId: firebaseConfig.project_id,
  privateKeyId: firebaseConfig.private_key_id,
  privateKey: firebaseConfig.private_key,
  clientEmail: firebaseConfig.client_email,
  clientId: firebaseConfig.client_id,
  authUri: firebaseConfig.auth_uri,
  tokenUri: firebaseConfig.token_uri,
  authProviderX509CertUrl: firebaseConfig.auth_provider_x509_cert_url,
  clientC509CertUrl: firebaseConfig.client_x509_cert_url,
};
admin.initializeApp({
  credential: admin.credential.cert(firebase_params),
  storageBucket: "hbshops-34e0a.appspot.com",
});
const bucket = admin.storage().bucket();
export async function uploadFile(file) {
  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuid.v4(),
    },
    contentType: "image/png",
    cacheControl: "public, max-age=31536000",
  };
  try {
    const url = await bucket.upload(file, {
      gzip: true,
      metadata: metadata,
    });
    fs.unlinkSync(file);
    const getUrl = await bucket.file(url[0]?.id).getSignedUrl({
      action: "read",
      expires: "01-26-2500",
    });
    return getUrl;
  } catch (error) {
    console.log(error);
    return false;
  }
}
