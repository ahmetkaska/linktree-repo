import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LinktreeList from './components/LinktreeList';
import AddLinktreeForm from './components/AddLinktreeForm';
import LinktreeDetails from './components/LinktreeDetails';
import AdminLogin from './components/AdminLogin';
import EditLinktreeForm from './components/EditLinktreeForm';
import * as api from './api/index'; // API ile veritabanı işlemleri
import './App.css'; // Stil dosyan

const AppContent = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false); // Düzenleme modunu kontrol eder
  const [currentLinktree, setCurrentLinktree] = useState(null); // Düzenlenen Linktree'yi takip eder
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
useEffect(() => {
  const hostname = window.location.hostname;

  const redirectToLinktree = async () => {
    try {
      if (location.pathname === '/login' || location.pathname.startsWith('/linktree')) {
        return;
      }

      const { data: linktrees } = await api.fetchLinktree();

      const domainSlug = hostname;
      const targetLinktree = linktrees.find(lt => lt.url === domainSlug);

      if (targetLinktree) {
        navigate(`/linktree/${targetLinktree._id}`);
        // İşlemler tamamlandıktan sonra sadece domain'i güncelle
        window.history.pushState({}, '', `https://${hostname}`);
      } else {
        console.error('Linktree bulunamadı');
      }
    } catch (error) {
      console.error('Linktree yönlendirme hatası:', error);
    }
  };

  redirectToLinktree();
}, [location.pathname, navigate]);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false); // Düzenleme modunu sıfırla
    setCurrentLinktree(null); // Düzenlenen Linktree'yi sıfırla
  };

  const handleLogout = async () => {
    try {
      
      
      localStorage.removeItem('isAuthenticated');
      setOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Çıkış yapma hatası', error);
    }
  };

  const isLinktreePage = location.pathname === '/linktree';
  
  return (
    <div>
      {isAuthenticated && (
        <>
          <a
            className="btn-logout"
            onClick={handleLogout}
            style={{ display: isLinktreePage ? 'block' : 'none' }}
          >
            LOGOUT
          </a>

          <button
            className="btn-createLinktree"
            onClick={handleOpen}
            style={{ display: isLinktreePage ? 'block' : 'none' }}
          >
            New Linktree
          </button>
        </>
      )}

      <div className="app-container">
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/linktree" element={<LinktreeList />} />
          <Route path="/linktree/:id" element={<LinktreeDetails />} />
        </Routes>
      </div>

      {/* Conditionally render AddLinktreeForm or EditLinktreeForm based on edit mode */}
      {editMode && currentLinktree ? (
        <EditLinktreeForm
          linktree={currentLinktree}
          closeEditMode={handleClose}
          onLinktreeUpdate={(updatedLinktree) => setCurrentLinktree(updatedLinktree)}
        />
      ) : (
        <AddLinktreeForm open={open} handleClose={handleClose} />
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
