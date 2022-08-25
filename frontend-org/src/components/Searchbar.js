import { Form } from 'react-bootstrap';
import FormInput from './Form/FormInput';
import { useState, useEffect } from 'react'

const Searchbar = ({searchText, setSearchText}) => {

    return ( 
        // <Form className="d-flex">
        //     <Form.Control
        //         type="search"
        //         placeholder="Search" 
        //         className="me-2 my-3 py-2 px-3"
        //         aria-label="Search"
        //     />
        // </Form>
        <FormInput
            id="search"
            inputType="text"
            placeholder="Search"
            bgColor="#f5f5f5"
            isDisabled={false}
            value={searchText}
            displayType={false}
            onChange={setSearchText}
        />
     );
}
 
export default Searchbar;