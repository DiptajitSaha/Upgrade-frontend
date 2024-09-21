import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavbarDefault } from './components/Navbar';
import { RecoilRoot } from 'recoil';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

const Browse = lazy(() => import('./pages/Browse'));
const MyCourses = lazy(() => import('./pages/MyCourses'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Publishes = lazy(() => import('./pages/Publishes'));
const Account = lazy(() => import('./pages/Account'));
const Course = lazy(() => import('./pages/Course'));
const Upload = lazy(() => import('./pages/Upload'));

export const App = () => {
  return (
    <>
      <Router>
        <NavbarDefault />
        <hr />
        <Suspense fallback={<div className='text-white'>Loading...</div>}>
          <RecoilRoot>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/publishes/upload' element={<Upload />} />
              <Route path="/browse" element={<Browse />} />
              <Route path='/courses/:id' element={<Course />}/>
              <Route path="/mycourses" element={<MyCourses />} />
              <Route path="/publishes" element={<Publishes />} />
              <Route path="/account" element={<Account />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RecoilRoot>
        </Suspense>
      </Router>
    </>
  );
}

