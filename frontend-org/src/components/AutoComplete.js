import React, { Fragment, useState,useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import {Form} from 'react-bootstrap'
import 'react-bootstrap-typeahead/css/Typeahead.css';


const AutoComplete = ({label, placeholder, options, multiSelections, setMultiSelections, isDisabled}) => {

    return ( 
        <>
        
            <Fragment>

                <Form.Group style={{ marginTop: '20px' }}>
                    <Form.Label className="label">{label}</Form.Label>
                    <Typeahead
                        id="basic-typeahead-multiple"
                        labelKey="name"
                        multiple
                        onChange={setMultiSelections}
                        options={options}
                        placeholder={placeholder}
                        selected={multiSelections}
                        disabled={isDisabled}
                    />

                </Form.Group>
            
            </Fragment>
        
        </>
    );
}
 
export default AutoComplete;