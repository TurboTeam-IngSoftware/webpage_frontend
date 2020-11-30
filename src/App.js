
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Home from './components/pages/Home';
import LoginSect from './components/pages/LoginSect';
import ArtiListSect from './components/pages/ArtiListSect'


function App() {
  return (
    <div className='maincont'>
    <Router>
      <Header/>
      <Navbar/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' component={LoginSect}/>
        <Route path='/articulos' component={ArtiListSect}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
