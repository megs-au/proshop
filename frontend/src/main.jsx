import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import store from './store.js'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={ true }>
          <BrowserRouter>
          <App />
        </BrowserRouter>
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>,
)
