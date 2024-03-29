import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { useEffect, useState, useCallback} from 'react'

import Header from './components/Header';
import Footer from './components/Footer';
import EventList from './screens/EventList';

import CreateEvent from './screens/CreateEvent';
import Signup from './screens/signup';
import Login from './screens/login';

import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
import {getAuthApi} from './api/axiosHook'

import Subscription from './screens/Subscription';
import EventPage from './screens/EventPage';
import Profile from './screens/Profile';
import PopupModal from './components/PopupModal';


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

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [headerLoading, setHeaderLoading] = useState(false);

  let auth = sessionStorage.getItem('auth')
  if (auth) {
      auth = JSON.parse(auth);
  }


  useEffect(()=>{
      async function fetchCurrentUser(){
        if(auth == null && (loading == false || currentUser == null)){

          getAuthApi(localStorage.getItem('token')).get('/org/currentuser').then((res)=>{
            console.log(res.data.currentUser)
            setCurrentUser(res.data.currentUser)
            setLoading(true)
            window.sessionStorage.setItem('auth', JSON.stringify(res.data.currentUser));
          }).catch((err)=>{
            console.log(err.response.data.errors)
            window.localStorage.clear()
          })

        }
      }

      fetchCurrentUser()

  },[currentUser, loading])


  return (
    
    <Router>
      <Header loading={headerLoading} setLoading={setHeaderLoading} />

      <div className='main_content'>

        <Routes>

          <Route path="/" element={<EventList />} />

          <Route path="/signup" element={<Signup setHeaderLoading={setHeaderLoading} />} />
          <Route path="/login" element={<Login setHeaderLoading={setHeaderLoading} />} />
          <Route path="/create" element={<CreateEvent />} />

          <Route path="/subscription" element={<Subscription />}/>
          <Route path="/event/:eventId/*" element={<EventPage />}/>
          <Route path="/profile/*" element={<Profile />}/>


        </Routes>

      </div>

      <Footer />
    </Router>
    
  );
}

export default App;

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
