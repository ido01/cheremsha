import {
    DesignServices as DesignServicesIcon,
    Percent as PercentIcon,
    Poll as PollIcon,
    Quiz as QuizIcon,
    School as SchoolIcon,
    StackedLineChart as StackedLineChartIcon,
} from '@mui/icons-material'
import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material'
import { ITile, Tile } from 'app/components/Tile'
import { TitleBlock } from 'app/components/TitleBlock'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ERole } from 'types'

export const DocumentsList: React.FC = () => {
    const history = useHistory()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const profileRole = useSelector(selectProfileRole)

    const links: ITile[] = isMobile
        ? [
              {
                  icon: <QuizIcon fontSize="large" />,
                  title: 'Гайд',
                  path: '/faq',
              },
              {
                  icon: <SchoolIcon fontSize="large" />,
                  title: 'Обучение',
                  path: '/school',
              },
              {
                  icon: <StackedLineChartIcon fontSize="large" />,
                  title: 'Мотивация',
                  path: '/motivation',
              },
              {
                  icon: <PercentIcon fontSize="large" />,
                  title: 'Акции',
                  path: '/actions',
              },
              {
                  icon: <DesignServicesIcon fontSize="large" />,
                  title: 'Тестирование',
                  path: '/quiz',
              },
          ]
        : [
              {
                  icon: <QuizIcon fontSize="large" />,
                  title: 'Гайд',
                  path: '/faq',
              },
              {
                  icon: <SchoolIcon fontSize="large" />,
                  title: 'Обучение',
                  path: '/school',
              },
              {
                  icon: <StackedLineChartIcon fontSize="large" />,
                  title: 'Мотивация',
                  path: '/motivation',
              },
              {
                  icon: <PercentIcon fontSize="large" />,
                  title: 'Акции',
                  path: '/actions',
              },
          ]
    if (profileRole === ERole.ADMIN && isMobile) {
        links.push({
            icon: <PollIcon fontSize="large" />,
            title: 'Опрос',
            path: '/polls',
        })
    }

    const handleClickRow = (item: ITile) => {
        history.push(item.path)
    }

    return (
        <>
            <TitleBlock title={'Документы'} searchDisabled />

            <Box
                flex="1 0 100%"
                sx={{
                    pt: 2,
                    pb: 1,
                    bgcolor: isMobile ? 'grey.200' : 'grey.50',
                    overflow: 'auto',
                    maxHeight: { md: 'calc( 100vh - 90px )' },
                }}
            >
                <Container>
                    <Grid container spacing={2}>
                        {links.map((link, index) => (
                            <Grid item key={index} xs={isMobile ? 6 : 3}>
                                <Tile data={link} onClick={handleClickRow} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    )
}
