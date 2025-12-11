import React from 'react'
import { useParams } from 'react-router-dom'

import { DocumentsCategoriesList } from './DocumentsCategoriesList'

export const DocumentView: React.FC = () => {
    const { id, did } = useParams<{ id?: string; did?: string }>()
    return <DocumentsCategoriesList id={id || '0'} did={did} />
}
