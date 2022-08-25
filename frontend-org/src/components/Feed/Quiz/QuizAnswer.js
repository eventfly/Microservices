import Stack from 'react-bootstrap/Stack';
import FormInput from '../../Form/FormInput';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

import React, { useEffect, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import Form from 'react-bootstrap/Form';
import {BsTrash} from 'react-icons/bs';

const QuizAnswer = ({quizIndex,answerList, setAnswerList}) => {


    const radios = [
      { name: 'Incorrect', value: '1' },
      { name: 'Correct', value: '2' },
    ];


    const addNewAnswer = () => {
        let newAnswerList = [...answerList, {answer:'', radioValue:'1'}];
        setAnswerList(newAnswerList);
        // setAnswerList(answerList => [...answerList, {answer:'', radioValue:'1'}]);
    }

    const updateAnswerChanged = (index, value) => {
        let newArr = [...answerList]; // copying the old datas array
        answerList[index].answer = value; // replace e.target.value with whatever you want to change it to
      
        setAnswerList(newArr);
      }

      const updateCorrectnessChanged = (index, value) => {

          let correctList = answerList.filter((answer)=>{
            return answer.radioValue === '2'
          })

          if(correctList.length == 0 || value == '1'){

            let newArr = [...answerList]; // copying the old datas array
            answerList[index].radioValue = value; // replace e.target.value with whatever you want to change it to
            
            setAnswerList(newArr);
          }
        }

    const removeAnswer = (index) => {
        console.log('removing answer ', index)
        let newArr = [...answerList]; // copying the old datas array
        newArr.splice(index, 1); // remove the element at index
        setAnswerList(newArr);
        console.log(newArr)
    }

    return ( 
        <div>
            <p style={{
                    marginBottom: "10px",
                    fontSize: "20px",
                    fontWeight: 'bold',
            }}>Options</p>
        {
            answerList.map((item, index) => {
                return (
                    <Container style={{border:"none"}} key={index} id={`answer-row-${index}`}>
                        <Row className='my-4'>
                            <Col>
                                <Form>
                                    <Row>
                                        <Col xs={{ span: 7}}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter answer text"
                                            value={answerList[index].answer}
                                            required
                                            onChange={e => updateAnswerChanged(index,e.target.value)}
                                        />
                                        </Col>
                                        <Col xs={{ span: 4}} style={{alignText:'center'}}>
                                            <ButtonGroup>
                                                {radios.map((radio, idx) => (

                                                    <ToggleButton
                                                        key={idx}
                                                        id={`radio-${idx}-${index}-${quizIndex}`}
                                                        type="radio"
                                                        variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                                                        name="radio"
                                                        value={radio.value}
                                                        checked={answerList[index].radioValue === radio.value}
                                                        //checked={true}
                                                        onChange={() => updateCorrectnessChanged(index, radio.value)}
                                                    >
                                                        {radio.name}

                                                    </ToggleButton>
                                                ))}
                                            </ButtonGroup>
                                        </Col>
                                        <Col xs={{ span: 1}}>
                                            <Button id={`radio-remove-${index}`} variant="danger" onClick={()=>removeAnswer(index)}>
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
            
            <Button variant="success" onClick={addNewAnswer}>+ Add Option</Button>
        </div>
     );
}
 
export default QuizAnswer;