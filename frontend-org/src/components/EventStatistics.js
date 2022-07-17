import EventSidebar from "./EventSidebar";
import '../styles/EventStatistics.css'
import { Table } from 'react-bootstrap';


const EventStatistics = () => {
    let events=[]
    for(let i=0; i<10; i++){
        events.push(i)
    }
    return ( 
        <>
        <EventSidebar/>
        <div className="stats-container">
            <ul className="info-container">
                <li>
                    <div>
                        <h4>
                            Participants checked in
                        </h4>
                        <h4>
                            543/4556
                        </h4>
                    </div>
                </li>
                <li>
                    <div>
                        <h4>
                            Ticket Price
                        </h4>
                        <h4>
                            450
                        </h4>
                    </div>
                </li>
                <li>
                    <div>
                        <h4>
                            Ticket Sale
                        </h4>
                        <h4>
                            BDT. 86000
                        </h4>
                    </div>
                </li>
                <li>
                    <div>
                        <h4>
                            Net Balance
                        </h4>
                        <h4>
                            BDT. 82000
                        </h4>
                    </div>
                </li>
            </ul>

            <div className="table-container">
                <h2>Latest Sales Info</h2>
                <Table style ={{ textAlign: "center"}} striped bordered hover >
                <thead>
                    <tr>
                    <th>Full Name</th>
                    <th>Purchase Date</th>
                    <th>Transaction ID</th>
                    <th>E-mail</th>
                    </tr>
                </thead>
                <tbody>
                {
                    (
                        events.map(event =>{
                            console.log(event);
                            return (
                                <tr>
                                    <td>Lorem ipsum dolor sit amet.</td>
                                    <td>17 July, 2022</td>
                                    <td>Lordolorsitametconsectetuelit.</td>
                                    <td>Loremipsum@gmail.com</td>
                                </tr>
        
                                );
                        })
                    ) 
                }
                </tbody>
            </Table>
            </div>

        </div>
        </>
        
     );
}
 
export default EventStatistics;