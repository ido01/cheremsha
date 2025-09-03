import { Close as CloseIcon, PhotoCameraOutlined as PhotoCameraOutlinedIcon } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { fileActions } from 'app/modules/File/slice'
import { selectOpen } from 'app/modules/File/slice/selectors'
import { AchieveUploadForm } from 'app/modules/File/templates/AchieveUploadForm'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IAchieve } from 'types/IAchieve'

import { achieveActions } from '../slice'
import { AvatarImage } from './AvatarImage'

interface AvatarFormProps {
    achieve: IAchieve
}

export const AvatarForm: React.FC<AvatarFormProps> = ({ achieve }) => {
    const dispatch = useDispatch()

    const open = useSelector(selectOpen)

    const [isHover, setHover] = useState<boolean>(false)
    const [imageName, setImageName] = useState<string>('')
    const [image, setImage] = useState<string>('')

    const imageSrc = achieve.image?.thumb || ''
    const userName = achieve.label

    const ref = useRef<HTMLInputElement>(null)

    const handleCapture = ({ target }: any) => {
        const fileReader = new FileReader()

        setImageName(target.files[0].name)
        fileReader.readAsDataURL(target.files[0])
        fileReader.onload = (e: any) => {
            setImage(e.target.result)
            dispatch(achieveActions.openEditModal(achieve))
            dispatch(fileActions.openModal())
        }
    }

    const handleChangeImage = () => {
        ref?.current?.click?.()
    }

    const handleRemoveAvatar = () => {
        dispatch(
            achieveActions.openEditModal({
                ...achieve,
                fid: '',
            })
        )
    }

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    width: 'fit-content',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        width: 'fit-content',
                        cursor: 'pointer',
                        borderRadius: '50%',
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={handleChangeImage}
                >
                    <AvatarImage name={userName} image={imageSrc} size={'70px'} />

                    {isHover && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: 0,
                                left: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            }}
                        >
                            <Typography variant="body2" color="white" sx={{ textAlign: 'center', lineHeight: '16px' }}>
                                {imageSrc ? 'Изменить фото' : 'Добавить фото'}
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        right: -1,
                        bottom: -1,
                    }}
                >
                    {imageSrc ? (
                        <IconButton
                            size="small"
                            disableRipple
                            sx={{
                                backgroundColor: 'white',
                                width: '24px',
                                height: '24px',
                                color: 'grey.400',
                                '&:hover': {
                                    color: 'red',
                                },
                            }}
                            onClick={handleRemoveAvatar}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    ) : (
                        <IconButton
                            size="small"
                            disableRipple
                            sx={{
                                backgroundColor: 'white',
                                width: '24px',
                                height: '24px',
                            }}
                        >
                            <PhotoCameraOutlinedIcon fontSize="small" />
                        </IconButton>
                    )}
                </Box>
            </Box>

            <input ref={ref} accept="image/*" id="icon-button-photo" hidden onChange={handleCapture} type="file" />

            {open && <AchieveUploadForm image={image} fileName={imageName} />}
        </>
    )
}
