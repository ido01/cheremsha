import { EStatus } from 'types'

export interface IDocumentPoint {
    id: string
    document_id: string
    place_id: string
    status: EStatus
    endAt: string
    name: string
}
