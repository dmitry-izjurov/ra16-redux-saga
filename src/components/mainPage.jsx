import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './homePage';
import DetailsCollection from './detailsCollection';

function MainPage() {
  return (
    <div className="page">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id/details" element={<DetailsCollection />} />
        </Routes>
      </Router>
    </div>
  );
}

export default MainPage;