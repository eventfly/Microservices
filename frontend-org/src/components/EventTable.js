import { Table } from 'react-bootstrap';

const EventTable = ({events}) => {
    return ( 
        <Table style ={{ textAlign: "center"}} striped bordered hover >
            <thead>
                <tr>
                <th>Name</th>
                <th>Event Date</th>
                <th>Rating</th>
                <th>Attendance</th>
                </tr>
            </thead>
            <tbody>
            {
                (
                    events.map(event =>{
                        console.log(event);
                        return (
                            <tr>
                                <td>{event.name}</td>
                                <td>{event.start_time}</td>
                                <td>{event.rating}</td>
                                <td>{event.attendance}</td>
                            </tr>
    
                            );
                    })
                ) 
            }
            </tbody>
        </Table>

    )
}
 
export default EventTable;