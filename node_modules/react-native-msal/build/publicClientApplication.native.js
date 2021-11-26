import { Platform } from 'react-native';
import RNMSAL from './nativeModule';
export class PublicClientApplication {
    config;
    isInitialized = false;
    constructor(config) {
        this.config = config;
    }
    async init() {
        if (!this.isInitialized) {
            await RNMSAL.createPublicClientApplication(this.config);
            this.isInitialized = true;
        }
        return this;
    }
    async acquireToken(params) {
        this.validateIsInitialized();
        return await RNMSAL.acquireToken(params);
    }
    async acquireTokenSilent(params) {
        this.validateIsInitialized();
        return await RNMSAL.acquireTokenSilent(params);
    }
    async getAccounts() {
        this.validateIsInitialized();
        return await RNMSAL.getAccounts();
    }
    async getAccount(accountIdentifier) {
        this.validateIsInitialized();
        return await RNMSAL.getAccount(accountIdentifier);
    }
    async removeAccount(account) {
        this.validateIsInitialized();
        return await RNMSAL.removeAccount(account);
    }
    async signOut(params) {
        this.validateIsInitialized();
        return await Platform.select({
            ios: async () => await RNMSAL.signout(params),
            default: async () => await RNMSAL.removeAccount(params.account),
        })();
    }
    validateIsInitialized() {
        if (!this.isInitialized) {
            throw new Error('PublicClientApplication is not initialized. You must call the `init` method before any other method.');
        }
    }
}
//# sourceMappingURL=publicClientApplication.native.js.map