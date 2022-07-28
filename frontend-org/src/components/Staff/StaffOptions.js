import Dropdown from 'react-bootstrap/Dropdown';

function BasicExample() {

    const handleEdit = () => {
        console.log("e")
    }

    const handleDelete = () => {
        console.log("d")
    }

  return (

    <Dropdown >
      <Dropdown.Toggle className="toggle-dropdown">
        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>

      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
        {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;