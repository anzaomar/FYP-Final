import React, { useContext } from 'react'
import Navbar from './components/layout/Navbar'
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Login from './components/auth/Login';
import Landing from './components/layout/Landing';
import AcademicInfo from './components/AcademicInfo';
import Dashboard from './components/Dashboard';
import Register from './components/auth/Register';
import UserContext, { UserProvider } from './UserContext'
import MenuBar from './components/layout/MenuBar';
import Timeline from './components/timeline/Timeline';
import Messenger from './components/messenger/Messenger';
import Map from './components/Map/Map';
import Analytics from './components/analytics/Analytics';


const App = () => {
	const { isLoggedIn, resetAuth, isAMember, currentUserData} = useContext(UserContext);
  console.log(currentUserData?.username)
  return (
    <>
        <Router>
          <Navbar />
          <div className="App">
            <Routes>
              <Route exact path="/" element={!isLoggedIn && !isAMember ? <Landing /> : (isLoggedIn && !isAMember) ? <Navigate to='/academic-info' /> : <Navigate to='/dashboard' />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={(isLoggedIn && isAMember) ? <Dashboard /> : (isLoggedIn && !isAMember) ? <AcademicInfo /> : <Login />} />
              <Route path="academic-info" element={<AcademicInfo />} />
              <Route path="dashboard" element={isLoggedIn && isAMember ? <Dashboard /> : (isLoggedIn && !isAMember) ? <AcademicInfo /> : <Navigate to='/' />} />
              <Route path="timeline" element={isLoggedIn && isAMember ? <Timeline user={currentUserData?.username}/> : (isLoggedIn && !isAMember) ? <AcademicInfo /> : <Navigate to='/' />} />
              <Route path="timeline/:id" element={isLoggedIn && isAMember ? <Timeline /> : (isLoggedIn && !isAMember) ? <AcademicInfo /> : <Navigate to='/' />} />
              <Route path="messaging" element={isLoggedIn && isAMember ? <Messenger /> : (isLoggedIn && !isAMember) ? <AcademicInfo /> : <Navigate to='/' />} />
              <Route path="map" element={isLoggedIn && isAMember ? <Map /> : (isLoggedIn && !isAMember) ? <AcademicInfo /> : <Navigate to='/' />} />
              <Route path="analytics" element={isLoggedIn && isAMember ? <Analytics /> : (isLoggedIn && !isAMember) ? <AcademicInfo /> : <Navigate to='/' />} />
              {/* <PrivateRoute
              path="/dashboard"
              component={Dashboard}
            />
            <PrivateRoute
              path="/getting-started"
              component={PostRegistration}
            /> */}
            </Routes>
          </div>
          {isLoggedIn && isAMember ? <MenuBar />: <></>}
        </Router>

    </>
  )
}

export default App