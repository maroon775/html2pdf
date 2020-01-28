import React, {useEffect} from 'react';
import propTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {
    Message,
    Form,
    Header
} from 'semantic-ui-react';
import JSONTree from 'react-json-tree';

const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483E',
    base03: '#75715E',
    base04: '#A59F85',
    base05: '#F8F8F2',
    base06: '#F5F4F1',
    base07: '#F9F8F5',
    base08: '#F92672',
    base09: '#FD971F',
    base0A: '#F4BF75',
    base0B: '#A6E22E',
    base0C: '#A1EFE4',
    base0D: '#66D9EF',
    base0E: '#AE81FF',
    base0F: '#C63'
};

export default function PatientInfo(props) {
    let {patientId} = useParams();
    
    useEffect(() => {
        if(patientId) {
            props.loadPatientInfo(patientId);
        }
    }, [patientId]);
    
    
    function renderJsonView(data) {
        return <JSONTree
            hideRoot={true}
            shouldExpandNode={(a, b, depth) => (depth < 2)}
            data={data}
            theme={theme}
            invertTheme={false}
            getItemString={(type, data, itemType, itemString) => <span>{(data[0] && data[0].length === 3 && data[0]+' |') || ''} {itemType} {itemString}</span>}
        />;
    }
    return <>
        <Header>{props.id ? <>#{patientId} / {props.name} {props.lastname}</> : 'PLEASE CHOOSE PATIENT'}</Header>
        {
            props.isError && <Message
                negative
                header="Oops!"
                content={props.errorMessage}
            />
        }
        <Form loading={props.isLoading}>
            {props.content
                ? renderJsonView(props.contentData)
                : ''}
        </Form>
    </>;
}

PatientInfo.propTypes = {
    id: propTypes.number,
    name: propTypes.string,
    lastname: propTypes.string,
    content: propTypes.string,
    contentData: propTypes.object,
    isLoading: propTypes.bool,
    isError: propTypes.bool,
    errorMessage: propTypes.string,
};
