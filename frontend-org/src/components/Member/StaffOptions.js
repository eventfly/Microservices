import Dropdown from 'react-bootstrap/Dropdown';

function StaffOptions({onEdit, onDelete}) {

  return (

    <Dropdown>
      <Dropdown.Toggle style={{backgroundColor: 'white'}}>
        <i className="fa fa-ellipsis-v toggle-style" aria-hidden="true"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
        {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
      </Dropdown.Menu>
      
    </Dropdown>
  );
}

export default StaffOptions;