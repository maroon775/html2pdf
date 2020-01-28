import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './app';
import store from './store';

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('App'));

window.shbPodInit = ()=>{};
window.shbPodButtonActionReaction = function(_action) {
	console.log(_action);
	try {
		if (_action == "open_lab_rq") {
			showSHBLoader('Collecting data...');
   
			const {patientInfo} = store.getState().emr;
			const hl7Data = new HL7(patientInfo.contentData.hl7);
			
			createSimpleJSActionDataAndSendToApp("emr_patient_data", {
                'hl7': hl7Data.arr,
                'raw': hl7Data.encode(),
                'emrName': 'Shadowbox EMR',
                'emrLogoUrl': '',
                'patientID': String(patientInfo.patientId || patientInfo.id),
                'process_name': 'Submitting to Lab',
                'document': undefined,
                'tempData': {}
            });
            setTimeout(hideSHBLoader, 3000);
            console.log({hl7Data, patientInfo});
        }
	} catch (err) {
		Sentry.captureException(err);
        console.error(err);
    }
};
