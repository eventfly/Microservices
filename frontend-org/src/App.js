import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useEffect, useState, useCallback} from 'react'

import Header from './components/Header';
import Footer from './components/Footer';
import EventList from './screens/EventList';
import PopularEvents from './screens/PopularEvents';

import EventProfile from './screens/EventProfile';
import EventFeed from './screens/EventFeed';
import EventStatistics from './screens/EventStatistics';
import EventStaff from './screens/EventStaff';
import AddStaff from './screens/AddStaff';

import CreateEvent from './screens/CreateEvent';
import Signup from './screens/signup';
import Login from './screens/login';

import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
import {authApi} from './api/axiosHook'

import Subscription from './screens/Subscription';

import { AuthContext } from './context/auth-context';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBuKGNvEATZlqOKIveVeSXJKqqVMRIItA",
  authDomain: "eventfly-e19b7.firebaseapp.com",
  projectId: "eventfly-e19b7",
  storageBucket: "eventfly-e19b7.appspot.com",
  messagingSenderId: "524282711642",
  appId: "1:524282711642:web:165c4d2deeffe11e155263"
};



function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState('');
  


  const login = useCallback((user, token) => {
    setCurrentUser(user);
    setToken(token);

  }, []);



  useEffect(()=>{
      async function fetchCurrentUser(){

        authApi.get('/org/currentuser').then((res)=>{
          console.log(res)
          console.log(res.data.currentUser)
          setCurrentUser(res.data.currentUser)
        })
        
      }

      fetchCurrentUser()
  },[])


  return (
    <AuthContext.Provider value= {{currentUser: currentUser, login:login, token:token}}>
    
    <Router>
      <Header />

      <div className='main_content'>

        <Routes>
          <Route path="/" element={<EventList />} />
          {/* <Route path="/" element={currentUser != null ? <EventList /> : <Navigate to='/login' />} /> */}
          <Route path="/popular" element={<PopularEvents />} />
          {/* <Route path="/detail" element={<EventDetail />} /> */}

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateEvent />} />
          {/* <Route path="/create" element={currentUser != null ? <CreateEvent /> : <Navigate to='/login' />} /> */}


          {/* <Route path="product">
                  <Route path=":id" element={<ProductScreen />}/>
                </Route> */}

          <Route path="/detail/profile" element={<EventProfile />}/>
          <Route path="/detail/discussion" element={<EventFeed />}/>
          <Route path="/detail/statistics" element={<EventStatistics />}/>
          <Route path="/detail/staff/add" element={<AddStaff />}/>
          <Route path="/detail/staff" element={<EventStaff />}/>

          <Route path="/sub" element={<Subscription />}/>


        </Routes>

      </div>

      <Footer />
    </Router>
    
    </AuthContext.Provider>
  );
}

export default App;

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
