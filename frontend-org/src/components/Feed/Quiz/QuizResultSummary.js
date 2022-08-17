import { LeafPoll, Result } from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'
import '../Post/Post.css'
import {Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BorderBottom } from '@material-ui/icons';

// Persistent data array (typically fetched from the server)
const resData = [
  { id: 0, text: 'option 1', votes: 50 },
  { id: 1, text: 'option 2', votes: 30 },
]

const quizTopic = (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }}
  >
    <p>What was the question?</p>
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
    border: '2px solid #e5e5e5',
    // height: auto;
}

const QuizResultSummary = () => {
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
        </div>
  )
}

export default QuizResultSummary;