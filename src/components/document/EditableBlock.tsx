import { 
    useState, 
    useEffect, 
    useRef, 
    KeyboardEvent
} from 'react'
import { MarkdownRenderer as markdown } from '../../services/MarkdownRenderer'

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

export const setCaretToEnd = (element: HTMLElement) => {
    const range = document.createRange()
    const selection = window.getSelection() as Selection
    range.selectNodeContents(element)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
    element.focus()
}

const EditableBlock = ({ id, text, addBlock, deleteBlock, updateBlock }: EditableBlockProps ) => {
    const customInput = useRef<HTMLDivElement | null>(null)
    const [html, setHTML] = useState(text)
    const [focus, setFocus] = useState(true)

    let previousKey = ''

    useEffect(() => {
        setCaretToEnd(customInput.current!)
    }, [])

    useEffect(() => {
        if (focus) {
            customInput.current!.innerText = text
            setCaretToEnd(customInput.current!)
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
        if (e.key === 'Enter' && previousKey !== 'Shift') {
            e.preventDefault()
            addBlock({id, ref: customInput.current!})
        }

        if (e.key === 'Backspace' && !text) {
            e.preventDefault()
            deleteBlock({id, ref: customInput.current!})
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault()
            const previousElement = customInput.current!.previousElementSibling as HTMLElement

            if (previousElement?.classList.contains('block')) {
                setCaretToEnd(previousElement)
            }
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            const nextElement = customInput.current!.nextElementSibling as HTMLElement

            if (nextElement?.classList.contains('block')) {
                setCaretToEnd(nextElement)
            }
        }
        
        previousKey = e.key
    }

    const handleFocus = () => {
        setFocus(true)
        setHTML(text)
    }

    const handleBlur = () => {
        setFocus(false)
        setHTML( markdown.render(text) )
    }

    return (
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
    )
}

export default EditableBlock