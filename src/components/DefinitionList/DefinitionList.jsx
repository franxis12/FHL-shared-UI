import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

export function DefinitionList({ items = [], className = "" }) {
  return (
    <dl className={["space-y-4 text-sm", className].filter(Boolean).join(" ")}>
      {items.map((item) => (
        <div key={item.key ?? item.label} className="flex justify-between gap-4">
          <Text as="dt" size={TEXT_SIZE.SM} tone={TEXT_TONE.MUTED}>
            {item.label}
          </Text>
          <Text as="dd" size={TEXT_SIZE.SM} weight={TEXT_WEIGHT.SEMIBOLD}>
            {item.value}
          </Text>
        </div>
      ))}
    </dl>
  );
}
