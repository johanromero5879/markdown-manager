import { useState, MouseEvent } from 'react'
import { 
    Avatar,
    Divider,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery
} from '@mui/material'
import { lightBlue } from '@mui/material/colors'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountIcon from '@mui/icons-material/AccountCircle'
import PersonIcon from '@mui/icons-material/Person'

interface AppMenuProps {
    user: {
        fullname: string,
        username: string,
        role: string
    }
}

const menuOptions = [
    {
        description: 'Profile',
        icon: <AccountIcon />,
        exec: () => {}
    },
    {
        description: 'Logout',
        icon: <LogoutIcon />,
        exec: () => {}
    }
]

const AppMenu = ({ user }: AppMenuProps) => {

    const matchXS = useMediaQuery('(max-width: 364px)')

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const getInitialsName = (fullname: string) => {
        let initialLetters = ''

        if(!!fullname.trim()) {
            const nameSplitted = fullname.split(' ')
            initialLetters = nameSplitted[0][0] + (nameSplitted.length > 1 ? nameSplitted[1][0] : '')
        }

        return initialLetters
    }
    
    return <>
        <Avatar
            className='avatar-button'
            sx={{ 
                bgcolor: lightBlue[600],  
                width: matchXS ? 32 : 40, 
                height: matchXS ? 32 : 40
            }}
            onClick={handleClick}
        >
            { getInitialsName(user.fullname) || <PersonIcon /> }
        </Avatar>
        <Menu 
            className='menu-dropdown'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            PaperProps={{
                style: {
                    minWidth: '150px'
                }
            }}
        >
            <div className="header">
                <Typography variant="subtitle1">
                    { user.fullname }
                </Typography>
                <Typography variant="caption">
                    { user.role }
                </Typography>
            </div>
            <Divider />
            <div className="list">
                {
                    menuOptions.map(({ description, icon }, index) => 
                        <MenuItem key={index}>
                            <ListItemIcon>
                                { icon }
                            </ListItemIcon>
                            <ListItemText>
                                { description }
                            </ListItemText>
                        </MenuItem>
                    )
                }
            </div>
        </Menu>
    </>
}

export default AppMenu