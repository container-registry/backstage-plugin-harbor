import { useEntity } from '@backstage/plugin-catalog-react'
import React from 'react'
import { HarborRepository } from '../HarborRepository'
import { useHarborAppData } from '../useHarborAppData'
import { Grid } from '@material-ui/core'

export const HarborDashboardPage = () => {
  const { entity } = useEntity()
  const { repositorySlug } = useHarborAppData({ entity })

  return (
    <Grid container spacing={3}>
      {repositorySlug.split(', ').map((slug) => {
        const info = slug.split('/')
        const host: string = info.length > 2 ? info.shift() : ''
        const project: string = info.shift()
        const repository: string = info.join('/')

        return (
          <Grid item xs={12}>
            <HarborRepository
              title={`${host}${host ? '/' : ''}${project}/${repository}`}
              host={host}
              project={project}
              repository={repository}
              widget={false}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}
