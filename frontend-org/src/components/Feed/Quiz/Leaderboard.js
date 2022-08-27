import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image'

const Leaderboard = ({setShowLeaderboard}) => {
    const questions = []
    for (let i = 0; i < 3; i++) {
        questions.push('summary')
    }

    return ( 
        <>
            <Table striped bordered hover style ={{ textAlign: "center",maxWidth:'80%'}}>
                <thead>
                    <tr>
                        <th>Participant</th>
                        <th>Score</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions.map((question, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div className="d-flex justify-content-start align-items-center">
                                        <Image 
                                            src="https://www.w3schools.com/w3images/avatar2.png"
                                            roundedCircle={true} 
                                            style={{width: '35px', height: '35px'}}
                                        />
                                        <h6 className='mx-3'>Marky mark</h6>
                                        </div>
                                    </td>
                                    <td>Thornton</td>
                                    <td>2</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

            <Button variant="primary" onClick={() => setShowLeaderboard(false)}> Back </Button>
        </>
     );
}
 
export default Leaderboard;