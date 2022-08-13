import FormTitle from "../../Form/FormTitle";
import StatCard from "./StatCard";

import PopularEvents from "../../../screens/PopularEvents";

const OrgStatistics = () => {
    return ( 
        <>
        <FormTitle title="Statistics" />

            <div className="profile_flexbox">

                
                    <StatCard header={'Total Registered Participants'} body={'10'} />
                    <StatCard header={'Total Hosted Events'} body={'10'} />
                    <StatCard header={'Total Earnings'} body={'10'} />
                    
                
            </div><PopularEvents />
        </>
     );
}
 
export default OrgStatistics;