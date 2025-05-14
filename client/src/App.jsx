import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import './App.css'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import UpdatePassword from './pages/UpdatePassword'
import AllStoresPage from './pages/AllStoresPage'
import RateStorePage from './pages/RateStorePage'
import UserRatingPage from './pages/UserRatingPage'
import UserHomePage from './pages/UserHomePage'
import StoreOwnerDashboard from './pages/StoreOwnerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import AddUserPage from './pages/AddUserPage'
import AddStorePage from './pages/AddStoragePage'
import UserList from './pages/UserList'
import StoreList from './pages/StoreList'
import Home from './pages/Home'
function App() {
 

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/stores" element={<AllStoresPage />} />
          <Route path="/rate-store" element={<RateStorePage />} />
          <Route path="/my-ratings" element={<UserRatingPage />} />
          <Route path='/user-home' element={<UserHomePage/>}/>
          <Route path='/store-owner' element={<StoreOwnerDashboard/>}/>
          <Route path='/admin-home' element={<AdminDashboard/>}/>
          <Route path='/admin/add-user' element={<AddUserPage/>}/>
          <Route path="/admin/add-store" element={<AddStorePage />} />
          <Route path="/admin/users_list" element={<UserList />} />
    <Route path="/admin/stores_list" element={<StoreList />} />
        </Routes>
      </Router>

      
    </>
  )
}

export default App
