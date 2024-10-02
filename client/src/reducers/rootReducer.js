import React, { useState, createContext, useContext } from "react";

// Global State için Context oluşturuyoruz
const LinktreeContext = createContext();

export const useLinktree = () => useContext(LinktreeContext);

// Provider bileşeni
export const LinktreeProvider = ({ children }) => {
  const [linktrees, setLinktrees] = useState([]);
  const [currentLinktree, setCurrentLinktree] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Aksiyonlara karşılık gelecek fonksiyonlar
  const fetchLinktrees = (data) => {
    setLinktrees(data);
  };

  const fetchSingleLinktree = (data) => {
    setCurrentLinktree(data);
  };

  const createLinktree = (newLinktree) => {
    setLinktrees([...linktrees, newLinktree]);
  };

  const updateLinktree = (updatedLinktree) => {
    setLinktrees(
      linktrees.map((linktree) =>
        linktree._id === updatedLinktree._id ? updatedLinktree : linktree
      )
    );
    setCurrentLinktree(updatedLinktree);
  };

  const deleteLinktree = (id) => {
    setLinktrees(linktrees.filter((linktree) => linktree._id !== id));
    if (currentLinktree && currentLinktree._id === id) {
      setCurrentLinktree(null);
    }
  };

  const adminLogin = () => {
    setIsAuthenticated(true);
  };

  const adminLogout = () => {
    setIsAuthenticated(false);
    setCurrentLinktree(null);
  };

  return (
    <LinktreeContext.Provider
      value={{
        linktrees,
        currentLinktree,
        isAuthenticated,
        fetchLinktrees,
        fetchSingleLinktree,
        createLinktree,
        updateLinktree,
        deleteLinktree,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </LinktreeContext.Provider>
  );
};

// Kullanım örneği
const App = () => {
  const {
    linktrees,
    currentLinktree,
    isAuthenticated,
    fetchLinktrees,
    fetchSingleLinktree,
    createLinktree,
    updateLinktree,
    deleteLinktree,
    adminLogin,
    adminLogout,
  } = useLinktree();

  // Örnek kullanımlar
  return <div> {/* Uygulamanın geri kalanı */} </div>;
};
