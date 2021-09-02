import React from 'react';
import { Entity } from '@backstage/catalog-model';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Route } from 'react-router';
import { FlatRoutes } from '@backstage/core-app-api';
import { MissingAnnotationEmptyState } from "@backstage/core-components";
import { HarborDashboardPage } from "./components/HarborDashboardPage";
import { HARBOR_ANNOTATION_REPOSITORY } from "./components/useHarborAppData";
import { isHarborAvailable } from "./plugin";

type Props = {
  /** @deprecated The entity is now grabbed from context instead */
  entity?: Entity;
};
export const Router = (_props: Props) => {
  const { entity } = useEntity();
  return !isHarborAvailable(entity) ? (
    <MissingAnnotationEmptyState annotation={HARBOR_ANNOTATION_REPOSITORY} />
  ) : (
    <FlatRoutes>
      <Route path="/" element={<HarborDashboardPage entity={entity} />} />
    </FlatRoutes>
  );
};
