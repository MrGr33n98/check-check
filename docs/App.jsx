import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CompanyRegistrationPage from './pages/CompanyRegistrationPage';
import CompanyDetail from './components/CompanyDetail';
import { mockCompanies } from './data/mockData';

function App() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleCompanySelect = (company) => {
    // Company selection logic
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          user={user} 
          onLogout={handleLogout}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  searchTerm={searchTerm}
                  onCompanySelect={handleCompanySelect}
                />
              } 
            />
            <Route 
              path="/login" 
              element={<LoginPage onLogin={handleLogin} />} 
            />
            <Route 
              path="/register" 
              element={<RegisterPage />} 
            />
            <Route 
              path="/company-registration" 
              element={<CompanyRegistrationPage />} 
            />
            <Route 
              path="/dashboard" 
              element={<DashboardPage user={user} />} 
            />
            <Route 
              path="/company/:id" 
              element={
                <CompanyDetail 
                  companies={mockCompanies}
                />
              } 
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;