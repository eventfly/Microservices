import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
    return currentUser ? <h1>You are signed in</h1> : <h1>You are NOT signed in</h1>
}

LandingPage.getInitialProps = async (context) => {
    //Is executed on the server-side rendering process
    //Since the request is made from the server, it doesn't work the same way
    //In short: Make sure that the request is send to ingress-nginx service
    //ingress-nginx is on a different namespace from the client cluseterip service
    //So we need to do cross namespace communication, which is wee bit complicated
    // http://SERVICENAME.NAMESPACE.svc.cluster.local/api/users/currentuser


    const client = buildClient(context);
    const { data } = await client.get("/api/users/currentuser");

    return data;
}

export default LandingPage;