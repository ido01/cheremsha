import DoneIcon from '@mui/icons-material/Done'
import { Box } from '@mui/material'
import React, { useState } from 'react'

import styles from '../styles/styles.module.css'

export const Square: React.FC = () => {
    const [isOpen, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(true)
    }

    return (
        <>
            {!isOpen && (
                <div className={styles.square} onClick={handleClick}>
                    <div className={styles.body}></div>
                </div>
            )}

            {isOpen && (
                <div className={styles.position}>
                    <div className={styles.loader}>
                        <div className={styles.content}>
                            <div className={styles.done}>
                                <DoneIcon sx={{ color: '#fff' }} />
                            </div>

                            <div>1 секрет из 100</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
