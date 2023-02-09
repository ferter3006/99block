import './App.css';
import { store } from './Redux/store';
import { Provider } from 'react-redux';
import Home from './Components/Home';

function App() {

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}


export default App;
