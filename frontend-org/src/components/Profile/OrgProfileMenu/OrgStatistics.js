import FormTitle from "../../Form/FormTitle";
import StatCard from "./StatCard";

import EventHistory from "./EventHistory";

const OrgStatistics = () => {
    return ( 
        <>
            <FormTitle title="Statistics" />

            <div style={{marginBottom: '100px'}} />

            <div className="stat_info_flexbox">
                
                <StatCard header={'Total Registered Participants'} body={'10'} />
                <StatCard header={'Total Hosted Events'} body={'10'} />
                <StatCard header={'Total Earnings'} body={'10'} />
                
            </div>

            <EventHistory />
        </>
     );
}
 
export default OrgStatistics;