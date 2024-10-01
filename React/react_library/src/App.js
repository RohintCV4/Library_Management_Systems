import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from './page/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './page/SignIn';
import Book from './page/Book';
// import InitialUpdate from './page/InitialUpdate';
// import Navbar from './page/Navbar';
import Layout from './page/Layout';
import ProfileUpdate from './page/ProfileUpdate';
import Purchase from './page/Purchase';
import ReturnBook from './page/ReturnBook';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp />}/>    
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/library' element={<Layout />}>
        <Route path='/library/book' element={<Book />}/>
        <Route path='/library/profileupdate/:id' element={<ProfileUpdate />} />
        <Route path='/library/purchase/:id' element={<Purchase />}/>
        <Route path='/library/return/:id' element={<ReturnBook />}/>
        </Route>
        {/* <Route path='/navbar' element={<Navbar />}/> */}
      </Routes>
    </Router>
  )
}

export default App;
