import { useState, ChangeEvent} from 'react'
import { 
    Card,
    InputBase,
    InputAdornment,
    IconButton,
    Divider
} from '@mui/material'

import { BorderColor, EditOff } from '@mui/icons-material'

import useBlocks from '../../hooks/useBlocks'
import EditableBlock, { RefBlock,setCaretToEnd} from './EditableBlock'

const EditorDocument = () => {
    const { blocks, addBlock, deleteBlock, updateBlock } = useBlocks()
    const [nameInput, setnameInput] = useState({ value: '', disabled: false })

    const addBlockHandler = (currentBlock: RefBlock) => {
        addBlock(currentBlock.id)
    }

    const deleteBlockHandler = (currentBlock: RefBlock) => {
        const previousElement = currentBlock.ref?.previousElementSibling as HTMLElement
        const nextElement = currentBlock.ref?.nextElementSibling as HTMLElement

        if (previousElement?.classList.contains('block')) {
            setCaretToEnd(previousElement)
        }else if (nextElement?.classList.contains('block')) {
            setCaretToEnd(nextElement)
        }

        deleteBlock(currentBlock.id)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setnameInput({...nameInput, value: event.target.value})
    }

    const handleDisabled = () => {
        setnameInput({...nameInput, disabled: !nameInput.disabled})
    }

    return (
        <div className="markdown">
            <Card className="card">
                <div className="header">
                    <InputBase
                        sx={{ marginBottom: '0.5rem' }}
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
                </div>
                <Divider />
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
                
            </Card>
        </div>
    )
}

export default EditorDocument