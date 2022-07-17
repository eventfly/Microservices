import { useState } from 'react';
import { Link } from 'react-router-dom'

const SlidingNav = (props) => {

const [lineColor, setLineColor ] = useState(['grey','grey','grey','blue']);
const [fontColor, setFontColor ] = useState(['grey','grey','grey','black']);

const handler = (x) => {
    console.log(x);
    if(x===0) {
        setLineColor(['blue','grey','grey','grey']);
        setFontColor(['black','grey','grey','grey']);
    }
    else if(x===1) {
        setLineColor(['grey','blue','grey','grey']);
        setFontColor(['grey','black','grey','grey']);
    }
    else if(x===2) {
        setLineColor(['grey','grey','blue','grey']);
        setFontColor(['grey','grey','black','grey']);
    }
    else if(x===3) {
        setLineColor(['grey','grey','grey','blue']);
        setFontColor(['grey','grey','grey','black']);
    }
}
    return ( 
        <div>   
            <ul className="event-list-nav">
                <li className="event-tab-item" onClick = {() => {handler(0); props.getData(0);}} style={{
                        borderBottom: `2px solid ${lineColor[0]}`,
                        color: `${fontColor[0]}`
                    }}> Ongoing</li>
                <li className="event-tab-item" onClick = {() => {handler(1); props.getData(1);}} style={{
                        borderBottom: `2px solid ${lineColor[1]}`,
                        color: `${fontColor[1]}`
                    }}> Past Events </li>
                <li className="event-tab-item" onClick = {() => {handler(2); props.getData(2);}} style={{
                        borderBottom: `2px solid ${lineColor[2]}`,
                        color: `${fontColor[2]}`
                    }}> Upcoming </li>
                <li className="event-tab-item" onClick = {() => {handler(3); props.getData(3);}} style={{
                        borderBottom: `2px solid ${lineColor[3]}`,
                        color: `${fontColor[3]}`
                    }}> All </li>
                <li>
                    <Link to={`/create`}>
                        <button  style={{
                            width: '90%',
                            color: 'white',
                            backgroundColor: '#e41727',
                            height: '40px',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            "&:hover": {
                                backgroundColor: "pink"
                            },
                        }}> + Add New Event</button>
                    </Link>
                </li>
            </ul>
            
        </div>
     );
}
 
export default SlidingNav;