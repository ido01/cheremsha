import { Box, Typography } from '@mui/material'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import React from 'react'
import { IReview } from 'types/IReview'

interface CommentViewProps {
    review: IReview
}

export const CommentView: React.FC<CommentViewProps> = ({ review }) => {
    return (
        <Box
            sx={{
                borderTop: '1px solid #E0E0E0',
                py: 1,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                }}
            >
                {review.user ? (
                    <AvatarImage
                        name={`${review.user.last_name} ${review.user.name}`}
                        image={review.user.avatar?.thumb}
                        size={42}
                        achieve={review.user.achieve}
                    />
                ) : (
                    <AvatarImage name={`Антоним`} size={42} />
                )}

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0,
                    }}
                >
                    {review.user ? (
                        <Typography
                            variant="body3"
                            fontWeight={600}
                        >{`${review.user.last_name} ${review.user.name}`}</Typography>
                    ) : (
                        <Typography variant="body3" fontWeight={600}>{`Антоним`}</Typography>
                    )}
                    <Typography variant="body1" color="grey.900">
                        {review.description}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
