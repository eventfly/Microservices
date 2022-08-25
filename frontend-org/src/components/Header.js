import Nav from 'react-bootstrap/Nav';
import {LinkContainer} from 'react-router-bootstrap';
import { useEffect, useState } from "react";

const Header = ({loading, setLoading}) => {

    const [authData, setAuthData] = useState(null);

    useEffect(() =>{

        if(loading == false){
            setLoading(true)

            let auth = sessionStorage.getItem('auth')
            if (auth) {
                auth = JSON.parse(auth);
            }

            setAuthData(auth)
        }


    }, [authData, loading])


    return ( 
        <header>
            {(sessionStorage.getItem('auth') != null) ?
                <Nav className="justify-content-end px-3 py-2">
                    <LinkContainer to="/">
                        <Nav.Link><i className="fa-solid fa-bell"></i></Nav.Link>
                    </LinkContainer>
                    
                    
                    <LinkContainer to="/profile/account">
                        <Nav.Link>Profile</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/login" onClick={ () => {
                        localStorage.clear();
                        sessionStorage.clear();
                        setLoading(false)

                    }}>
                        <Nav.Link>Logout</Nav.Link>
                    </LinkContainer>

                </Nav>
                
                : (
                    <Nav className="justify-content-end px-3 py-2">
                        <LinkContainer to="/login" onClick={ () => {

                            setLoading(false)

                        }}>
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                        
                        <LinkContainer to="/signup" onClick={ () => {

                            setLoading(false)

                        }}>
                            <Nav.Link>Signup</Nav.Link>
                        </LinkContainer>

                    </Nav>
                )
        
        }

        </header>
  );
}
 
export default Header;