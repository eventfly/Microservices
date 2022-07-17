import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import EventList from './screens/EventList';
import PopularEvents from './screens/PopularEvents';
import EventFeed from './components/EventFeed';
import EventStatistics from './components/EventStatistics';
import EventMembers from './components/EventMembers';

import CreateEvent from './screens/CreateEvent';

import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";


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

                <Route path="/create" element={<CreateEvent />} />


                {/* <Route path="product">
                  <Route path=":id" element={<ProductScreen />}/>
                </Route> */}

                <Route path="/detail/discussion" element={<EventFeed />}/>
                <Route path="/detail/statistics" element={<EventStatistics />}/>
                <Route path="/detail/members" element={<EventMembers />}/>


             </Routes>
          </main>
        <Footer />
    </Router>
  );
}

export default App;

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
