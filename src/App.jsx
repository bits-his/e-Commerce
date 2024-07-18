import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Layout} from './components/Layout'


const App = ()=>{
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<Home />}/>
           <Footer/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;