import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import LoginState from './loginState';
import Home from './composantes/home/home';
import Header from './composantes/header/header';
import Login from './composantes/logIn/login';
import Signup from './composantes/signUp/signUp';
import User from './composantes/user/user';
import GestionUser from './composantes/gestionUser/gestionUser';
import EditUser from './composantes/gestionUser/edit';
import DeleteAcc from './composantes/deleteAcc/deleteAcc';
import GestionBooks from './composantes/gestionBooks/gestionBooks';
import AddBook from './composantes/gestionBooks/addBook';
import EditBook from './composantes/gestionBooks/edit';
import EmprunterLivre from './composantes/emprunterLivre/emprunterLivre';
import BookDetail from './composantes/emprunterLivre/viewBook';
import ReturnBook from './composantes/returnBook/returnBook';
import Historique from './composantes/historique/historique';
import Recc from './composantes/recc/recc';
function App() {
  return (
    <LoginState>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<User />} />
          <Route path="/gestionUser" element={<GestionUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path='/Delete' element={<DeleteAcc />}></Route>
          <Route path="/gestionBooks" element={<GestionBooks />} />
          <Route path="/editBook/:id" element={<EditBook />} />
          <Route path="/addBook" element={<AddBook />} />
          <Route path="/emprunterLivre" element={<EmprunterLivre />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/returnBook" element={<ReturnBook />} />
          <Route path="/history" element={<Historique />} />
          <Route path="/recc" element={<Recc />} />
        </Routes>
      </BrowserRouter>
    </LoginState>
  );
}

export default App;
