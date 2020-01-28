import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './app';
import store from './store';

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('App'));


window.shbPodButtonActionReaction = function(_action) {
	console.log(_action);
	try {
		if (_action == "open_lab_rq") {
			showSHBLoader('Collecting data...');
   
			const {patientInfo} = store.getState().emr;
			
            createSimpleJSActionDataAndSendToApp('emr_patient_data', {
                'hl7': patientInfo.contentData.arr,
                'raw': patientInfo.contentData.encode(),
                'emrName': 'ShadowBox EMR',
                'emrLogoUrl': '',
                'patientID': patientInfo.patientId || patientInfo.id,
                'process_name': 'Submitting to Lab',
                'document': undefined
            });
            setTimeout(hideSHBLoader, 3000);
		}
	} catch (err) {
		Sentry.captureException(err);
	}
};
