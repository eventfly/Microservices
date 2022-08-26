import React, { Fragment, useState, useCallback, useRef } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import {Form} from 'react-bootstrap'
import 'react-bootstrap-typeahead/css/Typeahead.css';


const AutoComplete = ({label, placeholder, options, setOptions, multiSelections, 
    setMultiSelections, isDisabled, isNewItemsAllowed, isMultiple}) => {

    const typeaheadRef = useRef(null);

    const onKeyDown = useCallback((e) => {

        if (e.key === 'Enter' && isNewItemsAllowed) {
            console.log(e.target.value)
            let temp = e.target.value
            typeaheadRef.current.clear()

            // let isValueExists = options.filter((opt)=>{
            //     console.log(opt, temp)
            //     return opt == temp
            // })

            // console.log(isValueExists)

            // if(isValueExists.length == 0){

            setOptions(options => [...options, temp])
            setMultiSelections(multiSelections => [...multiSelections, temp]);
            // }
        }

    
    },[]);

    return ( 
        <>
        
            <Fragment>

                <Form.Group style={{ marginTop: '20px' }}>
                    <Form.Label className="label">{label}</Form.Label>
                    <Typeahead
                        ref={typeaheadRef}
                        id="basic-typeahead-multiple"
                        labelKey="name"
                        multiple={isMultiple}
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