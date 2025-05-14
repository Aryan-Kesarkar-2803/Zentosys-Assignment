import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router'
import Layout from './Layout.jsx'
import { RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Pagenotfound from './components/Pagenotfound.jsx'
import Home from './components/Home.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'
import InsertMovie from './components/InsertMovie.jsx'
import Movies from './components/Movies.jsx'
import Details from './components/Details.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<Layout/>}>
        <Route path='' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/insertmovie' element={<InsertMovie/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='*' element={<Pagenotfound/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
<RouterProvider router={router}/>
    </Provider>
  // </StrictMode>,
)
