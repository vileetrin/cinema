import FilmsPage from "../domains/films/pages/FilmsPage/FilmsPage.tsx"
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import css from './App.module.css'

const App = (() => {
    return (
        <Router>
            <nav className={css.navigation}>
                <Link to="/">Films</Link>
                <Link to="/orders">Order History</Link>
            </nav>

            <Routes>
                <Route path="/" element={<FilmsPage/>}/>
            </Routes>
        </Router>
    );
});
export default App
