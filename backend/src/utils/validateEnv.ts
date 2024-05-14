import { cleanEnv, num, port, str, url } from 'envalid';

// NOTE: Make sure we got these in ENV
const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    SECRET_KEY: str(),
    API_BASE_URL: str(),
    CLIENT_KEY: str(),
    CLIENT_SECRET: str(),
    INTRIC_API_BASE_URL: str(),
    INTRIC_API_BASE_PATH: str(),
    // INTRIC_USERNAME: str(),
    // INTRIC_PASSWORD: str(),
    INTRIC_APIKEY_ANGE: str(),
    INTRIC_ASSISTANT_ANGE: str(),
    // INTRIC_SALT: str(),
    APPLICATION_MODE: str({ choices: ['INTERNAL', 'EXTERNAL'] }),
    RATE_LIMIT_WINDOW: num(),
    RATE_LIMIT_MAX: num(),
    SPIKE_LIMIT_WINDOW: num(),
    SPIKE_LIMIT_MAX: num(),
    PORT: port(),
    BASE_URL_PREFIX: str(),
    SAML_CALLBACK_URL: url(),
    SAML_LOGOUT_CALLBACK_URL: url(),
    SAML_SUCCESS_REDIRECT: url(),
    SAML_FAILURE_REDIRECT: url(),
    SAML_ENTRY_SSO: url(),
    SAML_ISSUER: str(),
    SAML_IDP_PUBLIC_CERT: str(),
    SAML_PRIVATE_KEY: str(),
    SAML_PUBLIC_KEY: str(),
  });
};

export default validateEnv;
