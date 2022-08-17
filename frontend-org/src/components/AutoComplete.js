import React, { Fragment, useState, useCallback } from "react";
import { Typeahead,AsyncTypeahead } from "react-bootstrap-typeahead";
import {Form} from 'react-bootstrap'
import 'react-bootstrap-typeahead/css/Typeahead.css';


const AutoComplete = ({label, placeholder, options, setOptions, multiSelections, setMultiSelections, isDisabled}) => {

    const onKeyDown = useCallback((e) => {

        if (e.key === 'Enter') {
            console.log(e.target.value)
            setOptions(options => [...options, e.target.value])
        }

        if (e.key === 'Tab') {
            console.log(e.target.value)
            setMultiSelections(multiSelections => [...multiSelections, e.target.value]);
        }
    
    },[]);

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
                        onKeyDown={onKeyDown}
                    />



                </Form.Group>
            
            </Fragment>
        
        </>
    );
}
 
export default AutoComplete;