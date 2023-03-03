import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes } from 'react-router-dom';
import renderRoute from './routes';
import { CubeLoading } from './components/Loading/Cube/CubeLoading';

function App() {
  const style: {[key:string]:React.CSSProperties}= {
    loading: {
      width:'100vw',
      height:'100vh',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    }
  }
  return (
    <Suspense fallback={<div style={style.loading}><CubeLoading/></div>}>

      <BrowserRouter>
        <Routes>
          {renderRoute()}
         
        </Routes>
      </BrowserRouter>
    // </Suspense>
  );
}

export default App;
