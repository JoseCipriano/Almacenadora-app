import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { App } from './App.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
