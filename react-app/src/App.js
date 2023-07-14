import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from './components/LandingPage/landingPage';
import ProfilePage from './components/ProfilePage/profilePage';
import BusinessPage from "./components/Business/businessPage";
import ResultPage from "./components/Results/resultsPage";
import Footer from "./components/Footer/footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          <Route path='/'>
              <Navigation isLoaded={isLoaded} />
          </Route>
          <Switch>
            <Route exact path='/'>
              <LandingPage/>
            </Route>
            <Route exact path="/login" >
              <LoginFormPage />
            </Route>
            <Route exact path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/business/:businessId">
              <BusinessPage user={sessionUser}/>
            </Route>
            <Route exact path="/profile">
              <ProfilePage user={sessionUser}/>
            </Route>
            <Route exact path="/search/:keywords">
              <ResultPage user={sessionUser}/>
            </Route>
          </Switch>
          <Route path='/'>
            <Footer />
          </Route>
        </>
      )}
    </>
  );
}

export default App;
