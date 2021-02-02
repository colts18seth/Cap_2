import Header from './Components/Header';
import Nav from './Components/Nav';
import Routes from './Components/Routes'
import './App.css';

function App() {
    return (
        <div className="App bg-dark p-0 m-5">
            <Header />
            <Nav />
            <Routes />
        </div>
    );
}

export default App;