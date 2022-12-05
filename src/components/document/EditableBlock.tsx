import { useState, useEffect, createRef, useRef, KeyboardEvent, FocusEvent } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import MarkdownIt from 'markdown-it'

import { Block } from '../../hooks/useBlocks'
import { setCaretToEnd, setCaret } from '../../helpers'

export interface RefBlock {
    id: string,
    ref: HTMLElement
}

interface RefBlockFunc {
    ({id, ref}: RefBlock): void
}

interface EditableBlockProps {
    id: string,
    addBlock: RefBlockFunc,
    deleteBlock: RefBlockFunc,
    updateBlock: (block: Block) => void
}

const md = new MarkdownIt()

const EditableBlock = ({ id, addBlock, deleteBlock, updateBlock }: EditableBlockProps ) => {
    const content = createRef<HTMLElement>()
    const [state, setState] = useState({ id, html: '', text: '', tag: 'div' })
    let previousKey = ''

    useEffect(() => {
        setCaretToEnd(content.current as HTMLElement)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        updateBlock({ id: state.id, text: state.text })
        // eslint-disable-next-line
    }, [state])

    const render = (text: string) => {
        text = text.replaceAll('\\\n', '<br>')
        return md.render(text).replaceAll('&lt;br&gt;', '<br>')
    }

    const onChangeHandler = (e: ContentEditableEvent) => {
        const value = e.target.value
        setState({
            ...state, 
            html: value, 
            text: value.replace('<br>', '\\\n'),
        })
    }

    const onKeyDownHandler = (e: KeyboardEvent) => {

        if (e.key === 'Enter') {
            if (previousKey !== 'Shift') {
                e.preventDefault()
                addBlock({id, ref: content.current as HTMLElement})
            }
        }

        if (e.key === 'Backspace' && !state.html) {
            e.preventDefault()
            deleteBlock({id, ref: content.current as HTMLElement})
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault()
            const previousElement = content.current?.previousElementSibling as HTMLElement
            setCaretToEnd(previousElement)
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            const nextElement = content.current?.nextElementSibling as HTMLElement
            setCaretToEnd(nextElement)
        }
        
        previousKey = e.key
    }

    const onFocusHandler = (e: FocusEvent) => {
        setState({...state, html: state.text})
    }

    const onBlurHandler = (e: FocusEvent) => {
        setState({...state, html: render(state.text)})
    }

    return (
        <ContentEditable 
            innerRef={content}
            html={state.html}
            tagName={state.tag}
            onKeyDown={onKeyDownHandler}
            onChange={onChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
        />
    )
}

export default EditableBlock