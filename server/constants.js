/**
 * The global constants
 */
const MEGABYTE = 1024 * 1024;
export const MAX_UPLOAD_FILE_SIZE_MB = 25;
export const MAX_UPLOAD_FILE_SIZE_BYTE = MAX_UPLOAD_FILE_SIZE_MB * MEGABYTE;

export const BCRYPT_SALT_ROUNDS = 12;
export const USER_JWT_DEFAULT_EXPIRE_DURATION = '10d';
export const MORGAN_FORMAT = ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';
export const USER_MIN_PASSWORD_LENGTH = 8;
export const DEFAULT_LANGUAGE = 'en';

export const USER_STATUS = {
  ACTIVE: 1,
  INACTIVE: 2,
  PENDING: 3,
};

export const IS_SUBSCRIBE = {
  true: 1,
  false: 2,
};

export const CONTACT_STATUS = {
  PENDING: 1,
  PROCESSED: 2,
}
