import { IDocument } from './IDocument'
import { IExcel } from './IExcel'
import { IMatrix, IMatrixUser } from './IMatrix'
import { IQuiz } from './IQuiz'

export interface ICategoriesRequest {
    id: string
    path?: string
}

export interface ICategoriesResponse {
    data: ICategory[]
    documents: IDocument[]
    quiz: IQuiz[]
    excel: IExcel[]
    matrix: IMatrix[]
}

export interface ICategoryResponse {
    data: ICategory
}

export interface ICategory {
    id: string
    type: 'category'
    parentId: string
    name: string
    path: string
    createdAt: string
    icon: string
    observers: IMatrixUser[]
}
