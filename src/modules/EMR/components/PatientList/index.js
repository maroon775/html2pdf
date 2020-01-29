import React, {useEffect, useState} from 'react';
import propTypes from 'prop-types';
import {
    Menu,
    Input,
    Label
} from 'semantic-ui-react';
import { NavLink} from 'react-router-dom';

export default function PatientList(props) {
    useEffect(() => {
        props.loadPatientsList();
    }, [props.loadPatientsList]);
    
//    const [setPatients, patients] = useState(props.items);

//    function searchItems(value) {
//        setPatients(props.items.filter(item => `${item.name} ${item.lastname}`.includes(value)));
//    }
    
    return (
        <Menu tabular vertical fluid size="small">
            {/*<Menu.Item>*/}
            {/*    <Input icon="search" onChange={(event, {value})=>searchItems(value)} placeholder="Search patient..." />*/}
            {/*</Menu.Item>*/}
            {props.items.map(item => {
                const url = `/emr/patient/${item.id}`;
                return <Menu.Item activeClassName="active" key={item.id} as={NavLink} to={url}>
                    {item.name} <span style={{color: '#7B7B7B'}}>{item.lastname}</span>
                    <Label color="violet">{item.id}</Label>
                </Menu.Item>;
            })}
        </Menu>
    );
}

PatientList.propTypes = {
    loadPatientsList: propTypes.func,
    items: propTypes.array,
    isLoading: propTypes.bool,
    isError: propTypes.bool,
    errorMessage: propTypes.string
};
