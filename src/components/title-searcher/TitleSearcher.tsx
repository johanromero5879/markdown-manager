import { useState } from 'react'
import {
    Autocomplete,
    ClickAwayListener,
    Fab,
    IconButton,
    Input,
    InputAdornment,
    List,
    TextField
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/NoteAdd'

import './TitleSearcher.css'
import ListDocumentItem from './ListDocumentItem'

const documents = [
    {
        _id: '1',
        title: 'Title 1',
        created_by: { fullname: 'John Titor' }
    },
    {
        _id: '2',
        title: 'Title 2',
        created_by: { fullname: 'Sara Claire' }
    },
    {
        _id: '3',
        title: 'Titulo largo que te cagas en tus muertos',
        created_by: { fullname: 'Sara Claire' }
    }
]

export const SideSearcher = () => {
    return (
        <aside className='side-searcher'>
            <TextField 
                variant="standard"
                placeholder='Search'
                fullWidth
                sx={{ marginTop: '0.5rem' }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment 
                            position='start' 
                            sx={{ marginLeft: '0.5rem', marginBottom: '0.25rem' }}
                        >
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
            <List>
                {
                    documents.map((document, index) => (
                        <ListDocumentItem key={index} document={document} />
                    ))
                }
                <ListDocumentItem />
            </List>
        </aside>
    )
}

export const InputSearcher = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    
    const handleClose = () => {
        setTimeout(() => setOpen(false), 100)
    }

    return <>
        <IconButton 
            className="search-icon"
            onClick={handleOpen}
            sx={{ color: '#fff', padding: 0 }}
        >
            <SearchIcon />
        </IconButton>
        { open && 
            <ClickAwayListener onClickAway={handleClose}>
                <Autocomplete 
                    className='input-searcher'
                    fullWidth
                    renderOption={(props, option) => (
                        <ListDocumentItem 
                            document={option} 
                            key={option._id} 
                            dense
                            {...props} 
                        />
                    )}
                    renderInput={params => (
                        <Input 
                            autoFocus
                            fullWidth
                            ref={params.InputProps.ref}
                            inputProps={params.inputProps}
                            placeholder='Search titles'
                            disableUnderline
                            startAdornment={
                                <InputAdornment position='start'>
                                    <IconButton 
                                        className="search-icon"
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    )}
                    options={documents}
                    getOptionLabel={option => option.title}
                />
            </ClickAwayListener>
        }
        <Fab className='fab' color='secondary'>
            <AddIcon />
        </Fab>
    </>
}