export interface IExcelsResponse {
    data: IExcel[]
}

export interface IExcelItemResponse {
    data: IExcel
}

export interface IExcelRequest {
    files: File[]
    id: string
    parent_id: string
}

export interface IExcelModifyRequest {
    id: string
    versionId: string
    name: string
}

export interface IExcel {
    id: string
    type: 'doc' | 'docx' | 'pdf' | 'pptx' | 'ppt' | 'xls' | 'xlsx'
    parent_id: string
    version: number
    name: string
    file_name: string
    path: string
    size: string
    url: string
    createdAt: string
    versions?: IExcel[]
}
