import React from 'react';
import DataTable from 'react-data-table-component';
import { columns } from './tableHeadings';
import ReactSpeedometer from 'react-d3-speedometer';
import { Card, CardActions, Button } from '@material-ui/core';

class HarborRepository extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoaded: false,
      data: null,
      repoUrl: '',
    };
  }

  async componentDidMount() {
    let backendUrl = window.location.origin;
    if (backendUrl.includes('3000')) {
      backendUrl = backendUrl.replace('3000', '7000');
    }

    const response = await fetch(
      `${backendUrl}/api/harbor/artifacts?project=${this.props.project}&repository=${this.props.repository}`,
    ).then(res => res.json());

    this.setState({
      isLoaded: true,
      data: response,
      repoUrl: response?.[0].repoUrl,
    });
  }

  render() {
    const { isLoaded, data, repoUrl } = this.state;

    if (!isLoaded) {
      return <p>Loading...</p>;
    }

    if (this.props.widget) {
      let severityNumber: number = 0;
      const severityText: string = data?.[0].vulnerabilities.severity;
      switch (severityText) {
        case 'Low':
          severityNumber = 150;
          break;

        case 'Medium':
          severityNumber = 250;
          break;

        case 'High':
          severityNumber = 350;
          break;

        case 'Critical':
          severityNumber = 450;
          break;

        default:
          severityNumber = 50;
          break;
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
      );
    }
    return (
      <div>
        <Card>
          <CardActions>
            <Button size="small">
              <a href={repoUrl}>Learn More</a>
            </Button>
          </CardActions>
        </Card>
        <DataTable
          striped
          title="Docker Images"
          columns={columns}
          data={data}
          defaultSortField="pushTime"
          defaultSortAsc={false}
        />
      </div>
    );
  }
}

export { HarborRepository };
