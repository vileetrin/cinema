import FilmsPage from '../domains/films/pages/FilmsPage/FilmsPage.tsx';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import css from './App.module.css';
import FilmDetailsPage from '../domains/films/pages/FilmDetailsPage/FilmDetailsPage.tsx';
import BuyTicketsForm from '../domains/cinema/components/BuyTicketsForm/BuyTicketsForm.tsx';
import OrdersHistoryPage from '../domains/order/pages/OrdersHistoryPage/OrdersHistoryPage.tsx';

const App = () => {
  return (
    <Router>
      <nav className={css.navigation}>
        <Link to="/">Films</Link>
        <Link to="/orders">Order History</Link>
      </nav>

      <Routes>
        <Route path="/" element={<FilmsPage />} />
        <Route path="/:filmId" element={<FilmDetailsPage />}>
          <Route path="order" element={<BuyTicketsForm />} />
        </Route>
        <Route path="/orders" element={<OrdersHistoryPage />} />
      </Routes>
    </Router>
  );
};
export default App;
