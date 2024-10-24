import FilmsPage from "../domains/films/pages/FilmsPage/FilmsPage.tsx"
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import css from './App.module.css'
import FilmDetailsPage from "../domains/films/pages/FilmDetailsPage/FilmDetailsPage.tsx";

const App = (() => {
    return (
        <Router>
            <nav className={css.navigation}>
                <Link to="/">Films</Link>
                <Link to="/orders">Order History</Link>
            </nav>

            <Routes>
                <Route path="/" element={<FilmsPage/>}/>
                <Route path="/:filmId" element={<FilmDetailsPage/>} />
            </Routes>
        </Router>
    );
});
export default App
