import Table from 'app/components/Table'
import { CategoryDateRow } from 'app/modules/Categories/components/CategoryDateRow'
import { CategoryNameRow } from 'app/modules/Categories/components/CategoryNameRow'
import { MobileCategoryView } from 'app/modules/Categories/components/MobileCategoryView'
import {
    selectCategories,
    selectOrder,
    selectSearchCategories,
    selectStatus as selectCategoryStatus,
} from 'app/modules/Categories/slice/selectors'
import { DocumentDateRow } from 'app/modules/Documents/components/DocumentDateRow'
import { DocumentNameRow } from 'app/modules/Documents/components/DocumentNameRow'
import { DocumentStatusRow } from 'app/modules/Documents/components/DocumentStatusRow'
import { MobileDocumentView } from 'app/modules/Documents/components/MobileDocumentView'
import { documentsActions } from 'app/modules/Documents/slice'
import { selectDocuments, selectSearchDocuments, selectStatus } from 'app/modules/Documents/slice/selectors'
import { MobileQuizView } from 'app/modules/Quiz/components/MobileQuizView'
import { QuizDateRow } from 'app/modules/Quiz/components/QuizDateRow'
import { QuizNameRow } from 'app/modules/Quiz/components/QuizNameRow'
import { QuizStatusRow } from 'app/modules/Quiz/components/QuizStatusRow'
import { quizActions } from 'app/modules/Quiz/slice'
import { selectQuiz, selectSearchQuiz } from 'app/modules/Quiz/slice/selectors'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { EState, EStatus } from 'types'
import { ICategory } from 'types/ICategory'
import { IDocument } from 'types/IDocument'
import { IQuiz } from 'types/IQuiz'
import { EQuizState } from 'types/IQuizState'
import { TTableOrder, TTableRowData } from 'types/ITableDisplay'

import { categoriesActions } from '../slice'

interface CategoriesListProps {
    id: string
    did?: string
    qid?: string
    search?: string
}

