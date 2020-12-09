
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/pages/Home';
import LoginSect from './components/pages/LoginSect';
import ArtiListSect from './components/pages/ArtiListSect'
import Artpg from './components/pages/ArtiSect'
import ListaUsuarios from './components/pages/AdminList'
import CreateUser from './components/pages/CreateUserSect'
import EdicionUsurio from './components/pages/EditDeleteUsers'
import ArtiDelRev from './components/pages/ArtiEdRevSect'
import CrearArti from './components/pages/ArtiEditSect'
import EditArti from './components/pages/ArtiAlterSect'


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
        <Route path='/listausuarios' component={ListaUsuarios}/>
        <Route path='/crearusuario' component={CreateUser}/>
        <Route path='/edicionusuario'component={EdicionUsurio}/>
        <Route path = '/artireded' component = {ArtiDelRev}/>
        <Route path= '/creararti' component = {CrearArti}/>
        <Route path= '/editarti' component = {EditArti}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
