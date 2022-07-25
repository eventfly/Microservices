import '../styles/globals.css';
import { ChakraProvider } from "@chakra-ui/react";
import Layout from '../layouts/Default';
import NoAuthLayout from '../layouts/NoAuth';
import { useEffect } from "react";
import buildClient from '../api/build-client';

import axios from 'axios';


function MyApp({ Component, pageProps, currentUser }) {

	console.log(currentUser)

	if (currentUser !== null) {
		return (


			<ChakraProvider>
				<Layout currentUser={currentUser}>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>

		)
	}
	else {
		return (
			<NoAuthLayout>
				<Component {...pageProps} />
			</NoAuthLayout>
		)
	}

}

MyApp.getInitialProps = async (appContext) => {
	const client = buildClient(appContext.ctx);
	const { data } = await client.get("/api/auth/users/currentuser");

	// const {data} = await axios.get('http://auth:3000/api/auth/users/currentuser');

	let pageProps = {}

	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(appContext.ctx);
	}


	return { pageProps, ...data }
}

export default MyApp
