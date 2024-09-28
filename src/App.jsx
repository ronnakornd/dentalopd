import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState , useEffect} from 'react'
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import Home from './pages/Home';
import Member from './pages/Member';
import Act from './pages/Act';
import Summary from './pages/Summary';

function App() {

  return (
    <>
       <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/member" element={<Member />} />
              <Route path="/act" element={<Act />} />
              <Route path="/summary" element={<Summary />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
