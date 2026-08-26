type Props = {
  kind?: "dots" | "plus" | "grid";
};

export function FieldGrain({ kind = "dots" }: Props) {
  return <div className={`field-grain field-grain--${kind}`} aria-hidden />;
}
