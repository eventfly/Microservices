import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

import Form from 'react-bootstrap/Form';
import {BsTrash} from 'react-icons/bs';

const PollChoice = ({choiceList, setChoiceList}) => {

    const addNewchoice = () => {
        setChoiceList(choiceList => [...choiceList, {choice:''}]);
    }

    const updateChoiceChanged = (index, value) => {
        let newArr = [...choiceList]; // copying the old datas array
        choiceList[index].choice = value; // replace e.target.value with whatever you want to change it to
      
        setChoiceList(newArr);
      }


    const removeChoice = (index) => {
        console.log('removing choice ', index)
        let newArr = [...choiceList]; // copying the old datas array
        newArr.splice(index, 1); // remove the element at index
        setChoiceList(newArr);
        console.log(newArr)
    }

    return ( 
        <div>
            <p style={{
                    marginBottom: "10px",
                    fontSize: "20px",
                    fontWeight: 'bold',
            }}>Choices</p>
        {
            choiceList.map((item, index) => {
                return (
                    <Container style={{border:"none"}} key={index} id={`choice-row-${index}`}>
                        <Row className='my-4'>
                            <Col>
                                <Form>
                                    <Row>
                                        <Col xs={{ span: 10}}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter choice text"
                                            value={choiceList[index].choice}
                                            required
                                            onChange={e => updateChoiceChanged(index,e.target.value)}
                                        />
                                        </Col>
                                        
                                        <Col xs={{ span: 1}}>
                                            <Button id={`poll-option-remove-${index}`} variant="danger" onClick={()=>removeChoice(index)}>
                                                <BsTrash />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                );
            })
        }
            
            <Button variant="success" onClick={addNewchoice}>+ Add Options</Button>
        </div>
     );
}
 
export default PollChoice;