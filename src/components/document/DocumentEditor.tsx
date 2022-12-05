import { 
    Card
} from '@mui/material'

import useBlocks from '../../hooks/useBlocks'
import EditableBlock, { RefBlock,setCaretToEnd} from './EditableBlock'

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
                        text={block.text}
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