import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import image from '../images/avatar.png'
import '../styles/PersonCard.css'
import PasswordModal from './Profile/PasswordModal';


const PersonCard = ({uploadImage, name, email, role, profilePic}) => {

    const clickInputButton = (e) => {
        document.getElementById("uploadDP").click();
    }

    return ( 

        <>
        
            <Card style={{ width: '80%' }}>
                <Card.Img variant="top" 
                    src={profilePic ? profilePic : image}
                    onClick={clickInputButton}
                    style={{
                        width: '100%',
                        height: '75%',
                        alignSelf: 'center',
                        cursor: 'pointer'
                    }}
                    id="profilePic"
                />

                <input type={"file"} onChange={uploadImage} id={"uploadDP"} hidden />

                
                <Card.Body style={{
                    marginTop: '30px'
                }}>
                    <Card.Title style={{
                        fontWeight: '550'
                    }}>
                        {name}
                    </Card.Title>
                    <Card.Text>
                    {email}
                    </Card.Text>
                </Card.Body>


                <Card.Body>
                    {/* <Card.Link href="#">Change Password</Card.Link> */}

                    <PasswordModal email={email} role={role}/>

                </Card.Body>

            </Card>
        
        </>

    );
}
 
export default PersonCard;