import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Chamados from './pages/chamados.page';
import App from './App';
import ChamadosAdm from './pages/chamadosAdm.page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/chamados",
    element: <Chamados></Chamados>,
  },
  {
    path: "/chamadosAdm",
    element: <ChamadosAdm />
    }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
