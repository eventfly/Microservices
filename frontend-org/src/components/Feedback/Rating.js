import {BsStar, BsStarFill} from 'react-icons/bs';

const Rating = ({rating}) => {
    let stars = [];

    for(let i=0; i<rating; i++){
        stars.push(1)
    }
    for(let i=0; i<5-rating; i++){
        stars.push(0)
    }
    return ( 
        <div className='mb-3'>
            {
                stars.map((star, index) =>{
                    return (
                        star === 1 ? <BsStarFill key={index} style={{color:'#ffc107'}}/> : <BsStar key={index} style={{color:'#ffc107'}}/>
                    )
                })
            }
        </div>
     );
}
 
export default Rating;