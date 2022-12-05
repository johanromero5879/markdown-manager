// import Markdown from 'react-markdown'
import { 
    Card,
    // Divider,
    // InputBase,
    // FormControl
} from '@mui/material'

import useBlocks from '../../hooks/useBlocks'
import EditableBlock, { RefBlock } from './EditableBlock'
import { setCaretToEnd } from '../../helpers'

const EditorDocument = () => {
    const { blocks, addBlock, deleteBlock, updateBlock } = useBlocks()

    const addBlockHandler = (currentBlock: RefBlock) => {
        addBlock(currentBlock.id)
    }

    const deleteBlockHandler = (currentBlock: RefBlock) => {
        const previousElement = currentBlock.ref?.previousElementSibling as HTMLElement
        setCaretToEnd(previousElement)

        deleteBlock(currentBlock.id)
    }

    return <div className="markdown-container">
        <Card className="markdown-card">
            {
                blocks.map((block) => (
                    <EditableBlock 
                        key={block.id}
                        id={block.id}
                        addBlock={addBlockHandler}
                        deleteBlock={deleteBlockHandler}
                        updateBlock={updateBlock}
                    />
                ))
            }
            
        </Card>
    </div>
}

export default EditorDocument