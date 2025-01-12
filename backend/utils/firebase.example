import admin from "firebase-admin";
// import serviceAccount from './serviceAccount.json' with { type: 'json' };
  // const serviceAccountDynamic = await import('./serviceAccount.json', {
  //   assert: { type: 'json' }
  // });
// const serviceAccount = serviceAccountDynamic.default;
// const file = await fs.readFile(process.cwd() + '/backend/utils/serviceAccount.json', 'utf8');
// const serviceAccount = JSON.parse(file);
// console.log(serviceAccount)
// import fs from 'fs';
// const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
// const serviceAccount = loadJSON('./serviceAccount.json');
// I FUCKING UNABLE TO LOAD A JSON :-( on vercel

const serviceAccount = {
  type: "...",
  project_id: "...",
  private_key_id: "...",
  private_key: "...",
  client_email: "...",
  client_id: "...",
  auth_uri: "...",
  token_uri: "...",
  auth_provider_x509_cert_url: "...",
  client_x509_cert_url: "...",
  universe_domain: "..."
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;