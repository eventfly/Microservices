import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import EventList from './screens/EventList';
import PopularEvents from './screens/PopularEvents';
import EventFeed from './components/EventFeed';
import EventStatistics from './components/EventStatistics';
// import EventStaff from './components/EventStaff';

import CreateEvent from './screens/CreateEvent';
import Signup from './screens/signup';
import Login from './screens/login';

import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
// import EventProfile from './components/EventProfile';


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
  return (
    <Router>
      <Header />
      <Sidebar />

      <Outlet />
      <main>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/popular" element={<PopularEvents />} />
          {/* <Route path="/detail" element={<EventDetail />} /> */}

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateEvent />} />


          {/* <Route path="product">
                  <Route path=":id" element={<ProductScreen />}/>
                </Route> */}

          {/* <Route path="/detail/profile" element={<EventProfile />}/> */}
          {/* <Route path="/detail/discussion" element={<EventFeed />}/> */}
          {/* <Route path="/detail/statistics" element={<EventStatistics />}/> */}
          {/* <Route path="/detail/staff" element={<EventStaff />}/> */}


        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
