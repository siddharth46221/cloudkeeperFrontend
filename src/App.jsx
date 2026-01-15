import {Provider} from 'react-redux'
import {Store} from './Redux/Store'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './Router/AppRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    < >
      <div >
        
       <Provider store={Store}>
        <BrowserRouter>
        <ToastContainer position='top-right' autoClose={2000} theme='colored'/>
       <AppRouter/>
       </BrowserRouter>

       </Provider>
        
      </div>
    </>
  )
}

export default App
