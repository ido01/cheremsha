import React from 'react'
import { useParams } from 'react-router-dom'

import { DocumentsCategoriesList } from './DocumentsCategoriesList'

export const CategoriesView: React.FC = () => {
    const { id } = useParams<{ id?: string }>()
    return <DocumentsCategoriesList id={id || '0'} />
}
