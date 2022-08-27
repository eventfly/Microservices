import { Table } from 'react-bootstrap';

const EventTable = ({events}) => {
    return ( 
        <Table style ={{ textAlign: "center"}} striped bordered hover >
            <thead>
                <tr>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Rating</th>
                <th>Revenue</th>
                <th>Attendance</th>
                </tr>
            </thead>
            <tbody>
            {
                (
                    events.map((event, index) =>{
                        return (
                            <tr key={index}>
                                <td>{event.name}</td>
                                <td>{new Date(event.start_date).toString()}</td>
                                <td>{new Date(event.end_date).toString()}</td>
                                <td>{event.rating}</td>
                                <td>{event.revenue}</td>
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