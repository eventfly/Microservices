import { Form } from 'react-bootstrap';
import FormInput from './Form/FormInput';
import { useState, useEffect } from 'react'

const Searchbar = ({searchText, setSearchText}) => {

    return ( 

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