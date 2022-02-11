import React from "react";
import { render, screen, act } from "@testing-library/react";
import { HarborRepository } from "./HarborRepository";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          size: 18.12,
          tag: "e2987513ef3510654b494b394faac7cae9f0f3c8",
          pullTime: "2021-12-10 01:07",
          pushTime: "2021-12-01 07:55",
          projectID: 2,
          repoUrl:
            "https://harbor.domain.com/harbor/projects/2/repositories/component",
          vulnerabilities: {
            count: 0,
            severity: "None",
          },
        },
        {
          size: 18.12,
          tag: "bc6c74ba26c044e61d1cb83f4273c2847c9cc8db",
          pullTime: "2021-12-09 01:37",
          pushTime: "2021-11-17 12:36",
          projectID: 2,
          repoUrl:
            "https://harbor.domain.com/harbor/projects/2/repositories/component",
          vulnerabilities: {
            count: 0,
            severity: "None",
          },
        },
      ]),
  })
);

describe("Harbor Repository", () => {
  it("loads repo info", async () => {
    await act(async () =>
      render(
        <HarborRepository
          project="project"
          repository="component"
          widget={false}
        />
      )
    );

    await act(() => sleep(1000));

    expect(screen.getAllByText("Learn More")[0]).toBeInTheDocument();
    expect(screen.getByText("Docker Images")).toBeInTheDocument();
    expect(
      screen.getByText("bc6c74ba26c044e61d1cb83f4273c2847c9cc8db")
    ).toBeInTheDocument();
    expect(
      screen.getByText("e2987513ef3510654b494b394faac7cae9f0f3c8")
    ).toBeInTheDocument();
  });
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Harbor SpeedoMeter", () => {
  it("loads harbor SpeedoMeter", async () => {
    await act(async () =>
      render(
        <HarborRepository project="project" repository="component" widget />
      )
    );

    await act(() => sleep(1000));

    // expect(screen.getByText("Docker Image")).toBeInTheDocument();
    expect(screen.getByText("vulnerability levels")).toBeInTheDocument();

    expect(screen.getByText("None")).toBeInTheDocument();
    expect(screen.getByText("Low")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Critical")).toBeInTheDocument();
  });
});
