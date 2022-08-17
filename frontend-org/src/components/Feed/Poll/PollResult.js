import { LeafPoll, Result } from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'
import '../Post/Post.css'

// Persistent data array (typically fetched from the server)
const resData = [
  { id: 0, text: 'Khoj: The Search', votes: 5 },
  { id: 1, text: 'Din: The Day', votes: 30 },
  { id: 2, text: 'Nishwartha Bhalobasa', votes: 12 }
]

// const  = 'Your favorite film?Your favorite film?Your favorite film?'

const question = (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }}
  >
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla ve</p>
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

const pollStyle = {
    width: '60%',
    margin: '2rem 0rem',
    borderRadius: '15px',
    backgroundColor: 'rgb(252, 252, 252)',
    padding: '2rem',
    boxShadow: '0px 5px 7px -7px rgba(0, 0, 0, 0.75)',
    border: '2px solid #e5e5e5'
    // height: auto;
}

const PollResult = () => {
  return (
    <div className='poll-result' style={pollStyle}>
        <LeafPoll
        type='multiple'
        question={question}
        results={resData}
        theme={customTheme}
        //   onVote={vote}
        isVoted={true}
        />
    </div>
  )
}

export default PollResult;