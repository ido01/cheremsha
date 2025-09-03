import { Box, Grid, IconButton } from '@mui/material'
import { ReactComponent as DndSVG } from 'assets/icons/DND.svg'
import React from 'react'
import { TTableRowData } from 'types/ITableDisplay'

import { TableRow } from './TableRow'

interface DragTableItemProps {
    index: number
    item: any
    rows: TTableRowData[]
    isDraggable?: boolean
    disableBorder?: boolean
    fullBorder?: boolean
    isMobile?: boolean
    mobileView?: (data: any) => React.ReactNode
    handleClickRow?: (data: any) => void
}

export const DragTableItem: React.FC<DragTableItemProps> = ({
    index,
    item,
    rows,
    isDraggable,
    fullBorder,
    isMobile,
    mobileView,
    handleClickRow,
}) => {
    return (
        <Box
            key={item.id}
            sx={{
                mt: { xs: 1, md: fullBorder ? 1 : 0 },
                bgcolor: '#FDFDFD',
                borderRadius: 8,
                cursor: handleClickRow ? 'pointer' : 'default',
                border: '1px solid #F5F5F5',
                boxShadow: '0px 1px 1px #3332',
                p: isMobile ? 1 : 0,
                '&:hover': handleClickRow
                    ? {
                          bgcolor: '#F4F6FB',
                      }
                    : undefined,
            }}
            onClick={(e) => {
                if (e.target instanceof Element) {
                    if (e.target.tagName.toLowerCase() !== 'svg' && e.target.tagName.toLowerCase() !== 'button') {
                        handleClickRow?.(item)
                    }
                } else {
                    handleClickRow?.(item)
                }
            }}
        >
            <Box display={'flex'} alignItems={'center'} minHeight={'56px'} py={1.25} px={{ md: 2 }}>
                {(!isMobile || !mobileView) && (
                    <Grid container columnSpacing={2}>
                        {rows.map((row, i) => (
                            <React.Fragment key={i}>
                                {row.xs ? (
                                    <Grid item xs={row.xs} md={row.md || row.xs}>
                                        <TableRow>
                                            {!i && isDraggable && (
                                                <Box>
                                                    <IconButton>
                                                        <DndSVG />
                                                    </IconButton>
                                                </Box>
                                            )}
                                            {row.element(item, index)}
                                        </TableRow>
                                    </Grid>
                                ) : (
                                    <Grid item xs>
                                        <TableRow>
                                            {!i && isDraggable && (
                                                <Box>
                                                    <IconButton>
                                                        <DndSVG />
                                                    </IconButton>
                                                </Box>
                                            )}
                                            {row.element(item, index)}
                                        </TableRow>
                                    </Grid>
                                )}
                            </React.Fragment>
                        ))}
                    </Grid>
                )}

                {isMobile && mobileView && <>{mobileView(item)}</>}
            </Box>
        </Box>
    )
}
