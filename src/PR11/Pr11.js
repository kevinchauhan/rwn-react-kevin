import React, { useEffect, useState } from 'react'
import Product from './pages/Product'
import Header from './components/Header'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Cart from './pages/Cart'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthContext from './authContext'
import ProtectedRoute from './routes/ProtectedRoute'
import GuestRoute from './routes/GuestRoute'
import axios from 'axios'
import Home from './pages/Home'

const Pr11 = () => {
    const [authenticate, setAuthenticate] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:5500/current-user')
            .then((res) => {
                if (Object.keys(res.data).length < 1) {
                    setAuthenticate(null)
                } else {
                    setAuthenticate(res.data)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <BrowserRouter>
                <AuthContext.Provider value={{ authenticate, setAuthenticate }}>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<GuestRoute Cmp={<Login />} />} />
                        <Route path='/signup' element={<GuestRoute Cmp={<Signup />} />} />
                        <Route path='/product' element={<ProtectedRoute Cmp={<Product />} />} />
                        <Route path='/cart' element={<ProtectedRoute Cmp={<Cart />} />} />
                    </Routes>
                </AuthContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default Pr11