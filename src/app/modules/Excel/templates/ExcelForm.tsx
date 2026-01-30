import { AddCircle as AddCircleIcon } from '@mui/icons-material'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { excelActions } from '../slice'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})

interface Props {
    parent_id?: string
    onClose: () => void
}

export const ExcelForm: React.FC<Props> = ({ parent_id = '0', onClose }) => {
    const dispatch = useDispatch()

    const ref = useRef<HTMLInputElement>(null)

    const handleCapture = ({ target }: any) => {
        let isError = false
        const files: File[] = []

        Array.from(target.files as File[]).forEach((file: File) => {
            const map = file.name.split('.')
            const exp = map[map.length - 1]
            if (
                exp !== 'doc' &&
                exp !== 'docx' &&
                exp !== 'pdf' &&
                exp !== 'pptx' &&
                exp !== 'ppt' &&
                exp !== 'xls' &&
                exp !== 'xlsx'
            ) {
                isError = true
            } else {
                files.push(file)
            }
        })
        if (isError) {
            toast.error('Разрешенный тип файла doc / docx / pdf / pptx / ppt / xls / xlsx', {
                type: 'error',
            })
            return
        }
        dispatch(
            excelActions.createExcel({
                id: '',
                parent_id,
                files,
            })
        )
        onClose()
    }

    const handleClick = (e: any) => {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        ref?.current?.click?.()
    }

    return (
        <ListItem disablePadding onClick={handleClick}>
            <ListItemButton>
                <ListItemIcon>
                    <AddCircleIcon />
                </ListItemIcon>

                <ListItemText primary={'Загрузить Excel/Doc'} />
            </ListItemButton>
            <VisuallyHiddenInput ref={ref} type="file" onChange={handleCapture} multiple />
        </ListItem>
    )
}
