import React, { Component } from 'react';
import Navbar from './navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './content/home';
import Calculator from './content/calculator';
import Login from './content/login';
import Register from './content/register';
import NotFound from './content/notFound';


class App extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Navbar />
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='/home' element={<Home/>} />
                        <Route path='/calculator' element={<Calculator/>} />
                        <Route path='/login' element={<Login/>} />
                        <Route path='/register' element={<Register/>} />
                        <Route path='/404' element={<NotFound/>} />
                        <Route path='*' element={<Navigate replace to='/404'/>} />
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}
 
export default App;