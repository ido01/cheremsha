import { IIssue } from 'types/IIssue'

export const getId = (id: string) => {
    return `${parseFloat(id.replace(/[^\d.]/gi, ''))}`
}

export const idGenerate = (issue: IIssue) => {
    const zeroCount = 6 - `${issue.id}`.length
    const id = `${zeroCount > 0 ? new Array(zeroCount).fill('0').join('') : ''}${issue.id}`
    return `${issue.type === 'folder' ? 'BOARD-' : 'ISSUE-'}${id}`
}

export const urlGenerate = (issue: IIssue) => {
    return `/issues/${idGenerate(issue)}`
}
