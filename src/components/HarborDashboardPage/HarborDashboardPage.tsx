import { useEntity } from '@backstage/plugin-catalog-react'
import React from 'react'
import { HarborRepository } from '../HarborRepository'
import { useHarborAppData } from '../useHarborAppData'

export const HarborDashboardPage = () => {
  const { entity } = useEntity()
  const { repositorySlug } = useHarborAppData({ entity })
  const info = repositorySlug.split('/')

  const project = info.shift() as 'string'
  const repository = info.join('/')

  return (
    <HarborRepository
      project={project}
      repository={repository}
      widget={false}
    />
  )
}
