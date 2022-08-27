import { LeafPoll, Result } from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'
import '../Post/Post.css'
import {Container, Row, Col} from 'react-bootstrap';
import { Link,useParams } from 'react-router-dom';


// Persistent data array (typically fetched from the server)
const resData = [
  { id: 0, text: 'Incorrect', votes: 5 },
  { id: 1, text: 'Correct', votes: 30 },
]

const quizTopic = (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }}
  >
    <p>A quiz about Nothing</p>
    <p style={{fontSize: 'small',color: 'gray'}}>17/8/22</p>
  </div>
)

// Object keys may vary on the poll type (see the 'Theme options' table below)
const customTheme = {
  textColor: 'black',
  backgroundColor: 'rgb(255,255,255)',
  alignment: 'center'
}

// function vote(item: Result, results: Result[]) {
  
// }

const quizStyle = {
    width: '60%',
    margin: '2rem 0rem',
    borderRadius: '15px',
    backgroundColor: 'rgb(252, 252, 252)',
    padding: '2rem',
    boxShadow: '0px 5px 7px -7px rgba(0, 0, 0, 0.75)',
    border: '2px solid #e5e5e5'
    // height: auto;
}

const QuizResultPreview = () => {
  const { eventId } = useParams(); 

  return (
    <div className='quiz-result' style={quizStyle}>
        <LeafPoll
            type='multiple'
            question={quizTopic}
            results={resData}
            theme={customTheme}
            //   onVote={vote}
            isVoted={true}
        />
        <Container>
            <Row>
                <Col xs={{offset:9, span:3}}>
                  <Link to={`/event/${eventId}/discussion/quiz/676`}>
                    View Details
                  </Link>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default QuizResultPreview;