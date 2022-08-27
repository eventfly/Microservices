import '../styles/EventStatistics.css'
import { Table } from 'react-bootstrap';
import StatCard from '../components/Profile/OrgProfileMenu/StatCard';


const EventStatistics = () => {
    let events=[]
    for(let i=0; i<10; i++){
        events.push(i)
    }
    return ( 
        <>

            <div className="info-flexbox">

                <StatCard header={'Participants checked in'} body={'543/4556'} />
                <StatCard header={'Ticket Price'} body={'450'} />
                <StatCard header={'Ticket Sale'} body={'BDT. 86000'} />

            </div>

            <div style={{marginBottom: '30px'}} />

            <div className="table-container">

                <h4 style ={{ textAlign: "center", fontWeight: 'bold'}}>Latest Sales Info</h4>
                <div style={{marginBottom: '40px'}} />

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


            {/* <div className="stats-container">
                <ul className="info-container">

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

            </div> */}
        
        </>
        
     );
}
 
export default EventStatistics;