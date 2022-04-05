import { Progress, Table } from '@backstage/core-components'
import React, { useState } from 'react'
import ReactSpeedometer from 'react-d3-speedometer'
import { useAsync } from 'react-use'
import { columns } from './tableHeadings'

function HarborRepository(props: RepositoryProps) {
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [repository, setRepository] = useState<Repository[]>([])

  const { loading } = useAsync(async () => {
    let backendUrl = window.location.origin
    if (backendUrl.includes('3000')) {
      backendUrl = backendUrl.replace('3000', '7000')
    }
    const response = await fetch(
      `${backendUrl}/api/harbor/artifacts?project=${props.project}&repository=${props.repository}`
    )
    const json = await response.json()

    if (json.hasOwnProperty('error')) {
      setError(true)
      setErrorMsg(json.error.message)
    }
    setRepository(json)
  }, [props.project, props.repository])

  if (loading) {
    return <Progress />
  }

  if (error) {
    return <p>{errorMsg}</p>
  }

  if (props.widget) {
    let severityNumber: number = 0
    const severityText: string = repository[0]?.vulnerabilities.severity
    switch (severityText) {
      case 'Low':
        severityNumber = 150
        break

      case 'Medium':
        severityNumber = 250
        break

      case 'High':
        severityNumber = 350
        break

      case 'Critical':
        severityNumber = 450
        break

      default:
        severityNumber = 50
        break
    }

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ReactSpeedometer
          value={severityNumber}
          width={450}
          minValue={0}
          maxValue={500}
          segmentColors={[
            '#6ad72d',
            '#ade228',
            '#ecdb23',
            '#f6961e',
            '#ff471a',
          ]}
          customSegmentStops={[0, 100, 200, 300, 400, 500]}
          currentValueText="vulnerability levels"
          customSegmentLabels={[
            {
              text: 'None',
            },
            {
              text: 'Low',
            },
            {
              text: 'Medium',
            },
            {
              text: 'High',
            },
            {
              text: 'Critical',
            },
          ]}
        />
      </div>
    )
  }

  return (
    <div>
      <Table
        options={{ paging: false, search: false, padding: 'dense' }}
        title={props.title}
        columns={columns}
        data={repository}
      />
    </div>
  )
}

HarborRepository.defaultProps = {
  title: 'Docker Images',
}
interface RepositoryProps {
  widget: boolean
  project: string
  repository: string
  title: string
}

interface Repository {
  size: number
  tag: string
  pullTime: string
  pushTime: string
  projectID: number
  repoUrl: string
  vulnerabilities: Vulnerabilities
}

interface Vulnerabilities {
  count: number
  severity: string
}

export { HarborRepository }
