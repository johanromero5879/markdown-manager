import { useState, FormEvent, ChangeEvent, FocusEvent, useEffect } from 'react'
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

import useBlocks from '../../hooks/useBlocks'

import EditableBlock, 
{ RefBlock, setBlockFocus, getNextBlock, getPreviousBlock} from './EditableBlock'

import { NewDocument } from '../../models/document/document'
import { validator } from '../../models/document/document.validator'

import './DocumentEditor.css'

const EditorDocument = () => {
    const { blocks, text, addBlock, deleteBlock, updateBlock } = useBlocks()
    const [nameDisabled, setNameDisabled] = useState(false)
    const [document, setDocument] = useState<NewDocument>({ title: '', content: '' })
    const [errors, setErrors] = useState<NewDocument>({} as NewDocument)

    useEffect(() => {
        setDocument(document => ({...document, content: text}))
    }, [text])

    const isValid = () => {
        // Validate all fields at the same time
        const validations: any = {}
        
        for (const key in document) {
            const errors = validator(key, document)
            
            if (!!errors[key]) {
                validations[key] = errors[key]
            }
        }

        setErrors(validations)

        // True if there is any key in validations object
        return Object.keys(validations!).length === 0
    }

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setDocument({...document, [target.name]: target.value})
    }

    const handleBlur = ({ target }: FocusEvent<HTMLInputElement>) => {
        const { name } = target

        const error = validator(name, document)
        setErrors({...errors, [name]: error[name]})

        if (!error[name]) {
            setNameDisabled(true)
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isValid()) {
            submit()
        }
    }

    const submit = async () => {
        console.log(document)
    }

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
                            value={document.title}
                            error={!!errors.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                    <FormHelperText error={!!errors.content}>
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

export default EditorDocument