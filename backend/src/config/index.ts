import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const SWAGGER_ENABLED = process.env.SWAGGER_ENABLED === 'true';
export const SESSION_MEMORY = process.env.SESSION_MEMORY === 'true';

export const {
  NODE_ENV,
  PORT,
  API_BASE_URL,
  INTRIC_API_BASE_URL,
  INTRIC_API_BASE_PATH,
  // INTRIC_USERNAME,
  // INTRIC_PASSWORD,
  INTRIC_APIKEY_ANGE,
  INTRIC_ASSISTANT_ANGE,
  // INTRIC_SALT,
  APPLICATION_MODE,
  RATE_LIMIT_WINDOW,
  RATE_LIMIT_MAX,
  SPIKE_LIMIT_WINDOW,
  SPIKE_LIMIT_MAX,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  SECRET_KEY,
  CLIENT_KEY,
  CLIENT_SECRET,
  BASE_URL_PREFIX,
  SAML_CALLBACK_URL,
  SAML_LOGOUT_CALLBACK_URL,
  SAML_SUCCESS_REDIRECT,
  SAML_FAILURE_REDIRECT,
  SAML_LOGOUT_REDIRECT,
  SAML_ENTRY_SSO,
  SAML_ISSUER,
  SAML_IDP_PUBLIC_CERT,
  SAML_PRIVATE_KEY,
  SAML_PUBLIC_KEY,
} = process.env;