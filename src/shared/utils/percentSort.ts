export const percentSort = (rowA: any, rowB: any, columnId: string) => {
  const cellA = rowA.getValue(columnId);
  const cellB = rowB.getValue(columnId);

  if (cellA === null || cellA === undefined || cellA === "") return 1;
  if (cellB === null || cellB === undefined || cellB === "") return -1;

  if (
    (cellA === null || cellA === undefined || cellA === "") &&
    (cellB === null || cellB === undefined || cellB === "")
  )
    return 0;

  const valueA = parseFloat(String(cellA).replace("%", ""));
  const valueB = parseFloat(String(cellB).replace("%", ""));

  if (isNaN(valueA)) return 1;
  if (isNaN(valueB)) return -1;
  if (isNaN(valueA) && isNaN(valueB)) return 0;

  return valueA - valueB;
};
