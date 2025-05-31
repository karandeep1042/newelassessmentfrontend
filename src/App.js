import './App.css';
import LoginPage from './Pages/LoginPage';
import ListPage from './Pages/ListPage';
import AddEditPage from './Pages/AddEditPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/listpage' element={<ListPage />} />
          <Route path='/add-editpage' element={<AddEditPage />} />
        </Routes>
      </BrowserRouter>
      {/* <LoginPage /> */}
      {/* <ListPage /> */}
    </>
  );
}

export default App;
