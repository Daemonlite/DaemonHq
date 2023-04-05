
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import  Topnav from './components/Topnav'
import Landinpage from './components/Landingpage';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Jobs from './pages/Jobs'
import Postjob from './pages/Postjob';
import Reviews from './pages/Reviews';
import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import Error from './components/Error';
import Register from './pages/Register'
import ProfilePage from './dashboards/ProfilePage';
import CreateCompany from './pages/CreateCompany';
import Technology from './categories/Technology';
import CompanyDetailsPage from "./components/CompanyDetail";
import Health from './categories/Health';
import Comments from './components/Comments';
import CreateListing from './pages/CreateListing';
import Bids from './components/Bids'
import Room from './components/ChatRoom';
import Investors  from './components/Investors';
import UpdateUserInfo from './components/UpdateUserInfo';
import ProfileChange from './pages/ProfileChange';

function App() {
  return (
    <div>
     <BrowserRouter>
     <ToastContainer position='bottom-left'/>
     <Topnav/>
     <Routes>
      <Route path='/home' element={<Landinpage/>}/>
      <Route path='/jobs' element={<Jobs/>}/>
      <Route path='/jobs/post' element={<Postjob/>} />
      <Route  path='/reviews' element={<Reviews/>}/>
      <Route path='/' element ={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/user/profile' element={<ProfilePage/>}/>
      <Route  path='/company/create' element={<CreateCompany/>}/>
      <Route path='/technology' element={<Technology/>} />
      <Route path="/company/:id"  element={<CompanyDetailsPage />}/>
      <Route  path='/listing/:id' element={<Comments/>}/>
      <Route path='/listings/:id' element={<Bids/>}/>
      <Route path='/health'  element={<Health/>}/>
      <Route path='listing/create' element={<CreateListing/>}/>
      <Route path='/room' element={<Room/>} />
      <Route path='/investors' element={<Investors/>}/>
      <Route path='/user/update'  element={<UpdateUserInfo/>}/>
      <Route path='/user/profile/change' element={<ProfileChange/>} />
      <Route path='*'  element={<Error/>}/>
     </Routes>
     </BrowserRouter>

    </div>
  );
}

export default App;
