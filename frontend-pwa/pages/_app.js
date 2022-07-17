import '../styles/globals.css';
import { ChakraProvider } from "@chakra-ui/react";
import Layout from '../layouts/Default';
import NoAuthLayout from '../layouts/NoAuth';
import { useEffect } from "react";
import buildClient from '../api/build-client';

// import { SessionProvider, useSession, signIn } from 'next-auth/react';


// function Auth({ children }) {
// 	const { data: session, status } = useSession()
// 	const isUser = !!session?.user

// 	useEffect(() => {

// 		if (status === "loading") return
// 		if (!isUser) {
// 			return {
// 				redirect: {
// 					destination: '/login',
// 					permanent: false,
// 				}
// 			}
// 		}

// 	}, [isUser, status])

// 	if (isUser) {
// 		return children
// 	}

// 	// Session is being fetched, or no user.
// 	// If no user, useEffect() will redirect.
// 	return <div>Loading...</div>
// }



function MyApp({ Component, pageProps, currentUser }) {

	// let isAuth = null

	// useEffect(() => {

	// 	isAuth = localStorage.getItem('username')

	// })

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


	// <ChakraProvider>
	// 	<Layout>
	// 		<Component {...pageProps} />
	// 	</Layout>
	// </ChakraProvider>
}

MyApp.getInitialProps = async (appContext) => {
	const client = buildClient(appContext.ctx);
	const { data } = await client.get("/api/users/currentuser");

	let pageProps = {}

	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(appContext.ctx);
	}


	return { pageProps, ...data }
}

export default MyApp
