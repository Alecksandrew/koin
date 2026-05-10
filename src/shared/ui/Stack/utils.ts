import { ResponsiveProp, StackVariants } from "./variants";

function mapToClass(prefix: string, value: string): string {
  if (prefix === "items-" || prefix === "justify-" || prefix === "gap-") {
    return `${prefix}${value}`;
  }
  if (prefix === "flex-") {
    return `flex-${value}`;
  }
  return "";
}

export function parseResponsiveProp<T extends string>(
  prop: ResponsiveProp<T> | undefined,
  prefix: string
): string {
  if (!prop) return "";

  if (typeof prop === "string") {
    return mapToClass(prefix, prop);
  }

  const classes: string[] = [];
  
  for (const [breakpoint, value] of Object.entries(prop)) {
    if (value) {
      const mappedClass = mapToClass(prefix, value as string);
      if (breakpoint === "base") {
        classes.push(mappedClass);
      } else {
        classes.push(`${breakpoint}:${mappedClass}`);
      }
    }
  }

  return classes.join(" ");
}

export function parseStackProps(props: StackVariants): string {
  const classes = ["flex"];

  if (props.direction) classes.push(parseResponsiveProp(props.direction, "flex-"));
  if (props.align) classes.push(parseResponsiveProp(props.align, "items-"));
  if (props.justify) classes.push(parseResponsiveProp(props.justify, "justify-"));
  if (props.wrap) classes.push(parseResponsiveProp(props.wrap, "flex-"));
  if (props.gap) classes.push(parseResponsiveProp(props.gap, "gap-"));

  return classes.filter(Boolean).join(" ");
}