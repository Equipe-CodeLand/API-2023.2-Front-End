import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
//import Chamados from './pages/chamados.page';
import App from './App';
import ChamadosAdm from './pages/chamadosAdm.page';
import CadastroUser from './pages/cad_user.page';
import CadastroCli from './pages/cad_cli.page';
import Home from './pages/home.page';
import ChamadoCli from './pages/chamadoCli.page';
import ChamadosAte from './pages/chamadoAte.page';
import MeusChamados from './pages/meusChamados.page';
import LoginPage from './pages/login.page';
import CadastroChamada from './pages/cad_chamados.page';
import ChamadosForm from './components/cad_chamado/cadChamadoComponent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  /*{
    path: "/chamados",
    element: <Chamados></Chamados>,
  },*/
  {
    path: "/meusChamados",
    element: <MeusChamados></MeusChamados>,
  },
  {
    path: "/chamadosAdm",
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
    path: "/chamadosCli",
    element: <ChamadoCli />
  },
  {
    path:"/chamadosAte",
    element:<ChamadosAte />
  },
  {
    path:"/login",
    element:<LoginPage />
  },
  {
    path:'/cadastroChamados',
    element:<CadastroChamada />
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