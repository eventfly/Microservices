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

  useEffect(()=>{
      async function fetchCurrentUser(){

        authApi.get('/org/currentuser').then((res)=>{
          console.log(res)
          console.log(res.data.currentUser)
          setCurrentUser(res.data.currentUser)
          // sessionStorage.setItem('auth', JSON.stringify(res.data.currentUser));
        })
        
      }

      fetchCurrentUser()
  },[])


  return (
    
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

          <Route path="/event/:eventId/profile" element={<EventProfile />}/>
          <Route path="/event/:eventId/discussion" element={<EventFeed />}/>
          <Route path="/event/:eventId/statistics" element={<EventStatistics />}/>
          <Route path="/event/:eventId/staff/add" element={<AddStaff />}/>
          <Route path="/event/:eventId/staff" element={<EventStaff />}/>

          <Route path="/sub" element={<Subscription />}/>


        </Routes>

      </div>

      <Footer />
    </Router>
    
  );
}

export default App;

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
