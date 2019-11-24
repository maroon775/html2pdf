export default class ShadowboxDevUsers {
    static api = null;
    static apiHost = 'https://dev.users.shadowbox.solutions/api2/';
    static apiKey = '';
    
    constructor(apiKey, requestMiddleware) {
        this.apiKey = apiKey;
        this.api = requestMiddleware({
            baseURL: ShadowboxDevUsers.apiHost,
            responseType: 'json'
        });
    }
    
    postHtml2Pdf() {
        return this.api.get(`/bot${this.apiKey}/pdf-to-html`);
    }
}
