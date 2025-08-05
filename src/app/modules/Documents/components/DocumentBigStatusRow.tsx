import { Drafts as DraftsIcon, NewReleases as NewReleasesIcon, TaskAlt as TaskAltIcon } from '@mui/icons-material'
import Check from '@mui/icons-material/Check'
import { Box, CircularProgress, Step, StepLabel, Stepper } from '@mui/material'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import { styled } from '@mui/material/styles'
import React from 'react'
import { EStatus } from 'types'

interface DocumentBigStatusRowProps {
    status: EStatus
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 12,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient( 95deg,#00A609 0%,#00B612 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient( 95deg,#00A609 0%,#00B612 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}))

const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean; isError?: boolean }
}>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.grey[400],
    zIndex: 1,
    color: 'white',
    width: 28,
    height: 28,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage: ownerState.isError
            ? 'linear-gradient( 136deg, #FF0000 0%, #DD1111 50%, #CC2222 100%)'
            : 'linear-gradient( 136deg, #00B612 0%, #00A609 50%, #00B612 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage: ownerState.isError
            ? 'linear-gradient( 136deg, #FF0000 0%, #DD1111 50%, #CC2222 100%)'
            : 'linear-gradient( 136deg, #00B612 0%, #00A609 50%, #00B612 100%)',
    }),
}))

function ColorlibStepIcon(props: StepIconProps, isError: boolean) {
    const { active, completed, className } = props

    const icons: { [index: string]: React.ReactElement } = {
        1: isError ? <NewReleasesIcon fontSize="small" /> : <DraftsIcon fontSize="small" />,
        2: <CircularProgress size={20} color="inherit" disableShrink={!active} />,
        3: <TaskAltIcon fontSize="small" />,
    }

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active, isError }} className={className}>
            {completed ? <Check className="QontoStepIcon-completedIcon" /> : icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    )
}

export const DocumentBigStatusRow: React.FC<DocumentBigStatusRowProps> = ({ status }) => {
    const step = status === EStatus.INITIAL || status === EStatus.ERROR ? 0 : status === EStatus.PENDING ? 1 : 2
    const steps =
        status === EStatus.ERROR
            ? ['Обратить внимание', 'В процессе выполнения', 'Выполнена']
            : ['Новая задача', 'В процессе выполнения', 'Выполнена']
    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={(props) => ColorlibStepIcon(props, status === EStatus.ERROR)}>
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
}
