import Carousel from 'react-bootstrap/Carousel';
import {Row,Col,Container,Button} from 'react-bootstrap'
import { useState, useRef } from 'react';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import {RiDeleteBack2Fill} from 'react-icons/ri'
import {HiDocumentAdd} from 'react-icons/hi'
import Quiz from './Quiz';

import '../../../styles/Carousel.css'
import FormInput from '../../Form/FormInput';

function CarouselFadeExample({quizset, setQuizset, quizTopic, setQuizTopic}) {

  const iconStyle = {
    fontSize: 'xx-large',
    cursor: 'pointer'
  }

  const ref = useRef(null);

  const onPrevClick = () => {
    ref.current.prev();
  }

  const onNextClick = () => {
    ref.current.next();
  }


  const handleAddQuestion = () => {
    let newQuizset = [...quizset, {question:'', answerList:[{answer:'',radioValue:'1'}]}]
    setQuizset(newQuizset)
    setTimeout(() => {
      ref.current.next();
    }, 100);
  }

  const handleDeleteQuestion = (index) => {
    console.log(index)
    let newArr = [...quizset]; // copying the old datas array
    newArr.splice(index, 1); // remove the element at index
    setQuizset(newArr);
    ref.current.prev();
    alert('deleted')
  }


    return (
      <>
        <div className="quiz-carousel-frontback">
          <AiOutlineArrowLeft style={iconStyle} onClick={onPrevClick} />
          <AiOutlineArrowRight style={iconStyle} onClick={onNextClick} />
        </div>
      
        <div className="container-fluid">
          <Carousel variant='dark'
            ref={ref}
            interval={null}
            indicators={false}
            wrap={false}
          >
            <Carousel.Item id={`quiz-question-topic-name`}>
              <div className='quiz-carousel-body-component'>
                <FormInput 
                  label="Quiz Topic"
                  type="text"
                  placeholder="What is the quiz about?"
                  value={quizTopic}
                  onChange={setQuizTopic}

                />
              </div>
            </Carousel.Item>
            
            {
              quizset.map((q, index) => {
                  //
                  return (
                      <Carousel.Item id={`quiz-question-${index}`} key={index}>
                        <div className='quiz-carousel-body-component'>
                          <Container style={{border:'none'}}>
                            <Row>
                              <Col xs={{span:10}}>
                                <Quiz index={index} quizset={quizset} setQuizset={setQuizset} />
                              </Col>

                              <Col xs={{offset:1, span:1}} className='quiz-carousel-addremove'>
                                  {
                                    index===quizset.length-1? (
                                      <HiDocumentAdd style={iconStyle} onClick={handleAddQuestion} />
                                    )
                                    :(<></>)
                                  }

                                  {
                                    quizset.length===1? (<></>)
                                    :(
                                      <RiDeleteBack2Fill style={iconStyle} onClick={()=>handleDeleteQuestion(index)} />
                                    )
                                  }
                              </Col>
                            </Row>
                            
                          </Container>

                        </div>
                      </Carousel.Item>
                  )
              })
            }
    
          </Carousel>
        </div>
      </>
    );
}

export default CarouselFadeExample;