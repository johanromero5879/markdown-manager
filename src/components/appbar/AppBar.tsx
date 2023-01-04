import { 
    Link,
    useLocation
} from 'react-router-dom'
import { 
    AppBar as Bar,
    Button,
    Toolbar,
    Typography,
    useMediaQuery
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'

import AppMenu from 'components/appbar/AppMenu'
import Logo from 'static/img/markdown.jpg'
import { InputSearcher } from 'components/title-searcher/TitleSearcher'

import 'components/appbar/appbar.css'

const AppBar = () => {
    const location = useLocation()

    const matchDesktop = useMediaQuery('(min-width: 1024px)')

    const logged = false
    const user = {
        fullname: 'Johan Romero',
        username: 'johan.romero5879',
        role: 'Administrator'
    }

    return <>
        <Bar className="navbar" position="sticky">
            <Toolbar>
                <img src={Logo} alt="app icon" className="logo" />
                {
                    matchDesktop 
                    ?
                        <Typography 
                            variant="h6"
                            component="h1"
                        >
                            Markdown Manager
                        </Typography>
                    :
                        <InputSearcher />
                }
                {
                    <div className="right-tools">
                        {
                            logged 
                            ? 
                                <AppMenu user={ user } />
                            :
                                <Button 
                                    component={Link}
                                    to="/login"
                                    state={{ background: location }}
                                    color="inherit" 
                                    startIcon={<LoginIcon />}
                                >
                                    Login
                                </Button>
                        }
                    </div>
                }
            </Toolbar>
        </Bar>
    </>
}

export default AppBar