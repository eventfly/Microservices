import React, { Fragment, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import {Form} from 'react-bootstrap'
import 'react-bootstrap-typeahead/css/Typeahead.css';


const AutoComplete = ({options}) => {

    const [multiSelections, setMultiSelections] = useState([]);

    return ( 
        <>
        
            <Fragment>

                <Form.Group style={{ marginTop: '20px' }}>
                    <Form.Label>Event Tags</Form.Label>
                    <Typeahead
                        id="basic-typeahead-multiple"
                        labelKey="name"
                        multiple
                        onChange={setMultiSelections}
                        options={options}
                        placeholder="Choose several tags"
                        selected={multiSelections}

                    />

                </Form.Group>
            
            </Fragment>
        
        </>
    );
}
 
export default AutoComplete;