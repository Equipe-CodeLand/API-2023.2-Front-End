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
import CadastroUser from './pages/cad_user.page';
import CadastroCli from './pages/cad_cli.page';
import Home from './pages/home.page';
import ChamadoCli from './pages/chamadoCli.page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/chamados",
    element: <Chamados></Chamados>,
  },
  {
    path: "/chamados/Adm",
    element: <ChamadosAdm />
    },
    {
      path: "/cadastroUser",
      element: <CadastroUser />
      },
      {
        path: "/cadastroCliente",
        element: <CadastroCli />
        },
        {
          path: "/chamadoCli",
          element: <ChamadoCli />
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