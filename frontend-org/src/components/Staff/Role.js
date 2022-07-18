const Role = ({roleType}) => {
    let members = []
    for(let i=0;i<6;i++)
        members.push(i)
        
    return ( 
        <>
            <h3>{roleType}</h3>
            <div class="person-container">
            {
                (
                    members.map(member =>{
                        console.log(member);
                        return (
                                <div class="person-info">
                                <img src="https://i.kym-cdn.com/photos/images/original/001/884/907/c86.jpg" alt="" />
                                    <h5>John Smith</h5>
                                    <h6>Details</h6>
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