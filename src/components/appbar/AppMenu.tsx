import { useState, MouseEvent } from 'react'
import { 
    Button,
    Divider,
    SwipeableDrawer,
    IconButton,
    Menu,
    MenuItem,
    MenuList,
    ListItemIcon,
    ListItemText,
    Typography
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountIcon from '@mui/icons-material/AccountCircle'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

interface AppMenuProps {
    fullname: string
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

export const MenuDrawer = ({ fullname }: AppMenuProps) => {
    const [open, setOpen] = useState(false)

    const toggle = () => {
        setOpen(!open)
    }

    const drawer = (
        <aside className="menu-drawer">
            <Typography 
                variant="subtitle1" 
                component="h3"
            >
                { fullname }
            </Typography>
            <Divider />
            <MenuList>
                {
                    menuOptions.map(({ description, icon }, index) => 
                        <MenuItem 
                            key={index}
                            className="menu-item"
                        >
                            <ListItemIcon>
                                { icon }
                            </ListItemIcon>
                            <ListItemText>
                                { description }
                            </ListItemText>
                        </MenuItem>
                    )
                }
            </MenuList>
        </aside>
    )

    return <>
        <IconButton 
            color="inherit" 
            onClick={toggle}
        >
            <MenuIcon />
        </IconButton>
        <SwipeableDrawer
            anchor="left"
            variant="temporary"
            open={open}
            onClose={toggle}
            onOpen={toggle}
            className="menu-drawer"
        >
            { drawer }
        </SwipeableDrawer>
    </>
}

export const AppMenu = ({ fullname }: AppMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    
    return <>
        <Button 
            color="inherit"
            endIcon={<ArrowDropDownIcon />}
            onClick={handleClick}
        >
            { fullname }
        </Button>
        <Menu 
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            PaperProps={{
                style: {
                    minWidth: '125px'
                }
            }}
        >
            {
                menuOptions.map(({ description }, index) => <MenuItem key={index}>{ description }</MenuItem>)
            }
        </Menu>
    </>
}