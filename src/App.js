
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import DetailfillingForm from './components/DetailfillingForm';
import SignUp from './components/SignUp';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster/>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/SignUp' element={<SignUp/>}></Route>
      <Route path='/Dashboard' element={<Dashboard/>}></Route>
    <Route path='/ProjectList' element={<ProjectList/>}></Route>
    <Route path='/Create' element={<DetailfillingForm/>} />

    </Routes>
    </>
  );
}

export default App;
