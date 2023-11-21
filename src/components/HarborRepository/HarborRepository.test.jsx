import { ConfigReader } from '@backstage/core-app-api'
import { configApiRef } from '@backstage/core-plugin-api'
import { TestApiProvider } from '@backstage/test-utils'
import { act, render, screen } from '@testing-library/react'
import React from 'react'
import { HarborRepository } from './HarborRepository'

const configApi = new ConfigReader({
  backend: { baseUrl: 'http://localhost:7000' },
})

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          size: 18.12,
          tag: 'e2987513ef3510654b494b394faac7cae9f0f3c8',
          pullTime: '2021-12-10 01:07',
          pushTime: '2021-12-01 07:55',
          projectID: 2,
          repoUrl:
            'https://harbor.domain.com/harbor/projects/2/repositories/component',
          vulnerabilities: {
            count: 0,
            severity: 'None',
          },
        },
        {
          size: 18.12,
          tag: 'bc6c74ba26c044e61d1cb83f4273c2847c9cc8db',
          pullTime: '2021-12-09 01:37',
          pushTime: '2021-11-17 12:36',
          projectID: 2,
          repoUrl:
            'https://harbor.domain.com/harbor/projects/2/repositories/component',
          vulnerabilities: {
            count: 0,
            severity: 'None',
          },
        },
      ]),
  })
)

describe('Harbor Repository', () => {
  it('loads repo info', async () => {
    await act(async () =>
      render(
        <TestApiProvider apis={[[configApiRef, configApi]]}>
          <HarborRepository
            host="host"
            project="project"
            repository="component"
            widget={false}
          />
        </TestApiProvider>
      )
    )

    await act(async () => sleep(1000))

    expect(screen.getAllByText('Learn More')[0]).toBeInTheDocument()
    expect(screen.getByText('Docker Images')).toBeInTheDocument()
    expect(
      screen.getByText('bc6c74ba26c044e61d1cb83f4273c2847c9cc8db')
    ).toBeInTheDocument()
    expect(
      screen.getByText('e2987513ef3510654b494b394faac7cae9f0f3c8')
    ).toBeInTheDocument()
  })
})

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
