import { ArrowBack as ArrowBackIcon, Search as SearchIcon } from '@mui/icons-material'
import { Box, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs'

export interface TitleBlockProps {
    title: string
    searchDisabled?: boolean
    count?: number
    breadcrumbs?: BreadcrumbItem[]
    breadcrumbsItemsMobile?: BreadcrumbItem
    value?: string
    endNode?: React.ReactNode
    startNode?: React.ReactNode
    afterTitleNode?: React.ReactNode
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
    startNode,
    afterTitleNode,
    onSearch,
}) => {
    const history = useNavigate()
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
                    borderRadius: 4,
                    bgcolor: '#CDCDCD30',
                    border: '1px solid #EEEEEE',
                    p: 1,
                    pl: !!breadcrumbsItemsMobile?.link && isMobile ? 2 : 3,
                    m: 1,
                    backdropFilter: 'blur(4px)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box
                    display={'flex'}
                    alignItems={'flex-start'}
                    sx={{ minHeight: '44px', maxWidth: !endNode ? 'calc(100%)' : 'calc(100% - 44px)' }}
                >
                    <Box display={'flex'} alignItems={'center'} sx={{ minHeight: '44px', maxWidth: 'calc(100%)' }}>
                        {!!breadcrumbs && !isMobile && breadcrumbs.length > 1 && <Breadcrumbs items={breadcrumbs} />}
                        {!!breadcrumbsItemsMobile?.link && isMobile && (
                            <IconButton
                                sx={{ mr: 0.5, bgcolor: '#FDFDFD90' }}
                                aria-label={breadcrumbsItemsMobile.text}
                                aria-haspopup="true"
                                onClick={() => {
                                    if (breadcrumbsItemsMobile.link) {
                                        history(breadcrumbsItemsMobile.link)
                                    }
                                }}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                        )}

                        <Box display="flex" gap={1}>
                            {startNode}

                            <Typography
                                variant={isMobile ? 'h5' : 'h4'}
                                fontWeight={700}
                                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                            >
                                {title}
                            </Typography>

                            {afterTitleNode}
                        </Box>

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
                                border: '1px solid #B0BEC5',
                            }}
                            InputProps={{
                                disableUnderline: true,
                                startAdornment: <SearchIcon style={{ color: '#c7c7cc' }} />,
                                sx: {
                                    borderRadius: '32px',
                                    backgroundColor: '#fff',
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
