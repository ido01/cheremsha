export interface ISettings {
    name: string
    logo: string
    project: string
    tinymce?: string
    telegram?: string
}

export interface IResponseSettings {
    settings: ISettings
}
