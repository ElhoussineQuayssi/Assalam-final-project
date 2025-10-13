// components/unified/ContentGrid.jsx
export default function ContentGrid({
  items,
  columns = { default: 1, md: 2, lg: 3 },
  gap = "gap-8",
  className = "",
  renderItem,
}) {
  const gridClasses = `grid ${Object.entries(columns)
    .map(
      ([breakpoint, cols]) =>
        `${breakpoint === "default" ? "" : breakpoint + ":"}grid-cols-${cols}`,
    )
    .join(" ")} ${gap} ${className}`;

  return <div className={gridClasses}>{items.map(renderItem)}</div>;
}
