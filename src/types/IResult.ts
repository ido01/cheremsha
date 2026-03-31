import { IDocument } from './IDocument'
import { IQuiz } from './IQuiz'
import { IUser } from './IUser'

export interface IResultResponse {
    data: IQuiz
    user: IUser
}

export interface IDocumentResultResponse {
    data: IDocument
    user: IUser
}
