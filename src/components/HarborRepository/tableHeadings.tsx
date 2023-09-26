import { Button, TableColumn } from '@backstage/core-components'
import React from 'react'

export const columns: TableColumn[] = [
  {
    title: 'Tag title',
    field: 'tag',
    type: 'string',
  },
  {
    title: 'Size MB',
    field: 'size',
    type: 'numeric',
  },
  {
    title: 'Vulnerabilities severity',
    field: 'vulnerabilities.severity',
    type: 'string',
    cellStyle: (_, rowData: any & { tableData: { id: number } }) => {
      if (rowData.vulnerabilities.severity === 'Low') {
        return { backgroundColor: 'rgb(173, 226, 40)' }
      }
      if (rowData?.vulnerabilities.severity === 'Medium') {
        return { backgroundColor: 'rgb(236, 219, 35)' }
      }
      if (rowData?.vulnerabilities.severity === 'High') {
        return { backgroundColor: 'rgb(246, 150, 30)' }
      }
      if (rowData?.vulnerabilities?.severity === 'Critical') {
        return { backgroundColor: 'rgb(255, 71, 26)' }
      }
      return { backgroundColor: 'rgb(106, 215, 45)' }
    },
  },
  {
    title: 'Total Vulnerabilities',
    field: 'vulnerabilities.count',
    type: 'numeric',
  },

  {
    title: 'Push Time',
    field: 'pushTime',
    type: 'datetime',
    defaultSort: 'desc',
  },
  {
    title: 'Pull Time',
    field: 'pullTime',
    type: 'datetime',
  },
  {
    title: '',
    field: 'repoUrl',
    render: (rowData: any) => (
      <Button
        to={`${rowData.repoUrl}/artifacts-tab/artifacts/${rowData.artifactDigest}`}
        color="primary"
        variant="contained"
      >
        Learn More
      </Button>
    ),
  },
]
