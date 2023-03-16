import './App.css';
import HeaderPage from './components/HeaderPage';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import UsersPage from './components/UsersPage';
import ChatPage from './components/ChatPage';
import LoginPage from './components/LoginPage';
import { UserContext } from './components/UserContext'
import { useState } from 'react';
import { ColorContext } from './components/ColorContext';

function App() {
    const [user, setUser] =useState('');
    const [color, setColor] = useState('success');
    return (
        <ColorContext.Provider value={{color, setColor}}>
            <UserContext.Provider value={{user, setUser}}>
                <div className="App">
                    <HeaderPage/>
                    <Switch>
                        <Route path='/' component={HomePage} exact={true}/>
                        <Route path='/users' component={UsersPage}/>
                        <Route path='/chat' component={ChatPage}/>
                        <Route path='/login' component={LoginPage}/>
                    </Switch>
                </div>
            </UserContext.Provider>
        </ColorContext.Provider>
    );
}

export default App;
