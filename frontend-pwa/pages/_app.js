import '../styles/globals.css';
import { ChakraProvider } from "@chakra-ui/react";
import Layout from '../layouts/Default';
import NoAuthLayout from '../layouts/NoAuth';
import { useEffect } from "react";

import { SessionProvider, useSession, signIn } from 'next-auth/react';


function Auth({ children }) {
	const { data: session, status } = useSession()
	const isUser = !!session?.user

	useEffect(() => {

	  if (status === "loading") return
	  if (!isUser){
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			}
		}
	  }
	
	}, [isUser, status])
  
	if (isUser) {
	  return children
	}
  
	// Session is being fetched, or no user.
	// If no user, useEffect() will redirect.
	return <div>Loading...</div>
  }



function MyApp({ Component, pageProps }) {

	// let isAuth = null

	// useEffect(() => {

	// 	isAuth = localStorage.getItem('username')
	
	// })

	return(
		

		<ChakraProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ChakraProvider>

	)
	// else{
	// 	return(
	// 		<NoAuthLayout>
	// 			<Component {...pageProps} />
	// 		</NoAuthLayout>
	// 	)
	// }


	// <ChakraProvider>
	// 	<Layout>
	// 		<Component {...pageProps} />
	// 	</Layout>
	// </ChakraProvider>
}

export default MyApp
