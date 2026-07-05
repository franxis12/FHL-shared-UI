import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function getColumnKey(column, index) {
  return column?.key ?? column?.label ?? index;
}

function getRowKey(row, index, rowKey) {
  if (typeof rowKey === "function") {
    return rowKey(row, index);
  }

  if (typeof rowKey === "string" && row?.[rowKey] !== undefined) {
    return row[rowKey];
  }

  return row?.id ?? index;
}

function getColumnAlignmentClassName(align = "left") {
  if (align === "right") {
    return "text-right";
  }

  if (align === "center") {
    return "text-center";
  }

  return "text-left";
}

function getColumnValue(column, row) {
  if (typeof column.render === "function") {
    return column.render(row);
  }

  if (typeof column.accessor === "function") {
    return column.accessor(row);
  }

  if (typeof column.accessor === "string") {
    return row?.[column.accessor];
  }

  return row?.[column.key];
}

export function DataTable({
  columns = [],
  rows = [],
  rowKey = "id",
  selectedRowKey,
  onRowClick,
  emptyMessage = "No records available.",
  className = "",
  tableClassName = "",
}) {
  const hasRows = Array.isArray(rows) && rows.length > 0;

  return (
    <div
      className={joinClassNames(
        "overflow-hidden rounded-2xl border bg-[var(--fhl-color-surface)] shadow-[0_18px_40px_-30px_var(--fhl-color-shadow)]",
        className,
      )}
      style={{ borderColor: "var(--fhl-color-border)" }}
    >
      <div className="overflow-x-auto">
        <table
          className={joinClassNames("min-w-full border-collapse", tableClassName)}
        >
          <thead className="bg-[var(--fhl-color-surface-soft)]">
            <tr>
              {columns.map((column, columnIndex) => (
                <th
                  key={getColumnKey(column, columnIndex)}
                  scope="col"
                  className={joinClassNames(
                    "px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--fhl-color-text-muted)]",
                    getColumnAlignmentClassName(column.align),
                    column.headerClassName,
                  )}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {!hasRows ? (
              <tr>
                <td
                  colSpan={Math.max(columns.length, 1)}
                  className="px-4 py-8 text-center"
                >
                  <Text as="p" size={TEXT_SIZE.SM} tone={TEXT_TONE.MUTED}>
                    {emptyMessage}
                  </Text>
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => {
                const resolvedRowKey = getRowKey(row, rowIndex, rowKey);
                const isSelected = selectedRowKey === resolvedRowKey;
                const isClickable = typeof onRowClick === "function";

                return (
                  <tr
                    key={resolvedRowKey}
                    className={joinClassNames(
                      "border-t transition",
                      isClickable
                        ? "cursor-pointer hover:bg-[color-mix(in_srgb,var(--fhl-color-surface)_90%,var(--fhl-color-primary)_10%)]"
                        : "",
                      isSelected
                        ? "bg-[color-mix(in_srgb,var(--fhl-color-surface)_88%,var(--fhl-color-primary)_12%)]"
                        : "",
                    )}
                    style={{ borderColor: "var(--fhl-color-border)" }}
                    onClick={isClickable ? () => onRowClick(row) : undefined}
                    onKeyDown={
                      isClickable
                        ? (event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              onRowClick(row);
                            }
                          }
                        : undefined
                    }
                    tabIndex={isClickable ? 0 : undefined}
                    aria-selected={isSelected || undefined}
                  >
                    {columns.map((column, columnIndex) => (
                      <td
                        key={getColumnKey(column, columnIndex)}
                        className={joinClassNames(
                          "px-4 py-3 align-top text-sm text-[var(--fhl-color-text)]",
                          getColumnAlignmentClassName(column.align),
                          column.cellClassName,
                        )}
                      >
                        {column.emphasize ? (
                          <Text
                            as="span"
                            size={TEXT_SIZE.SM}
                            weight={TEXT_WEIGHT.SEMIBOLD}
                          >
                            {getColumnValue(column, row)}
                          </Text>
                        ) : (
                          getColumnValue(column, row)
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
