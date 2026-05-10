import { GridVariants } from "./variants";

export type GridVariantProps = GridVariants[keyof GridVariants];

export function parseResponsiveProp(
  prop: GridVariantProps,
  prefix: string
): string {
  if (prop == null) return "";

  if (typeof prop === "string" || typeof prop === "number") {
    return `${prefix}${prop}`;
  }

  const classes: string[] = [];

  for (const [breakpoint, value] of Object.entries(prop)) {
    if (value == null) continue;

    let mappedClass = `${prefix}${value}`;

    if (breakpoint !== "base") {
      mappedClass = `${breakpoint}:${mappedClass}`
    }

    classes.push(mappedClass);
  }

  return classes.join(" ");
}

export function parseGridProps(props: GridVariants): string {
  const classes = ["grid"];

  const prefixPropValuePair: [string, GridVariantProps][] = [
    ["grid-cols-", props.cols],
    ["grid-rows-", props.rows],
    ["gap-", props.gap],
    ["items-", props.align],
    ["justify-", props.justify],
  ];

  prefixPropValuePair.forEach(([prefix, propValue]) =>
    classes.push(parseResponsiveProp(propValue, prefix))
  );

  return classes.filter(Boolean).join(" ");
}
