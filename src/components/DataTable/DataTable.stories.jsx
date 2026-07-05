import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";

function StoryShell({ children, theme = "light" }) {
  useEffect(() => {
    const root = document.documentElement;
    const previousTheme = root.getAttribute("data-theme");

    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }

    return () => {
      if (previousTheme) {
        root.setAttribute("data-theme", previousTheme);
        return;
      }

      root.removeAttribute("data-theme");
    };
  }, [theme]);

  return (
    <div
      style={{
        background: "var(--fhl-color-bg)",
        color: "var(--fhl-color-text)",
        minHeight: "420px",
        padding: "1.5rem",
      }}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </div>
  );
}

const sampleRows = [
  {
    id: "lease-1",
    tenantName: "Maria Alvarez",
    address: "108 Peace St, Miami, FL 33101",
    unit: "Unit 2A",
    rent: "$1,850",
    start: "07/01/2026",
    end: "06/30/2027",
  },
  {
    id: "lease-2",
    tenantName: "Daniel Chen",
    address: "980 Coastal Dr, Fort Lauderdale, FL 33301",
    unit: "Suite 5",
    rent: "$2,450",
    start: "03/01/2025",
    end: "02/28/2026",
  },
];

const sampleColumns = [
  {
    key: "tenantName",
    label: "Name",
    accessor: "tenantName",
    emphasize: true,
  },
  {
    key: "address",
    label: "Address",
    accessor: "address",
  },
  {
    key: "unit",
    label: "Unit",
    accessor: "unit",
  },
  {
    key: "rent",
    label: "Rent",
    accessor: "rent",
    align: "right",
  },
  {
    key: "start",
    label: "Start",
    accessor: "start",
  },
  {
    key: "end",
    label: "End",
    accessor: "end",
  },
];

const meta = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

function InteractiveTable({ theme = "light" }) {
  const [selectedId, setSelectedId] = useState(sampleRows[0].id);

  return (
    <StoryShell theme={theme}>
      <DataTable
        columns={sampleColumns}
        rows={sampleRows}
        selectedRowKey={selectedId}
        onRowClick={(row) => setSelectedId(row.id)}
      />
    </StoryShell>
  );
}

export const Default = {
  render: () => <InteractiveTable />,
};

export const DarkMode = {
  render: () => <InteractiveTable theme="dark" />,
};
