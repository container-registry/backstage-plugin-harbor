export const columns = [
  {
    name: "Tag name",
    selector: "tag",
  },
  {
    name: "Size MB",
    selector: "size",
  },
  {
    name: "Vulnerabilities severity",
    selector: "vulnerabilities.severity",
    conditionalCellStyles: [
      {
        when: (row: { vulnerabilities: { severity: string } }) =>
          row.vulnerabilities.severity === "None",
        style: {
          backgroundColor: "rgb(106, 215, 45)",
        },
      },
      {
        when: (row: { vulnerabilities: { severity: string } }) =>
          row.vulnerabilities.severity === "Low",
        style: {
          backgroundColor: "rgb(173, 226, 40)",
        },
      },
      {
        when: (row: { vulnerabilities: { severity: string } }) =>
          row.vulnerabilities.severity === "Medium",
        style: {
          backgroundColor: "rgb(236, 219, 35)",
        },
      },
      {
        when: (row: { vulnerabilities: { severity: string } }) =>
          row.vulnerabilities.severity === "High",
        style: {
          backgroundColor: "rgb(246, 150, 30)",
        },
      },
      {
        when: (row: { vulnerabilities: { severity: string } }) =>
          row.vulnerabilities.severity === "Critical",
        style: {
          backgroundColor: "rgb(255, 71, 26)",
        },
      },
    ],
  },
  {
    name: "Total Vulnerabilities",
    selector: "vulnerabilities.count",
  },

  {
    name: "Push Time",
    selector: "pushTime",
  },
  {
    name: "Pull Time",
    selector: "pullTime",
  },
];
