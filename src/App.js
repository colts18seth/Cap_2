import Header from './Header';
import Nav from './Nav';
import Routes from './Routes'
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