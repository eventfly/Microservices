import { Button,Container,Row,Col } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Dropdown from 'react-bootstrap/Dropdown';


import {GoCommentDiscussion} from 'react-icons/go'
import {BiPoll} from 'react-icons/bi'
import {MdQuiz, MdFeed} from 'react-icons/md'


import QuizModal from './Quiz/QuizModal';
import PostModal from './Post/PostModal';
import PollModal from './Poll/PollModal';
import MdPostModal from './MarkdownPost/MdPostModal';

function FeedHeader({setAllPosts, setLoading}) {
    const headerStyle = {
        // backgroundColor: 'red'
    }

    const postTab = (
        <>
            <GoCommentDiscussion /> Posts
        </>
    )

    const pollTab = (
        <>
            <BiPoll /> Polls
        </>
    )

    const quizTab = (
        <>
            <MdQuiz /> Quizzes
        </>
    )

    const allTab = (
        <>
            <MdFeed /> All
        </>
    )

    return (
        <>
            <Container style={{marginBottom:'1.2rem'}}>
                <Row>
                    <Col xs={{offset:'10', span:'2'}}>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                + Create New
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                 {/* <div className="feed-dropdown-item"> <PostModal setAllPosts={setAllPosts} /> </div>   */}
                                 <div className="feed-dropdown-item"> <PollModal setAllPosts={setAllPosts} /> </div> 
                                 <div className="feed-dropdown-item"> <QuizModal setAllPosts={setAllPosts} /> </div> 
                                 <div className="feed-dropdown-item"> 
                                    <MdPostModal 
                                        setAllPosts={setAllPosts}
                                        setLoading={setLoading}    
                                    /> 
                                 </div>
                                
                            </Dropdown.Menu>
                        </Dropdown> 
                    </Col>
                </Row>
            </Container>

            {/* <Tabs
                style={headerStyle}
                defaultActiveKey="all"
                id="fill-tab-example"
                className="mb-3 event-feed-header"
                variant	='tabs'
                fill
            >
                <Tab eventKey="all" title={allTab}>
                    hmm4
                </Tab>
                <Tab eventKey="posts" title={postTab}>
                    hmm
                </Tab>
                <Tab eventKey="polls" title={pollTab}>
                    hmm2
                </Tab>
                <Tab eventKey="quizzes" title={quizTab}>
                    hmm3
                </Tab>
                <Button variant="primary" className="event-feed-header-button"> sdflj </Button>
            </Tabs> */}
            
        </>
  );
}

export default FeedHeader;