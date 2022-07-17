import { Form } from 'react-bootstrap';
const Searchbar = () => {
    return ( 
        <Form className="d-flex">
            <Form.Control
                type="search"
                placeholder="Search" 
                className="me-2 my-3 py-2 px-3"
                aria-label="Search"
            />
        </Form>
     );
}
 
export default Searchbar;