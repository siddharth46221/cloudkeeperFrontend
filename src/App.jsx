import {Provider} from 'react-redux'
import {Store} from './Redux/Store'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './Router/AppRouter'

function App() {

  return (
    < >
      <div >
        
       <Provider store={Store}>
        <BrowserRouter>
       <AppRouter/>
       </BrowserRouter>

       </Provider>
        
      </div>
    </>
  )
}

export default App
