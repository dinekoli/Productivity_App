import type { MSALConfiguration, MSALInteractiveParams, MSALSilentParams, MSALAccount, MSALSignoutParams, IPublicClientApplication } from './types';
export declare class PublicClientApplication implements IPublicClientApplication {
    private readonly config;
    private isInitialized;
    constructor(config: MSALConfiguration);
    init(): Promise<this>;
    acquireToken(params: MSALInteractiveParams): Promise<import("./types").MSALResult | undefined>;
    acquireTokenSilent(params: MSALSilentParams): Promise<import("./types").MSALResult | undefined>;
    getAccounts(): Promise<MSALAccount[]>;
    getAccount(accountIdentifier: string): Promise<MSALAccount | undefined>;
    removeAccount(account: MSALAccount): Promise<boolean>;
    signOut(params: MSALSignoutParams): Promise<boolean>;
    private validateIsInitialized;
}
