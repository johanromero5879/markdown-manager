import { useState } from 'react'
//import { useParams } from 'react-router-dom'
import Markdown from 'react-markdown'
import { 
    Card, 
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material'

import './Document.css'

const ViewerDocument = () => {
    const [document] = useState({
        _id: '1',
        title: 'This is a title',
        content: `# Markdown Manager on React\r\n
        ## Spec- NodeJS: 18.0.0\r\n
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur non cupiditate ut qui ipsa quaerat eligendi atque nostrum sint voluptatum modi possimus culpa aliquam doloribus libero temporibus, omnis reprehenderit dolores unde. Dolorum nulla debitis non doloremque amet cupiditate eaque? Cumque commodi architecto natus ad. Sit accusamus odio alias ab ipsum.`,
        created_by: 'John Titor',
        modified_by: 'Johan Sebastian Romero Romero',
        created_at: 'September 21, 2022',
        modified_at: 'September 21, 2022'
    })

    return <div className='markdown-container'>
        <Card className='markdown-card'>
            <Markdown 
                className='markdown'>
                {document.content}
            </Markdown>
        </Card>
        <List className="markdown-info">
            <ListItemText 
                primary={
                    <Typography className="list-item-header">
                        Title
                    </Typography>
                }
                secondary={
                    <Typography fontSize={14}>
                        { document.title }
                    </Typography>
                }
            />
            <Divider />
            <ListItem 
                className='list-item'
            >
                <ListItemText 
                    primary={
                        <Typography className="list-item-header">
                            Created by
                        </Typography>
                    }
                    secondary={
                        <Typography fontSize={14}>
                            { document.created_by }
                        </Typography>
                    }
                />
                <ListItemText 
                    primary={
                        <Typography className="list-item-header">
                            Created at
                        </Typography>
                    }
                    secondary={
                        <Typography fontSize={14}>
                            { document.created_at }
                        </Typography>
                    }
                />
            </ListItem>
            <Divider />
            <ListItem 
                className='list-item'
            >
                <ListItemText 
                    primary={
                        <Typography className="list-item-header">
                            Modified by
                        </Typography>
                    }
                    secondary={
                        <Typography fontSize={14}>
                            { document.modified_by }
                        </Typography>
                    }
                />
                <ListItemText 
                    primary={
                        <Typography className="list-item-header">
                            Modified at
                        </Typography>
                    }
                    secondary={
                        <Typography fontSize={14}>
                            { document.modified_at }
                        </Typography>
                    }
                />
            </ListItem>
        </List>
    </div>
}

export default ViewerDocument