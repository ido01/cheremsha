import { Add as AddIcon, Close as CloseIcon, Remove as RemoveIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Drawer, Grid, IconButton, Paper, Slider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { cropImage } from 'utils/cropImage'

import { fileActions } from '../slice'
import { selectOpen, selectStatus } from '../slice/selectors'

type CropperFix = React.Component

const Cropped = Cropper as any as {
    new (): CropperFix
}

interface FileUploadFormProps {
    image: string
    fileName: string
}

export const AchieveUploadForm: React.FC<FileUploadFormProps> = ({ image, fileName }) => {
    const dispatch = useDispatch()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const status = useSelector(selectStatus)
    const open = useSelector(selectOpen)

    const step = 0.1
    const maxZoom = 3
    const minZoom = 1

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [cropComplete, setCropComplete] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    })
    const [zoom, setZoom] = useState<number>(1)

    const handleCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCropComplete(croppedAreaPixels)
    }

    const handleClose = () => {
        dispatch(fileActions.hideModal())
    }

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setZoom(newValue)
        }
    }

    const handleZoomMinus = () => {
        setZoom(zoom > minZoom ? zoom - step : zoom)
    }

    const handleZoomAdd = () => {
        setZoom(zoom < maxZoom ? zoom + step : zoom)
    }

    const handleCropImage = () => {
        dispatch(fileActions.statusPending())

        cropImage({
            ...cropComplete,
            image,
            fileName,
        }).then((image) => {
            dispatch(fileActions.uploadAchiveImage(image))
        })
    }

    const cropProps = {
        image,
        crop,
        zoom,
        aspect: 1,
        maxZoom,
        cropShape: 'round',
        onCropChange: setCrop,
        onCropComplete: handleCropComplete,
        onZoomChange: setZoom,
    }

    return (
        <Drawer
            anchor={'bottom'}
            open={open}
            PaperProps={{
                sx: {
                    width: '100%',
                    height: 'calc(100% - 40px)',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    // maxWidth: { xs: '100%', md: '50%' },
                },
            }}
            onClose={handleClose}
        >
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    height: '100%',
                    p: isMobile ? 2 : 5,
                    pb: 5,
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="h5" fontWeight={500}>
                            Загрузка фотографии
                        </Typography>

                        <IconButton sx={{ mr: -1 }} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Box mt={6.25} position={'relative'} height={'300px'} sx={{ flex: '1 0 auto' }}>
                        <Cropped {...cropProps} />
                    </Box>

                    <Stack spacing={2} direction="row" sx={{ mt: 5 }} alignItems="center">
                        <IconButton edge="start" onClick={handleZoomMinus}>
                            <RemoveIcon color={'primary'} />
                        </IconButton>

                        <Slider
                            aria-label="Volume"
                            value={zoom}
                            min={minZoom}
                            step={step}
                            max={maxZoom}
                            onChange={handleSliderChange}
                        />

                        <IconButton edge="end" onClick={handleZoomAdd}>
                            <AddIcon color={'primary'} />
                        </IconButton>
                    </Stack>

                    <Grid container sx={{ mt: 6.25 }}>
                        <Grid item xs={9}>
                            <LoadingButton
                                loading={status === EStatus.PENDING}
                                fullWidth
                                size="large"
                                color="primary"
                                variant="contained"
                                onClick={handleCropImage}
                            >
                                Сохранить
                            </LoadingButton>
                        </Grid>
                        <Grid display={'flex'} justifyContent={'flex-end'} alignItems={'center'} item xs={3}>
                            <LoadingButton onClick={handleClose}>Отмена</LoadingButton>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Drawer>
    )
}
