import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/home';
import { PessoaScreen } from '../pages/pessoa';
import { ContaScreen } from '../pages/conta';
import { MovimentacaoScreen } from '../pages/movimentacao';
import { CentralScreen } from '../pages/central';
import { LoginScreen } from '../pages/login';
import { isLoggedIn } from '../services/auth';

export const routers = createBrowserRouter([
    {
        path: "",
        element: isLoggedIn() ? <Home /> : <Navigate to="/login" />,
        children: [
            {
                path: "",
                element: <CentralScreen/>
            },
            {
                path: "pessoa",
                element: <PessoaScreen/>
            },
            {
                path: "conta",
                element: <ContaScreen/>
            },
            {
                path: "movimentacao",
                element: <MovimentacaoScreen/>
            },
        ]
    },
    {
        path: "login",
        element: <LoginScreen/>
    },
  ]);
