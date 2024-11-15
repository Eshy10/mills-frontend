import React from 'react';
import MainContainer from './components/Container';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md flex items-center justify-between">
        <h1 className="text-2xl font-bold">Waste Management Dashboard</h1>
        <p className="text-sm">Monitor mills and dumpsites efficiently</p>
      </header>
      <main className="flex-1 flex overflow-hidden">
        <MainContainer />
      </main>
      <footer className="bg-gray-800 text-white p-3 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Waste Management Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
