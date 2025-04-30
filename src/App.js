import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import DocumentsPage from './pages/DocumentsPage';
import PlantaPage from './pages/PlantaPage';
import DocumentosProjetoPage from './pages/DocumentosProjetoPage';
import ArchivePage from './pages/ArchivePage';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Rota principal */}
        <Route path="/" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />

        {/* Documentos gerais */}
        <Route path="/documents" element={
          <PrivateRoute>
            <DocumentsPage />
          </PrivateRoute>
        } />

        {/* Rotas de projetos */}
        <Route path="/projects/planta" element={
          <PrivateRoute>
            <PlantaPage />
          </PrivateRoute>
        } />
        
        <Route path="/projects/documentos" element={
          <PrivateRoute>
            <DocumentosProjetoPage />
          </PrivateRoute>
        } />

        {/* Arquivo */}
        <Route path="/archive" element={
          <PrivateRoute>
            <ArchivePage />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
