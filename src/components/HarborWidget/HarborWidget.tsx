import { Entity } from '@backstage/catalog-model'
import { MissingAnnotationEmptyState } from '@backstage/plugin-catalog-react'
import { useEntity } from '@backstage/plugin-catalog-react'
import { Card, CardHeader, Grid } from '@material-ui/core'
import React from 'react'
import { isHarborAvailable } from '../../plugin'
import { HarborRepository } from '../HarborRepository'
import {
  HARBOR_ANNOTATION_REPOSITORY,
  useHarborAppData,
} from '../useHarborAppData'

const Widget = ({ entity }: { entity: Entity }) => {
  const { repositorySlug } = useHarborAppData({ entity })

  return (
    <Card>
      <CardHeader title="Vulnerabilities in latest Docker Image" />
      <Grid container>
        {repositorySlug.split(', ').map((slug) => {
          const info = slug.split('/')
          const host: string = info.length > 2 ? info.shift() as string : ''
          const project: string = info.shift() as string
          const repository: string = info.join('/')

          return (
            <Grid item>
              <HarborRepository
                host={host}
                project={project}
                repository={repository}
                widget
              />
            </Grid>
          )
        })}
      </Grid>
    </Card>
  )
}

export const HarborWidget = () => {
  const { entity } = useEntity()

  return !isHarborAvailable(entity) ? (
    <MissingAnnotationEmptyState annotation={HARBOR_ANNOTATION_REPOSITORY} />
  ) : (
    <Widget entity={entity} />
  )
}

export const HarborWidgetEntity = ({ entity }: { entity: Entity }) => {
  return !isHarborAvailable(entity) ? (
    <MissingAnnotationEmptyState annotation={HARBOR_ANNOTATION_REPOSITORY} />
  ) : (
    <Widget entity={entity} />
  )
}
