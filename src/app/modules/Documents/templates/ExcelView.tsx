import React from 'react'
import { useParams } from 'react-router-dom'

import { DocumentsCategoriesList } from './DocumentsCategoriesList'

export const ExcelView: React.FC = () => {
    const { id, eid } = useParams<{ id?: string; eid?: string }>()
    return <DocumentsCategoriesList id={id || '0'} eid={eid} />
}
