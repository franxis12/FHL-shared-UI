import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

export function Card({ title, children, icon: Icon }) {
  return (
    <article className="rounded-xl border border-[var(--fhl-color-border)] bg-[var(--fhl-color-surface)] p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        {Icon ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--fhl-color-surface-soft)] text-[var(--fhl-color-secondary)]">
            <Icon className="h-5 w-5" aria-hidden="true" focusable="false" />
          </div>
        ) : null}
        <Text as="h3" size={TEXT_SIZE.LG} weight={TEXT_WEIGHT.SEMIBOLD}>
          {title}
        </Text>
      </div>
      <Text
        as="div"
        size={TEXT_SIZE.SM}
        tone={TEXT_TONE.MUTED}
        className="leading-6"
      >
        {children}
      </Text>
    </article>
  );
}
