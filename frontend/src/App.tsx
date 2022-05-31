import './assets/styles/custom.scss';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Routes from 'Routes';
import { useState } from 'react';
import { AuthContext, AuthContextData } from 'AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <Routes />
<<<<<<< HEAD
      <ToastContainer />
=======
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
>>>>>>> b0899298365ca84229896c90dbaeff73df2759c1
    </AuthContext.Provider>
  );
}

export default App;
