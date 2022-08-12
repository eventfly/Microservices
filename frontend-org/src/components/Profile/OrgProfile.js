import OrgSidebar from "./OrgSidebar";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useState} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import Account from "./OrgProfileMenu/Account";

import Package from "./OrgProfileMenu/Package";

function OrgProfile() {
  const [canvasShow, setCanvasShow] = useState(false);

  const [selectedMenu, setSelectedMenu] = useState('Account');

  const handleClose = () => setCanvasShow(false);
  const handleShow = () => setCanvasShow(true);
    return ( 
    <>
    {/* <Button variant="primary" onClick={handleShow}>
        Launch
      </Button> */}
        <GiHamburgerMenu onClick={handleShow} style={{fontSize:'xx-large', color:'#8C3522', cursor:'pointer'}}/>

        <Offcanvas show={canvasShow} onHide={handleClose}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Organizer Profile</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
            <OrgSidebar setCanvasShow={setCanvasShow} setSelectedMenu={setSelectedMenu}/>
        </Offcanvas.Body>
        </Offcanvas>


        <div className="profile">

            {/* <div className="profile_flexbox">
            <div className="left-column">
            <OrgSidebar />
            </div>
            <div className="right-column">
            
                aap jaisa koi
                </div>
            </div> */}
            {
                selectedMenu === 'Account' ? <Account />
                : selectedMenu === 'Package' ? <Package />
                : <>    </>
            }



        </div>      

    </>
 );
}
 
export default OrgProfile;