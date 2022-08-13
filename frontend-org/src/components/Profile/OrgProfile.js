import OrgSidebar from "./OrgSidebar";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useState} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import Account from "./OrgProfileMenu/Account";

import Package from "./OrgProfileMenu/Package";
import OrgMembers from "./OrgProfileMenu/OrgMembers";

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
            {
                selectedMenu === 'Account' ? <Account />
                : selectedMenu === 'Package' ? <Package />
                : selectedMenu === 'Members' ? <OrgMembers />
                : <>    </>
            }



        </div>      

    </>
 );
}
 
export default OrgProfile;