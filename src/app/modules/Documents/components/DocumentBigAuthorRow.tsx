import { Box, Typography } from '@mui/material'
import { LabelText } from 'app/components/LabelText'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import React from 'react'
import { IDocument } from 'types/IDocument'

interface DocumentBigAuthorRowProps {
    item: IDocument
}

export const DocumentBigAuthorRow: React.FC<DocumentBigAuthorRowProps> = ({ item }) => (
    <Box
        sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
        }}
    >
        <LabelText
            label="Задачу поставил"
            node={
                item.author && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AvatarImage
                            name={`${item.author.last_name} ${item.author.name}`}
                            image={item.author.avatar?.thumb}
                            size={'24px'}
                        />

                        <Typography variant="body1" color="grey.900" sx={{ ml: 1 }}>
                            {item.author.last_name} {item.author.name}
                        </Typography>
                    </Box>
                )
            }
        />
    </Box>
)
