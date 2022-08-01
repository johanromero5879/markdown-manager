import { 
    AppBar as Bar,
    Button,
    Toolbar,
    Typography,
    useMediaQuery
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'

import {AppMenu, MenuDrawer} from './AppMenu'
import Logo from './markdown.jpg'
import './AppBar.css'

const AppBar = () => {
    const matchMobile = useMediaQuery('(max-width: 767px)')
    const matchXS = useMediaQuery('(max-width: 364px)')
    const logged = true

    return <>
        <Bar className="navbar">
            <Toolbar>
                {
                    (logged && matchMobile) && 
                    <MenuDrawer fullname='Johan Sebastian' />
                }
                {
                    !matchXS && 
                    <img src={Logo} alt="app icon" className="logo" />
                }
                <Typography 
                    variant={!matchXS ? "h6" : "subtitle1"} 
                    component="h1"
                >
                    Markdown Manager
                </Typography>
                {
                    <div className="right-tools">
                        {
                            (logged && !matchMobile) &&
                            <AppMenu fullname='Johan Sebastian' />
                        }
                        {
                            !logged && 
                            <Button color="inherit" startIcon={<LoginIcon />}>
                                { !matchXS && 'Login' }
                            </Button>
                        }
                    </div>
                }
            </Toolbar>
        </Bar>
    </>
}

export default AppBar