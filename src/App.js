import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Dashboard from './components/Dashboard'
import {createBrowserHistory} from 'history'
import storeInstance from './stores/Store'
export const StoreContext = React.createContext();
const history=createBrowserHistory()
function App() {
  return (
    <StoreContext.Provider value={storeInstance}>
      <Router>
        <Route history={history} exact path={"/" } component={Dashboard} />
      </Router>
    </StoreContext.Provider >
   );
  }

export default App;
