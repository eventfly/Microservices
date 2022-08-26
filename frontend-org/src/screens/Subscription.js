import "../styles/Subscription.css";
import SubPackage from "../components/Subscription/SubPackage";
import { useState, useEffect } from 'react';
import {getOrgApi} from '../api/axiosHook'


const Subscription = () => {

    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState([]);


    useEffect(() => {

        if(loading == false){

            getOrgApi(localStorage.getItem('token')).get('/package').then((res)=>{
                console.log(res.data.packages)

                setPackages([...res.data.packages])

            }).catch((err)=>{
                console.log(err)
            })

            setLoading(true)
        }


    }, [loading, packages])


    return ( 
        <div className="sub-container">
            <div className="text-container">
                <h1>Packages</h1>
            </div>
            <div className="package-container">

                {
                    packages && packages.length > 0 ? 
                    packages.map((pkg, index)=>{
                        return(
                            <SubPackage
                                key={index} 
                                headerColor="salmon" 
                                isBuyOptionAvailable={true}
                                pkgData={pkg}
                            />
                        )
                    })  : (<></>)
                }

                {/* // <SubPackage headerColor="salmon" isBuyOptionAvailable={true}/>
                // <SubPackage headerColor="teal" isBuyOptionAvailable={true}/>
                // <SubPackage headerColor="navy" isBuyOptionAvailable={true}/> */}
            </div>
        </div>
     );
}
 
export default Subscription;