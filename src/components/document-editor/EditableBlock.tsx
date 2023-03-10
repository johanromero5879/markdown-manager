import { 
    useState, 
    useEffect, 
    useRef, 
    KeyboardEvent
} from 'react'
import { IconButton } from '@mui/material'
import { DragIndicator } from '@mui/icons-material'

import { MarkdownRenderService as markdown } from '../../services/markdown-render.service'
import { Block } from '../../hooks/useBlocks'


export interface RefBlock {
    id: string,
    ref: HTMLElement
}

interface RefBlockFunc {
    ({id, ref}: RefBlock): void
}

interface EditableBlockProps {
    id: string,
    text: string,
    addBlock: RefBlockFunc,
    deleteBlock: RefBlockFunc,
    updateBlock: (block: Block) => void
}

/**
 * Set caret to end of a block, then set its focus.
 */
export const setBlockFocus = (element: HTMLElement) => {
    const range = document.createRange()
    const selection = window.getSelection() as Selection
    range.selectNodeContents(element)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
    element.focus()
}

/**
 * Get a block div by a parent element
 */
const getBlockChild = (parent: Element | null | undefined) => {
    const children = parent?.children
    const len = children?.length || 0

    for (let i = 0; i < len; i++) {
        const child = children!.item(i)!
        if (typeof child.matches === 'function' && child.matches('.block')) {
            return child as HTMLElement
        }
    }
}

/**
 * Get previous block by given one
 */
export const getPreviousBlock = (element: HTMLElement) =>  {
    return getBlockChild(element.parentElement?.previousElementSibling)
}

/**
 * Get next block by given one
 */
export const getNextBlock = (element: HTMLElement) => {
    return getBlockChild(element.parentElement?.nextElementSibling)
} 

const EditableBlock = ({ id, text, addBlock, deleteBlock, updateBlock }: EditableBlockProps ) => {
    const customInput = useRef<HTMLDivElement>(null)
    const [html, setHTML] = useState(text)
    const focus = useRef(true)
    const previousKey = useRef('')
    
    useEffect(() => {
        setBlockFocus(customInput.current!)
    }, [])

    useEffect(() => {
        if (focus.current) {
            customInput.current!.innerText = text
            setBlockFocus(customInput.current!)
        }
        // eslint-disable-next-line
    }, [html])

    const handleChange = () => {
        const value = customInput.current!.innerText.trim()
        updateBlock({ 
            id, 
            text: value
        })
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && previousKey.current !== 'Shift') {
            e.preventDefault()
            addBlock({id, ref: customInput.current!})
        }

        if (e.key === 'Backspace' && !text) {
            e.preventDefault()
            deleteBlock({id, ref: customInput.current!})
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault()
            const previousElement = getPreviousBlock(customInput.current!)

            if (previousElement) {
                setBlockFocus(previousElement)
            }
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            const nextElement = getNextBlock(customInput.current!)

            if (nextElement) {
                setBlockFocus(nextElement)
            }
        }
        
        previousKey.current = e.key
        
    }

    const handleFocus = () => {
        focus.current = true
        setHTML(text)
    }

    const handleBlur = () => {
        focus.current = false
        setHTML( markdown.render(text) )
    }

    return (
        <div className='container'>
            <IconButton 
                className="drag-icon"
                size='small'
            >
                <DragIndicator />
            </IconButton>
            
            <div 
                className="block"
                ref={customInput}
                placeholder="Type something"
                contentEditable
                suppressContentEditableWarning
                onInput={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                dangerouslySetInnerHTML={{ __html: html }}
            />
            
        </div>
    )
}

export default EditableBlock