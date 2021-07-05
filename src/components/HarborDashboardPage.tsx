import React from "react";
import { Entity } from "@backstage/catalog-model";
import { InfoCard } from "@backstage/core";

import { HarborRepository } from "./HarborRepository";
import { useHarborAppData } from "./useHarborAppData";

export const HarborDashboardPage = ({ entity }: { entity: Entity }) => {
  const { repositorySlug } = useHarborAppData({ entity });
  const info = repositorySlug.split("/");

  return (
    <InfoCard title="Harbor Dashboard">
      <HarborRepository project={info[0]} repository={info[1]} widget={false} />
    </InfoCard>
  );
};
