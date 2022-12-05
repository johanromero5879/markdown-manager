import { 
    useState, 
    useEffect, 
    useRef, 
    KeyboardEvent
} from 'react'
import MarkdownIt from 'markdown-it'

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
    if (element) {
        const range = document.createRange()
        const selection = window.getSelection() as Selection
        range.selectNodeContents(element)
        range.collapse(false)
        selection.removeAllRanges()
        selection.addRange(range)
        element.focus()
    }
}

const md = new MarkdownIt()

const EditableBlock = ({ id, text, addBlock, deleteBlock, updateBlock }: EditableBlockProps ) => {
    const content = useRef<HTMLDivElement | null>(null)
    const [html, setHTML] = useState(text)
    let previousKey = ''

    useEffect(() => {
        setCaretToEnd(content.current!)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (document.activeElement === content.current) {
            content.current!.innerText = text
            setCaretToEnd(content.current!)
        }
        // eslint-disable-next-line
    }, [html])

    const renderHTML = (text: string) => {
        const rendered = md.render(text.replaceAll('\n', '<br>')).replaceAll('&lt;br&gt;', '<br>').trim()
        setHTML(rendered)
    }

    const handleChange = () => {
        const value = (content.current?.innerText+'').trim()
        updateBlock({ 
            id, 
            text: value
        })
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (previousKey !== 'Shift') {
                e.preventDefault()
                addBlock({id, ref: content.current!})
            }
        }

        if (e.key === 'Backspace' && !text) {
            e.preventDefault()
            deleteBlock({id, ref: content.current!})
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault()
            const previousElement = content.current!.previousElementSibling as HTMLElement
            setCaretToEnd(previousElement)
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            const nextElement = content.current!.nextElementSibling as HTMLElement
            setCaretToEnd(nextElement)
        }
        
        previousKey = e.key
    }

    const handleFocus = () => {
        setHTML(text)
    }

    const handleBlur = () => {
        renderHTML(text)
    }

    return (
        <div 
            ref={content}
            contentEditable
            suppressContentEditableWarning
            onInput={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            dangerouslySetInnerHTML={{__html: html}}
        />
    )
}

export default EditableBlock