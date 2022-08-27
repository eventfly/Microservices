
import { Table } from 'react-bootstrap';


const QuizResultIndividual = () => {
    let events=[]
    for(let i=0; i<3; i++){
        events.push(i)
    }
    return ( 
        <>


            <div className="table-container">

                <div style={{marginBottom: '40px'}} />

                <Table style ={{ 
                    textAlign: "center", 
                    marginBottom: '2rem',
                    borderRadius: '0.7rem',
                    padding: '2rem',
                    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                }} striped bordered hover>

                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Response</th>
                        <th>Result</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        (
                            events.map(event =>{
                                console.log(event);
                                return (
                                    <tr>
                                        <td>jwd</td>
                                        <td>dhaka</td>
                                        <td>incorrect</td>
                                    </tr>

                                    );
                            })
                        ) 
                    }
                    </tbody>
                
                </Table>
                
            </div>

        
        </>
        
     );
}
 
export default QuizResultIndividual;