import { Entity } from "@backstage/catalog-model";
import { MissingAnnotationEmptyState } from "@backstage/core";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { HarborDashboardPage } from "./components/HarborDashboardPage";
import { HARBOR_ANNOTATION_REPOSITORY } from "./components/useHarborAppData";
import { isHarborAvailable } from "./plugin";

export const Router = ({ entity }: { entity: Entity }) =>
  !isHarborAvailable(entity) ? (
    <MissingAnnotationEmptyState annotation={HARBOR_ANNOTATION_REPOSITORY} />
  ) : (
    <Routes>
      <Route path="/" element={<HarborDashboardPage entity={entity} />} />
    </Routes>
  );
