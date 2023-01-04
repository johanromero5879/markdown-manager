import { useRoutes } from 'react-router-dom'

import MainLayout from 'components/main-layout/MainLayout'
import Home from 'components/home/Home'
import Login from 'components/login/Login'
import Signup from 'components/signup/Signup'
import DocumentViewer from 'components/document/DocumentViewer'
import DocumentEditor from 'components/document-editor/DocumentEditor'

export const Router = () => {

    const routes = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                { index: true, element: <Home /> },
                { path: 'login', element: <Login /> },
                { path: 'signup', element: <Signup /> },
                { 
                    path: 'document', 
                    element: <DocumentEditor />, 
                    children: [
                        { path: 'view/:id', element: <DocumentViewer /> },
                        { path: ':id', element: <DocumentEditor /> }
                    ]
                }
            ]
        }
    ])

    return routes

}