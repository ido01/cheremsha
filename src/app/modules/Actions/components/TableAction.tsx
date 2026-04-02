import Table from 'app/components/Table'
import React from 'react'
import { IAction } from 'types/IAction'
import { TTableRowData } from 'types/ITableDisplay'

import { DesctopAction } from './DesctopAction'
import { MobileAction } from './MobileAction'

interface Props {
    actions: IAction[]
}

export const TableAction: React.FC<Props> = ({ actions }) => {
    const tableRows: TTableRowData[] = [
        {
            title: '',
            name: 'method',
            xs: 12,
            element: (action: IAction) => <DesctopAction action={action} disabledUser />,
        },
    ]

    const mobileView = (item: IAction) => <MobileAction action={item} disabledUser />

    return <Table items={actions} rows={tableRows} mobileView={mobileView} />
}
