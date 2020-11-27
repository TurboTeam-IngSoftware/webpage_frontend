
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Home from './components/pages/Home';
import LoginSect from './components/pages/LoginSect';


function App() {
  return (
    <div className='maincont'>
    <Router>
      <Header/>
      <Navbar/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' component={LoginSect}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
