import { useState } from 'react'
import { flushSync } from 'react-dom'
import { uid } from '../helpers'

export interface Block {
    id: string,
    text: string
}

const useBlocks = () => {
    const [blocks, setBlocks] = useState<Block[]>([{id: uid(), text: ''}])

    const addBlock = (currentID: string) => {
        const newBlock = { id: uid(), text: '' }
        const updatedBlocks = [...blocks]

        const index = blocks.map(block => block.id).indexOf(currentID)
        updatedBlocks.splice(index + 1, 0, newBlock)

        flushSync(() => setBlocks(updatedBlocks))
    }

    const updateBlock = (updatedBlock: Block) => {

        const index = blocks.map(block => block.id).indexOf(updatedBlock.id)

        const updatedBlocks = [...blocks]
        updatedBlocks[index] = updatedBlock

        setBlocks(updatedBlocks)
    }

    const deleteBlock = (currentID: string) => {
        if (blocks.length > 1) {
            const updatedBlocks = blocks.filter(block => block.id !== currentID)
            setBlocks(updatedBlocks)
        }
    }

    return {blocks, addBlock, deleteBlock, updateBlock}
}

export default useBlocks