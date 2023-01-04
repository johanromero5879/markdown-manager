import {  Outlet } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import AppBar from 'components/appbar/AppBar';
import { SideSearcher } from 'components/title-searcher/TitleSearcher'

const MainLayout = () => {

    const matchDesktop = useMediaQuery('(min-width: 1024px)')

    return <>
        <AppBar />
        <main>
            {matchDesktop && <SideSearcher />}
            <div className='content'>
                <Outlet />
            </div>
        </main>
    </>
    
}

export default MainLayout