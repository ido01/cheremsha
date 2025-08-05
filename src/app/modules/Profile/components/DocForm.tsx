import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { fileActions } from 'app/modules/File/slice'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { IUser } from 'types/IUser'

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

interface DocFormProps {
    profile: IUser
}

export const DocForm: React.FC<DocFormProps> = ({ profile }) => {
    const dispatch = useDispatch()

    const handleCapture = ({ target }: any) => {
        dispatch(fileActions.uploadDoc(target.files[0]))
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography mr={1} variant="caption" color="grey.600">
                Санитарная книжка
            </Typography>
            {profile.doc_file && (
                <Typography mt={1} variant="body3" color="grey.600">
                    {profile.doc_file.name}
                </Typography>
            )}
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Загрузить Санитарную книжку
                <VisuallyHiddenInput type="file" onChange={handleCapture} />
            </Button>
        </Box>
    )
}
