export default class ShadowboxAuth{
    static api = null;
//    static apiHost = 'https://auth.shadowbox.solutions/api';
    static apiHost = 'http://localhost:3333/api';
    
    constructor(requestMiddleware) {
        this.api = requestMiddleware({
            baseURL: ShadowboxAuth.apiHost,
            responseType: 'json'
        });
    }
    
    /**
     * @param username String
     * @param password String
     * @return Promise
     * */
    postSecurityLogin(username, password) {
        return this.api.post(`/security/login`, {
            errorCode: 0,
            errorMessage: '',
            commandName: 'security_login',
            object: {
                username,
                password
            },
            hexData: ''
        });
    }
}
