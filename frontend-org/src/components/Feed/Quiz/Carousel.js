import Carousel from 'react-bootstrap/Carousel';
import {Row,Stack,Container,Button} from 'react-bootstrap'
import { useRef } from 'react';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import '../../../styles/Carousel.css'

function CarouselFadeExample({bodyComponent}) {

    const radios = [
        { name: 'Incorrect', value: '1' },
        { name: 'Correct', value: '2' },
        { name: 'Incorrect', value: '1' },
        { name: 'Correct', value: '2' },
        { name: 'Incorrect', value: '1' },
        { name: 'Correct', value: '2' },
        { name: 'Incorrect', value: '1' },
        { name: 'Correct', value: '2' },
      ];
  
    //   const ref = useRef(null);

      const onPrevClick = () => {
        console.log('prevving new')
        // ref.current.prev();
      };
      const onNextClick = () => {
        console.log('nexting')
        // ref.current.next();
      };

    const handleclick = () => {
        
    }


      const directionButtons = (direction) => {
        return (
          <span onClick={handleclick}
            aria-hidden="true"
            className={direction === "Next" ? "button-next" : "button-prev"}
          >
            {direction}
          </span>
        );
      };
    
      return (
        <>
        
        <div className="container-fluid">

          <Carousel
          interval={null}
        //   ref={ref}
          prevIcon={<AiOutlineArrowLeft  onClick={onPrevClick} className="left-slider"/>}
          nextIcon={<AiOutlineArrowRight onClick={onNextClick} className="right-slider"/>}
          indicators={false}
          >
            {/* {
                radios.map((radio, index) => {
                    return (
                        <Carousel.Item interval={1000}>
                                <div style={{
                                                    height:'300px',
                                                    width:'300px',
                                                    backgroundColor:'red',

                                                }}
                                                >
                                                {index}

                                                </div>
                            </Carousel.Item>
                       
                        
                        
                    )
                })
            } */}
            {
            radios.map((radio, index) => {
                return (
                    <Carousel.Item id={`quiz-question-${index}`} key={index}>
                    <div className='carousel-body-component'>
            {bodyComponent}
            </div>
            </Carousel.Item>
                )
            }
            )}
    
    </Carousel>
    </div>
    </>
      );
}

export default CarouselFadeExample;