import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import API from './services/api';

API.get("/")
  .then(Response => console.log(Response.data))
  .catch(err => console.error(err));
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <h1 className='text-red-200'>hello</h1>
    </>
  )
}

export default App
