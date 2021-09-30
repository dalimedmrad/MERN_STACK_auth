import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch,BrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import PrivateRoute from './Components/router/PrivateRoute';
import Signin from './Components/Signin/Signin';
import SignUp from './Components/Signup/Signup';
import { current } from './JS/actions/user';
import './App.css';

const  App = () =>{
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current());
  }, []);

  return (
      <div>
        <BrowserRouter>
          <Switch>
            <PrivateRoute path="/home"  component={Home}/>
            <Route path="/" exact component={Signin}/>
            <Route path="/signup" exact component={SignUp}/>
          </Switch>
        </BrowserRouter>
      </div>
    
  );
}

export default App;
