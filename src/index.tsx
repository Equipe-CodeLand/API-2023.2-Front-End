import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from './App';
import ChamadosAdm from './pages/chamadosAdm.page';
import CadastroUser from './pages/cad_user.page';
import CadastroCli from './pages/cad_cli.page';
import ChamadoCli from './pages/chamadoCli.page';
import ChamadosAte from './pages/chamadoAte.page';
import MeusChamados from './pages/meusChamados.page';
import LoginPage from './pages/login.page';
import CadastroChamada from './pages/cad_chamados.page';

import HomePageCliente from './pages/home.page.cliente';
import HomePageAtendente from './pages/home.page.atendente';
import HomePageAdministrador from './pages/home.page.administrador';
import CadSolucaoPage from './pages/cad_solucao.page';
import Problemas from './pages/problemas.page';
import EditarProblema from './pages/editarProblema.page';
import ProblemasSolucoesCli from './components/problemasConhecidos/problemasCli';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/meusChamados/atendente",
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
    path:"/home/cliente",
    element:<HomePageCliente />
  },
  {
    path:"/home/atendente",
    element:<HomePageAtendente />
  },
  {
    path:"/home/administrador",
    element:<HomePageAdministrador />
  },
  {
    path:'/cadastroChamados',
    element:<CadastroChamada />
  },
  {
    path: '/cadastroSolucao',
    element: <CadSolucaoPage  />
  },
  {
    path: '/solucoesCli',
    element: <ProblemasSolucoesCli />
  },
  {
    path: '/problemas',
    element: <Problemas  />
  },
  {
    path: '/editarProblemas/:id',
    element: <EditarProblema  />
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