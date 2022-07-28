import "../styles/Subscription.css";
import SubPackage from "../components/Subscription/SubPackage";

const Subscription = () => {
    return ( 
        <div className="sub-container">
            <div className="text-container">
                <h2>Packages</h2>
                <p style={{marginTop: "1.4rem"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius orci non eros convallis auctor. Nam aliquam tortor a justo mattis, in efficitur justo vestibulum. Ut tem</p>
            </div>
            <div className="package-container">
                <SubPackage headerColor="salmon"/>
                <SubPackage headerColor="teal"/>
                <SubPackage headerColor="navy"/>
            </div>
        </div>
     );
}
 
export default Subscription;