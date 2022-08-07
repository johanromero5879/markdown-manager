import {  Outlet } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import AppBar from '../appbar/AppBar';
import { SideSearcher } from '../titlesearcher/TitleSearcher'

const Layout = () => {
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

export default Layout