export const CategoriesList: React.FC<CategoriesListProps> = ({ id, search, did, qid }) => {
    const dispatch = useDispatch()
    const history = useNavigate()

    const status = useSelector(selectStatus)
    const categoryStatus = useSelector(selectCategoryStatus)
    const getCategories = useSelector(selectCategories)
    const searchCategories = useSelector(selectSearchCategories)
    const getDocuments = useSelector(selectDocuments)
    const searchDocuments = useSelector(selectSearchDocuments)
    const getQuiz = useSelector(selectQuiz)
    const searchQuiz = useSelector(selectSearchQuiz)
    const order = useSelector(selectOrder)

    const categories = !search ? getCategories(id || '0') : searchCategories(search, id)
    const documents = !search ? getDocuments(id || '0') : searchDocuments(search, id)
    const quiz = !search ? getQuiz(id || '0') : searchQuiz(search, id || '0')

    useEffect(() => {
        if (did && status === EStatus.FINISHED && categoryStatus === EStatus.FINISHED) {
            dispatch(documentsActions.setActiveId(did))
            dispatch(documentsActions.showModal())
        } else if (!did) {
            dispatch(documentsActions.hideModal())
        }
    }, [did, status, categoryStatus])

    useEffect(() => {
        if (qid && status === EStatus.FINISHED && categoryStatus === EStatus.FINISHED) {
            dispatch(quizActions.setActiveId(qid))
            dispatch(quizActions.showModal())
        } else if (!qid) {
            dispatch(quizActions.hideModal())
        }
    }, [qid, status, categoryStatus])

    const stateSort: (EState | EQuizState)[] = [
        EState.REJECTED,
        EState.PENDING,
        EState.INITIAL,
        EState.COMPLETED,
        EQuizState.DONE,
        EQuizState.INITIAL,
        EQuizState.REJECTED,
        EQuizState.CLOSED,
        EQuizState.COMPLETED,
        EQuizState.PENDING,
    ]
    const quizSort = [...quiz].sort((a, b) => {
        if (order.row === 'status') {
            if (order.order === 'desc') {
                if (stateSort.indexOf(a.state.state) < stateSort.indexOf(b.state.state)) return -1
                return 1
            } else {
                if (stateSort.indexOf(a.state.state) > stateSort.indexOf(b.state.state)) return -1
                return 1
            }
        } else if (order.row === 'createdAt') {
            if (order.order === 'desc') {
                if (moment(a.createdAt).unix() > moment(b.createdAt).unix()) return -1
                return 1
            } else {
                if (moment(a.createdAt).unix() < moment(b.createdAt).unix()) return -1
                return 1
            }
        }
        return 1
    })

    const documentsSort = [...documents].sort((a, b) => {
        if (order.row === 'status') {
            if (order.order === 'desc') {
                if (stateSort.indexOf(a.state.state) < stateSort.indexOf(b.state.state)) return -1
                return 1
            } else {
                if (stateSort.indexOf(a.state.state) > stateSort.indexOf(b.state.state)) return -1
                return 1
            }
        } else if (order.row === 'createdAt') {
            if (order.order === 'desc') {
                if (moment(a.createdAt).unix() > moment(b.createdAt).unix()) return -1
                return 1
            } else {
                if (moment(a.createdAt).unix() < moment(b.createdAt).unix()) return -1
                return 1
            }
        }
        return 1
    })

    const items = [...categories, ...documentsSort, ...quizSort]

    const tableRows: TTableRowData[] = [
        {
            title: 'Название',
            name: 'name',
            xs: 6,
            element: (item: ICategory | IDocument | IQuiz) => (
                <>
                    {item.type === 'category' && <CategoryNameRow item={item} />}

                    {item.type === 'document' && <DocumentNameRow item={item} />}

                    {item.type === 'quiz' && <QuizNameRow item={item} />}
                </>
            ),
        },
        {
            title: 'Дата создания',
            name: 'createdAt',
            isSort: true,
            xs: 3,
            element: (item: ICategory | IDocument | IQuiz) => (
                <>
                    {item.type === 'document' && <DocumentDateRow item={item} />}

                    {item.type === 'category' && <CategoryDateRow item={item} />}

                    {item.type === 'quiz' && <QuizDateRow item={item} />}
                </>
            ),
        },
        {
            title: 'Статус',
            name: 'status',
            isSort: true,
            xs: 3,
            element: (item: ICategory | IDocument | IQuiz) => (
                <>
                    {item.type === 'document' && <DocumentStatusRow item={item} />}

                    {item.type === 'quiz' && <QuizStatusRow item={item} />}
                </>
            ),
        },
    ]

    const mobileView = (item: ICategory | IDocument | IQuiz) => (
        <>
            {item.type === 'category' && <MobileCategoryView item={item} />}

            {item.type === 'document' && <MobileDocumentView item={item} />}

            {item.type === 'quiz' && <MobileQuizView item={item} />}
        </>
    )

    const handleOrderChange = (order: TTableOrder) => {
        dispatch(categoriesActions.setOrder(order))
    }

    const handleClickRow = (item: ICategory | IDocument | IQuiz) => {
        item.type === 'category' && history(`/doc/${item.id}`)

        if (item.type === 'document') {
            history(`/doc/${id}/document/${item.id}`)
        }

        if (item.type === 'quiz') {
            history(`/doc/${id}/quiz/${item.id}`)
        }
    }

    return (
        <Table
            items={items}
            rows={tableRows}
            order={order}
            isLoading={status === EStatus.PENDING || categoryStatus === EStatus.PENDING}
            handleOrderChange={handleOrderChange}
            // handleLimitChange={handleLimitChange}
            // handlePageChange={handlePageChange}
            mobileView={mobileView}
            handleClickRow={handleClickRow}
        />
    )
}
