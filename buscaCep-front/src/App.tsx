import CardCep from './card-cep/card-cep.tsx'
import InfoCep from './info-cep/info-cep.tsx'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'



function App() {

  return (
   
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CardCep/>}/>
          <Route path='/card-cep'  element={<CardCep/>}/>
          <Route path='/info-cep'  element={<InfoCep/>}></Route>
        </Routes>
      </BrowserRouter>

  )

}

export default App
