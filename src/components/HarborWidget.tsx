import React from 'react';
import { Card, CardHeader } from '@material-ui/core';
import { MissingAnnotationEmptyState } from '@backstage/core';
import { Entity } from '@backstage/catalog-model';
import { HarborRepository } from './HarborRepository';
import {
  HARBOR_ANNOTATION_REPOSITORY,
  useHarborAppData,
} from './useHarborAppData';
import { isHarborAvailable } from '../plugin';

const Widget = ({ entity }: { entity: Entity }) => {
  const { repositorySlug } = useHarborAppData({ entity });
  const info = repositorySlug.split('/');

  return (
    <Card>
      <CardHeader title="Docker Image" />
      <HarborRepository project={info[0]} repository={info[1]} widget={true} />
    </Card>
  );
};

export const HarborWidget = ({ entity }: { entity: Entity }) => {
  return !isHarborAvailable(entity) ? (
    <MissingAnnotationEmptyState annotation={HARBOR_ANNOTATION_REPOSITORY} />
  ) : (
    //   <ErrorBoundary>
    <Widget entity={entity} />
    //   </ErrorBoundary>
  );
};
