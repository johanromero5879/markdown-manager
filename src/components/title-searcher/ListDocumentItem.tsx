import { Link } from 'react-router-dom'
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material'
import DocumentIcon from '@mui/icons-material/Description'
import AddIcon from '@mui/icons-material/Add'

interface DocumentTitle {
    _id: string,
    title: string,
    created_by: {
        fullname: string
    }
}

interface ListTitlesProps {
    document?: DocumentTitle,
    dense?: boolean
}

const ListDocumentItem = ({ document, dense }: ListTitlesProps) => {
    if(document) {
        return (
            <ListItem
                disablePadding
                dense={dense}
            >
                <ListItemButton 
                    component={Link}
                    to={`/document/${document._id}`}
                >
                    <ListItemIcon sx={{minWidth: '35px'}}>
                        <DocumentIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary={document.title} 
                        secondary={document.created_by.fullname}
                        sx={{ my: 0 }}
                    />
                </ListItemButton>
            </ListItem>
        )
    }

    return (
        <ListItem 
            disablePadding 
            dense={dense}
        >
            <ListItemButton
                component={Link}
                to="/document"
            >
                <ListItemIcon sx={{minWidth: '35px'}}>
                    <AddIcon />
                </ListItemIcon>
                <ListItemText 
                    primary="New document" 
                    sx={{ my: 0 }}
                />
            </ListItemButton>
        </ListItem>
    )
}

export default ListDocumentItem