import { useEntity } from "@backstage/plugin-catalog-react";
import { MissingAnnotationEmptyState } from "@backstage/core";
import React from "react";
import { Route, Routes } from "react-router";
import { HarborDashboardPage } from "./components/HarborDashboardPage";
import { HARBOR_ANNOTATION_REPOSITORY } from "./components/useHarborAppData";
import { isHarborAvailable } from "./plugin";

export const Router = () => {
  const { entity } = useEntity();

  return !isHarborAvailable(entity) ? (
    <MissingAnnotationEmptyState annotation={HARBOR_ANNOTATION_REPOSITORY} />
  ) : (
    <Routes>
      <Route path="/" element={<HarborDashboardPage entity={entity} />} />
    </Routes>
  );
};
