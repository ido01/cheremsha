import { Box } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import { selectSettings } from 'app/modules/Settings/slice/selectors'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

interface TextAreaEditProps {
    value: string
    onChange: (e: string) => void
}

export const TextAreaEdit: React.FC<TextAreaEditProps> = ({ value, onChange }) => {
    const settings = useSelector(selectSettings)

    const handleEditorChange = (content: string) => {
        onChange(content)
    }

    useEffect(() => {
        document.addEventListener('focusin', (e: FocusEvent) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (e.target?.closest('.tox-tinymce, .tox-tinymce-aux, .moxman-window, .tam-assetmanager-root') !== null) {
                e.stopImmediatePropagation()
            }
        })
    }, [])

    return (
        <Box width="100%">
            <Editor
                apiKey={settings.tinymce || 'xnk50yfbqv537gxly6kuu0okwlx0zxqqalzvhtkwkjqk96hp'}
                initialValue={value}
                init={{
                    height: 300,
                    menubar: false,
                    // plugins: [
                    //     'advlist autolink lists link image charmap print preview anchor',
                    //     'searchreplace visualblocks code fullscreen textcolor ',
                    //     'insertdatetime media table paste code help wordcount',
                    //     'lists',
                    // ],
                    // toolbar:
                    //     'link code numlist bullist | bold italic | alignleft aligncenter alignright alignjustify | link code',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                plugins="code link lists"
                toolbar="numlist bullist | bold italic | alignleft aligncenter alignright alignjustify | link code"
                onEditorChange={handleEditorChange}
            />
        </Box>
    )
}
