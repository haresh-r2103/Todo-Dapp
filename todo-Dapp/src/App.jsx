import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ConnectWallet from './pages/ConnectWallet'
import TodoList from './pages/TodoList'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ConnectWallet />}></Route>
        <Route path='/todo' element={<TodoList />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App