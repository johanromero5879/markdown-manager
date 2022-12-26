import { useState, ChangeEvent} from 'react'
import { 
    Card,
    InputBase,
    InputAdornment,
    IconButton,
    Divider,
    Button
} from '@mui/material'

import { BorderColor, EditOff, Add } from '@mui/icons-material'

import useBlocks from '../../hooks/useBlocks'

import EditableBlock, 
{ RefBlock, setBlockFocus, getNextBlock, getPreviousBlock} from './EditableBlock'

import './DocumentEditor.css'
import useForm from '../../hooks/useForm'

const EditorDocument = () => {
    const initialState = { title: '', content: '' }
    const { blocks, addBlock, deleteBlock, updateBlock, getText } = useBlocks()
    // const {} = useForm({ initialState,  })
    const [nameInput, setNameInput] = useState({ value: '', disabled: false })

    /**
     * Add a new block after current one
     */
    const addBlockHandler = (currentBlock: RefBlock) => {
        addBlock(currentBlock.id)
    }

    /**
     * Delete a block from the editor, then set focus into previous or next one.
     */
    const deleteBlockHandler = (currentBlock: RefBlock) => {
        const previousElement = getPreviousBlock(currentBlock.ref)
        const nextElement = getNextBlock(currentBlock.ref)

        if (previousElement?.classList.contains('block')) {
            setBlockFocus(previousElement)
        }else if (nextElement?.classList.contains('block')) {
            setBlockFocus(nextElement)
        }

        deleteBlock(currentBlock.id)
    }

    /**
     * Handle an event when document name has changed
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNameInput({...nameInput, value: event.target.value})
    }

    /**
     * Change disabled value of document name's input
     */
    const handleDisabled = () => {
        setNameInput({...nameInput, disabled: !nameInput.disabled})
    }

    const handleCreate = () => {
        console.log(getText())
    }

    return (
        <div className="editor">
            <Card className="card">
                <div className="header">
                    <InputBase
                        sx={{ 'marginLeft': '0.5rem' }}
                        disabled={nameInput.disabled}
                        placeholder="Type a name"
                        value={nameInput.value}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton onClick={handleDisabled}>
                                    { nameInput.disabled ? <BorderColor /> : <EditOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <Button 
                        variant='contained'
                        onClick={handleCreate}
                        endIcon={<Add />}
                    >
                        Create
                    </Button>
                </div>
                <Divider />
                <div className='markdown'>
                    {
                        blocks.map((block) => (
                            <EditableBlock 
                                key={block.id}
                                id={block.id}
                                text={block.text}
                                addBlock={addBlockHandler}
                                deleteBlock={deleteBlockHandler}
                                updateBlock={updateBlock}
                            />
                        ))
                    }
                </div>
            </Card>
        </div>
    )
}

export default EditorDocument