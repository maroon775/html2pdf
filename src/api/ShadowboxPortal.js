export default class ShadowboxPortal {
    static api = null;
//    static apiHost = 'https://portal.shadowbox.solutions/api/';
    static apiHost = 'http://localhost:3333';
    
    constructor(requestMiddleware) {
        this.api = requestMiddleware({
            baseURL: ShadowboxPortal.apiHost,
            responseType: 'json'
        });
    }
    
    /**
     * @return Promise
     * */
    getPatientsList() {
        return this.api.get('/hl7-get-list');
    }
    
    /**
     * @param id Number
     * @return Promise
     * */
    getPatientById(id) {
        return this.api.post('/hl7-get-by-id', {
            object: {
                id
            }
        });
    }
}
