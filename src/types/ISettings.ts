export interface ISettings {
    name: string
    logo: string
    project: string
    tinymce?: string
}

export interface IResponseSettings {
    settings: ISettings
}
