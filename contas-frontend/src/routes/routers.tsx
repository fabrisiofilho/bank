import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/home';
import { PessoaScreen } from '../pages/pessoa';
import { ContaScreen } from '../pages/conta';
import { MovimentacaoScreen } from '../pages/movimentacao';
import { CentralScreen } from '../pages/central';

export const routers = createBrowserRouter([
    {
        path: "",
        element: <Home />,
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
    }
  ]);
