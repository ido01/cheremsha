import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { Box, Collapse, Typography } from '@mui/material'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { TMenuItem } from 'types/TMenuItem'
import { checkAdminAccess } from 'utils/roles'

interface MenuItemProps {
    item: TMenuItem
    isLage?: boolean
    onClick?: () => void
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, isLage, onClick }) => {
    const { pathname: url } = useLocation()
    const isActive =
        item.path === '/profile'
            ? url === '/'
                ? true
                : url.indexOf(item.path) !== -1
            : item.path
            ? url.indexOf(item.path) !== -1
            : false

    const [open, setOpen] = useState<boolean>(true)

    const profileRole = useSelector(selectProfileRole)

    const handleMenuClick = () => {
        if (item.submenus && item.submenus.length > 0) {
            setOpen(!open)
        }
        onClick?.()
    }

    return (
        <>
            {(!item.isAdmin || checkAdminAccess(profileRole)) && (
                <>
                    <Box
                        display={'flex'}
                        mt={1}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        sx={{
                            cursor: 'pointer',
                            color: isActive ? '#FFFFFF' : 'grey.700',
                            textDecoration: 'none',
                            bgcolor: isActive ? '#757575' : 'transparent',
                            border: '1px solidrgb(56, 50, 50)',
                            borderRadius: 8,
                            '&:hover': {
                                color: isActive ? '#FFFFFF' : 'grey.900',
                            },
                        }}
                        component={item.path ? Link : Box}
                        to={item.path || ''}
                        onClick={() => handleMenuClick()}
                    >
                        <Box display={'flex'} alignItems={'center'}>
                            <Box
                                sx={{
                                    p: '12px',
                                    borderRadius: 8,
                                    display: 'flex',
                                    bgcolor: isActive ? '#616161' : '#F5F5F5',
                                }}
                            >
                                {item.icon}
                            </Box>

                            {isLage && (
                                <Typography variant="body1" sx={{ ml: item.icon ? 2 : 5, whiteSpace: 'nowrap' }}>
                                    {item.title}
                                </Typography>
                            )}
                        </Box>

                        {item.submenus && item.submenus.length > 0 && (
                            <>{open ? <ExpandMoreIcon /> : <ExpandLessIcon />}</>
                        )}
                    </Box>

                    {item.submenus && item.submenus.length > 0 && (
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            {item.submenus?.map((item, index) => (
                                <MenuItem key={index} item={item} />
                            ))}
                        </Collapse>
                    )}
                </>
            )}
        </>
    )
}
