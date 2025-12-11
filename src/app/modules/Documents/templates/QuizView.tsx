import React from 'react'
import { useParams } from 'react-router-dom'

import { DocumentsCategoriesList } from './DocumentsCategoriesList'

export const QuizView: React.FC = () => {
    const { id, qid } = useParams<{ id?: string; qid?: string }>()
    return <DocumentsCategoriesList id={id || '0'} qid={qid} />
}
