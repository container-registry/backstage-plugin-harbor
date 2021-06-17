import { Entity } from "@backstage/catalog-model";

export const HARBOR_ANNOTATION_REPOSITORY = "goharbor.io/repository-slug";

export const useHarborAppData = ({ entity }: { entity: Entity }) => {
  const repositorySlug =
    entity?.metadata.annotations?.[HARBOR_ANNOTATION_REPOSITORY] ?? "";

  if (!repositorySlug) {
    throw new Error("'Harbor' annotations are missing");
  }
  return { repositorySlug };
};
