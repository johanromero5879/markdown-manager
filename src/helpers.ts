export const uid = () => Date.now().toString(36) + Math.random().toString(36).substring(2)

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

export const setCaret = (element: HTMLElement, position: number) => {

    if (element) {
        const range = document.createRange()
        const selection = window.getSelection() as Selection
        
        range.setStart(element.childNodes[0], position)
        range.collapse(true)

        selection.removeAllRanges()
        selection.addRange(range)
    }
}

export const getCaret = (element: HTMLElement) => {
    let caretPosition = 0

    if (element) {
        const selection = window.getSelection() as Selection

        if (selection.rangeCount === 0) {
            return caretPosition
        }
        
        const range = selection.getRangeAt(0)
        const preRange = range.cloneRange()

        preRange.selectNodeContents(element)
        preRange.setEnd(range.endContainer, range.endOffset)
        caretPosition = preRange.toString().length
    }

    return caretPosition
}