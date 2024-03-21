import { Progress, Table } from '@backstage/core-components'
import { configApiRef, fetchApiRef, useApi } from '@backstage/core-plugin-api'
import React, { useState } from 'react'
import ReactSpeedometer from 'react-d3-speedometer'
import { useAsync } from 'react-use'
import { columns } from './tableHeadings'

export function HarborRepository(props: RepositoryProps) {
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [repository, setRepository] = useState<Repository[]>([])

  const config = useApi(configApiRef)
  const fetchApi = useApi(fetchApiRef)
  const backendUrl = config.getString('backend.baseUrl')

  const { loading } = useAsync(async () => {
    let fetchUrl = `${backendUrl}/api/harbor/artifacts?project=${props.project}&repository=${props.repository}`
    if (props.host) {
      fetchUrl = fetchUrl.concat(`&host=${props.host}`)
    }
    const response = await fetchApi.fetch(fetchUrl)
    const json = await response.json()

    if (json.hasOwnProperty('error')) {
      setError(true)
      setErrorMsg(json.error.message)
    }

    json.pushTime = new Date(json.pushTime).toLocaleDateString()
    json.pullTime = new Date(json.pullTime).toLocaleDateString()

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
          width={props.width ? props.width : 300}
          height={props.height ? props.height : 200}
          ringWidth={50}
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
          currentValueText={truncateGraphDescription(props.host, props.project, props.repository)}
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

function truncateGraphDescription (host: string, project: string, repository: string) {
  let descriptionString = `${host}${host ? '/' : ''}${
    project
  }/${repository}`
  if (descriptionString.length > 38) {
    descriptionString = `${project}/${repository}`
    if (descriptionString.length > 38) {
      return repository
    }
    return descriptionString
  }
  return descriptionString;
}

HarborRepository.defaultProps = {
  title: 'Docker Images',
}
interface RepositoryProps {
  widget: boolean
  host: string
  project: string
  repository: string
  title: string
  width?: number
  height?: number
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
