import 'react-contexify/dist/ReactContexify.min.css';

import './App.scss';

import About from 'components/About';
import ContactUs from 'components/ContactUs/ContactUs';
import DemoSignup from 'components/DemoSignup/DemoSignup';
import Footer from 'components/Footer';
import Landing from 'components/Landing';
import License from 'components/License';
import LoginPage from 'components/LoginPage';
import MenuBar from 'components/MenuBar';
import NavBar from 'components/NavBar';
import Sheet from 'components/Sheet';
import SheetSelector from 'components/SheetSelector';
import SpellBook from 'components/SpellBook';
import Inventory from 'components/Inventory';
import UserManager from 'components/UserManager';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

const LoggedInRoute = ({ children, ...rest }) => {
  const loggedIn = useSelector(state => state.user.loggedIn);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const App = () => {
  const showSidebar = useSelector(state => state.user.showSidebar);

    return (
    <div className="App">
      <Router>
        <UserManager />
        <Switch>
          <Route exact path="/">
            <div className="Content">
              <NavBar margin={false} />
              <Landing />
              <Footer />
            </div>
          </Route>
          <LoggedInRoute path="/app">
            { showSidebar && 
              <div className="FixedSidebar">
                <MenuBar />
              </div>
            }
            <div className="Content">
              <NavBar />
              <Switch>
                <Route exact path="/app">
                  <SheetSelector />
                </Route>
                <Route path="/app/character/:sheetId">
                  <Switch>
                    <Route exact path="/app/character/:sheetId/">
                      <Sheet />
                    </Route>
                    <Route path="/app/character/:sheetId/spells">
                      <SpellBook />
                    </Route>
                    <Route path="/app/character/:sheetId/inventory">
                      <Inventory />
                    </Route>
                  </Switch>
                </Route>
                <Route path="/app/contact-us">
                  <ContactUs />
                </Route>
              </Switch>
            </div>
          </LoggedInRoute>
          <Route path="/demo">
            <DemoSignup />
            <div className="FixedSidebar">
              <MenuBar demo />
            </div>
            <div className="Content">
              <NavBar />

              <Switch>
                <Route exact path="/demo">
                  <Sheet demo />
                </Route>
                <Route path="/demo/spells">
                  <SpellBook demo />
                </Route>
              </Switch>
            </div>
          </Route>
          <Route path="/login">
            <div className="Content">
              <LoginPage />
            </div>
          </Route>
          <Route path="/license">
            <div className="Content">
              <NavBar />
              <License />
              <Footer />
            </div>
          </Route>
          <Route path="/about">
            <div className="Content">
              <NavBar />
              <About />
              <Footer />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
  }

export default App;
