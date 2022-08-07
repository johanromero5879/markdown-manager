import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material'
import DocumentIcon from '@mui/icons-material/Description'
import AddIcon from '@mui/icons-material/Add'

interface DocumentTitle {
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
                <ListItemButton>
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
            <ListItemButton>
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