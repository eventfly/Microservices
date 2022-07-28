import {Link} from "react-router-dom";
import StaffOptions from "./StaffOptions";

const Role = ({roleType}) => {
    let members = []
    for(let i=0;i<7;i++)
        members.push(i)

    return ( 
        <>
            <div className="role-container-header">
                <h3>{roleType}</h3>

                <Link to="/detail/staff/add">
                    <button>+ Add Staff</button>
                </Link>
            </div>
            <div className="person-container">
            {
                (
                    members.map(member =>{
                        console.log(member);
                        return (
                                <div className="person-info">
                                    <StaffOptions />
                                    <div className="person-info-body">
                                        <img src="https://i.kym-cdn.com/photos/images/original/001/884/907/c86.jpg" alt="" />
                                        <div className="person-info-text">
                                            <h5 style={{marginTop:"1rem"}}>John Smith</h5>
                                            <Link to='#'><h6 style={{fontSize:"small"}}>Details</h6></Link>
                                        </div>
                                    </div>
                                </div>
    
                            );
                    })
                ) 
            }
            </div>
        </>
     );
}
 
export default Role;