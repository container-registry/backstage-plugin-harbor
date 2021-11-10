import React from "react";
import { Card, CardHeader } from "@material-ui/core";
import { MissingAnnotationEmptyState } from "@backstage/core-components";
import { Entity } from "@backstage/catalog-model";
import { HarborRepository } from "./HarborRepository";
import {
  HARBOR_ANNOTATION_REPOSITORY,
  useHarborAppData,
} from "./useHarborAppData";
import { isHarborAvailable } from "../plugin";
import { useEntity } from "@backstage/plugin-catalog-react";

const Widget = ({ entity }: { entity: Entity }) => {
  const { repositorySlug } = useHarborAppData({ entity });
  const info = repositorySlug.split("/");

  const project = info.shift() as "string";
  const repository = info.join("/");

  return (
    <Card>
      <CardHeader title="Docker Image" />
      <HarborRepository project={project} repository={repository} widget />
    </Card>
  );
};

export const HarborWidget = () => {
  const { entity } = useEntity();

  return !isHarborAvailable(entity) ? (
    <MissingAnnotationEmptyState annotation={HARBOR_ANNOTATION_REPOSITORY} />
  ) : (
    <Widget entity={entity} />
  );
};

export const HarborWidgetEntity = ({ entity }: { entity: Entity }) => {
  return !isHarborAvailable(entity) ? (
    <MissingAnnotationEmptyState annotation={HARBOR_ANNOTATION_REPOSITORY} />
  ) : (
    <Widget entity={entity} />
  );
};
