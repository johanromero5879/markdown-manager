import { useState, useEffect } from 'react'
import { 
    Card,
    FormControl,
    FormHelperText,
    Input,
    InputAdornment,
    IconButton,
    Divider,
    Button
} from '@mui/material'

import { BorderColor, EditOff, Add } from '@mui/icons-material'

import { useBlocks } from 'hooks/useBlocks'
import { useForm } from 'hooks/useForm'

import { BaseDocument, DocumentValidator } from 'models/document'

import { documentService } from 'services/document.service'

import EditableBlock, { RefBlock, setBlockFocus, getNextBlock, getPreviousBlock} from 'components/document-editor/EditableBlock'

import 'components/document-editor/document-editor.css'

const validator = new DocumentValidator()

const DocumentEditor = () => {
    const initialState = { title: '', content: '' }
    const { blocks, content, addBlock, deleteBlock, updateBlock } = useBlocks()
    const [nameDisabled, setNameDisabled] = useState(false)

    const onSubmit = async () => {
        console.log(state)
    }

    const { 
        state, 
        setState,
        validateField,
        errors,
        handleChange,
        handleSubmit 
    } = useForm<BaseDocument>({ 
        initialState, 
        validator, 
        onSubmit 
    })

    useEffect(() => {
        const fetchUser = async () => {
            const document = await documentService.fetchById('2')
            console.log(document)
        }

        fetchUser()
    }, [])

    useEffect(() => {
        validateField('content', content)
        setState((state) => ({...state, content}))
        
        // eslint-disable-next-line
    }, [content])

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

        if (previousElement) {
            setBlockFocus(previousElement)
        }else if (nextElement) {
            setBlockFocus(nextElement)
        }

        deleteBlock(currentBlock.id)
    }

    /**
     * Change disabled value of document name's input
     */
    const toggleNameDisabled = () => {
        setNameDisabled(!nameDisabled)
    }

    return (
        <div className="editor">
            <Card className="card">
                <form className="header" onSubmit={handleSubmit}>
                    <FormControl 
                        variant='standard' 
                        sx={{ 'marginLeft': '0.5rem' }}
                    >
                        <Input
                            disabled={nameDisabled}
                            disableUnderline={!errors.title}
                            placeholder="Type a title"
                            name="title"
                            value={state.title}
                            error={!!errors.title}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton onClick={toggleNameDisabled}>
                                        { nameDisabled ? <BorderColor /> : <EditOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText error={!!errors.title}>
                            { errors.title }
                        </FormHelperText>
                    </FormControl>
                    <Button 
                        variant='contained'
                        type='submit'
                        endIcon={<Add />}
                    >
                        Create
                    </Button>
                </form>
                <Divider />
                <div className='markdown'>
                    <FormHelperText 
                        sx={{ 'marginLeft': '0.5rem' }}
                        error={!!errors.content}
                    >
                        { errors.content }
                    </FormHelperText>
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

export default DocumentEditor