import { PublicClientApplication as MSALPublicClientApplication } from '@azure/msal-browser';
import { MSALPromptType } from './types';
export class PublicClientApplication {
    config;
    _pca;
    constructor(config) {
        this.config = config;
        this._pca = new MSALPublicClientApplication(this.config);
    }
    async init() {
        return this;
    }
    async acquireToken(params) {
        const { promptType, ...paramsWithoutPromptType } = params;
        const { accessToken, account, expiresOn, idToken, idTokenClaims, scopes, tenantId } = await this._pca.acquireTokenPopup(promptType ? { ...paramsWithoutPromptType, prompt: promptTypeToString(promptType) } : paramsWithoutPromptType);
        const result = {
            accessToken,
            account: {
                identifier: account.homeAccountId,
                environment: account.environment,
                tenantId: account.tenantId,
                username: account.username,
                claims: idTokenClaims,
            },
            expiresOn: expiresOn?.getTime(),
            idToken,
            scopes,
            tenantId,
        };
        return result;
    }
    async acquireTokenSilent(params) {
        const { accessToken, account, expiresOn, idToken, idTokenClaims, scopes, tenantId } = await this._pca.acquireTokenSilent({
            ...params,
            account: {
                ...params.account,
                homeAccountId: params.account.identifier,
                environment: params.account.environment ?? '',
                localAccountId: '',
            },
        });
        const result = {
            accessToken,
            account: {
                identifier: account?.homeAccountId,
                environment: account?.environment,
                tenantId: account?.tenantId,
                username: account?.username,
                claims: idTokenClaims,
            },
            expiresOn: expiresOn?.getTime(),
            idToken,
            scopes,
            tenantId,
        };
        return result;
    }
    getAccounts() {
        const accounts = this._pca.getAllAccounts();
        return Promise.resolve(accounts.map((a) => {
            const { homeAccountId: identifier, environment, tenantId, username } = a;
            const account = { identifier, environment, tenantId, username };
            return account;
        }));
    }
    getAccount(accountIdentifier) {
        const account = this._pca.getAccountByHomeId(accountIdentifier);
        if (account == null) {
            return Promise.reject(Error('Account not found'));
        }
        else {
            const { homeAccountId: identifier, environment, tenantId, username } = account;
            const msalAccount = { identifier, environment, tenantId, username };
            return Promise.resolve(msalAccount);
        }
    }
    async removeAccount(account) {
        await this._pca.logoutRedirect({
            account: {
                ...account,
                homeAccountId: account.identifier,
                environment: account.environment ?? '',
                localAccountId: '',
            },
        });
        return true;
    }
    async signOut(params) {
        return await this.removeAccount(params.account);
    }
}
function promptTypeToString(promptType) {
    switch (promptType) {
        case MSALPromptType.SELECT_ACCOUNT:
            return 'select_account';
        case MSALPromptType.LOGIN:
            return 'login';
        case MSALPromptType.CONSENT:
            return 'consent';
        case MSALPromptType.WHEN_REQUIRED:
            return 'none';
    }
}
//# sourceMappingURL=publicClientApplication.js.map