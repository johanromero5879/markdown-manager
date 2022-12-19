import { Renderer } from './Renderer'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
    typographer: true
})

// Adding plugins to MarkdownIt
md.use(require('markdown-it-sub'))
md.use(require('markdown-it-sup'))
md.use(require('markdown-it-mark'))

export const MarkdownRenderer: Renderer = { 
    render(text) {
        const listsRegExp = new RegExp("^([0-9]+\\. |[-\\*\\+>`] |```)", "gm")

        // Check if text doesn't have any list, quote or code inside the text
        if (!listsRegExp.test(text)) { 
            text = text.replaceAll('\n', '<br>')
        } else {
            // Look for nested list and replace spaces by \t
            const nestedListsRegExp = new RegExp("^\\s+([0-9]+\\.|[-\\*\\+>])", "gm")
            text = text.replaceAll(nestedListsRegExp, '\t$1')
        }

        return md.render(text).replaceAll('&lt;br&gt;', '<br>').trim()
    },

}
