import { ArrowBack as ArrowBackIcon, Search as SearchIcon } from '@mui/icons-material'
import { Box, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs'

export interface TitleBlockProps {
    title: string
    searchDisabled?: boolean
    count?: number
    breadcrumbs?: BreadcrumbItem[]
    breadcrumbsItemsMobile?: BreadcrumbItem
    value?: string
    endNode?: React.ReactNode
    onSearch?: (query: string) => void
}

export const TitleBlock: React.FC<TitleBlockProps> = ({
    title,
    searchDisabled,
    count,
    breadcrumbs,
    breadcrumbsItemsMobile,
    value = '',
    endNode,
    onSearch,
}) => {
    const history = useHistory()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
    const [search, setSearch] = useState<string>(value)

    const handleSearchChange = (e: any) => {
        const { value } = e.target
        setSearch(value)

        if (timer) {
            clearTimeout(timer)
        }

        setTimer(
            setTimeout(() => {
                onSearch?.(value)
            }, 300)
        )
    }

    return (
        <Box position={'absolute'} top={0} width={'100%'} zIndex={2}>
            <Box
                display={'flex'}
                flexShrink={0}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                    borderRadius: 8,
                    bgcolor: '#FDFDFD30',
                    boxShadow: '0px 4px 4px #3332',
                    p: 1,
                    pl: !!breadcrumbsItemsMobile?.link && isMobile ? 1 : 3,
                    m: { sm: 1, md: 0.5 },
                    backdropFilter: 'blur(4px)',
                }}
            >
                <Box display={'flex'} alignItems={'flex-start'}>
                    <Box display={'flex'} alignItems={'center'} sx={{ minHeight: '44px' }}>
                        {!!breadcrumbs && !isMobile && breadcrumbs.length > 1 && <Breadcrumbs items={breadcrumbs} />}
                        {!!breadcrumbsItemsMobile?.link && isMobile && (
                            <IconButton
                                sx={{ mr: 1, bgcolor: '#FDFDFD90' }}
                                aria-label={breadcrumbsItemsMobile.text}
                                aria-haspopup="true"
                                onClick={() => {
                                    if (breadcrumbsItemsMobile.link) {
                                        history.push(breadcrumbsItemsMobile.link)
                                    }
                                }}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                        )}

                        <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight={700}>
                            {title}
                        </Typography>

                        {!!count && (
                            <Typography variant={isMobile ? 'h6' : 'h5'} ml={1} fontWeight={400} color="grey.400">
                                {count?.toLocaleString()}
                            </Typography>
                        )}
                    </Box>
                </Box>

                <Box display={'flex'}>
                    {!searchDisabled && !isMobile && (
                        <TextField
                            fullWidth
                            placeholder={'Поиск'}
                            variant="filled"
                            value={search || ''}
                            onChange={handleSearchChange}
                            sx={{
                                borderRadius: 8,
                                overflow: 'hidden',
                            }}
                            InputProps={{
                                disableUnderline: true,
                                startAdornment: <SearchIcon style={{ color: '#c7c7cc' }} />,
                                sx: {
                                    borderRadius: '32px',
                                },
                            }}
                        />
                    )}

                    {!!endNode && endNode}
                </Box>
            </Box>

            {/* {!!breadcrumbsItemsMobile && isMobile && breadcrumbsItemsMobile.length > 0 && (
                <Box px={2} py={1.5} sx={{ bgcolor: 'white', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.08)', zIndex: 1 }}>
                    <Breadcrumbs items={breadcrumbsItemsMobile} />
                </Box>
            )} */}
        </Box>
    )
}
