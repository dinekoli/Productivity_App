import type { B2CConfiguration } from './b2cClient';

export const b2cConfig: B2CConfiguration = {
  auth: {
    clientId: 'af9b78bd-e122-479f-98cd-af0bca9a6d23',
    authorityBase: 'https://login.microsoftonline.com/a9c0bc09-8b46-4206-9351-2ba12fb4a5c0',
    policies: {
      signInSignUp: 'B2C_1_SignInUp',
      passwordReset: 'B2C_1_PasswordReset',
    },
    redirectUri:'msauth.com.agilent.productivitytest://auth'
  },
  // web only:
  //cache: { cacheLocation: 'localStorage' },
};
//msauth.$(PRODUCT_BUNDLE_IDENTIFIER)://auth
export const b2cScopes = [
  "Sites.Read.All",
  "User.ReadBasic.All",
  "Calendars.ReadWrite",
  "Bookings.Manage.All",
  "Place.ReadWrite.All"
];

