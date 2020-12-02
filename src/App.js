
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Home from './components/pages/Home';
import LoginSect from './components/pages/LoginSect';
import ArtiListSect from './components/pages/ArtiListSect'
import Artpg from './components/pages/ArtiSect'
import EditList from './components/pages/EditList'


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
        <Route path='/artpg' component={Artpg}/>
        <Route path='/editart' component={EditList}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
