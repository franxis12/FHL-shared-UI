import { HiHeart, HiOutlineHeart } from "react-icons/hi2";

export function FavoriteButton({
  isFavorite = false,
  isSaving = false,
  onToggle,
  variant = "floating",
  className = "",
  label,
  title,
}) {
  const isInlineVariant = variant === "inline";
  const buttonLabel =
    label ??
    (isSaving
      ? "Saving favorite"
      : isFavorite
        ? "Remove from saved homes"
        : "Save home");

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isSaving) {
      return;
    }

    onToggle?.(!isFavorite);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isSaving}
      className={[
        isInlineVariant
          ? "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition hover:bg-[var(--fhl-color-surface-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--fhl-color-primary)] focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
          : "flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-[0_10px_25px_rgba(6,43,73,0.18)] backdrop-blur-sm transition hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--fhl-color-primary)] focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70",
        isFavorite
          ? "text-[var(--fhl-color-alert)]"
          : "text-[var(--fhl-color-primary-strong)]",
        className,
      ].join(" ")}
      aria-pressed={isFavorite}
      aria-label={buttonLabel}
      title={title || buttonLabel}
    >
      {isFavorite ? (
        <HiHeart className={isInlineVariant ? "h-5 w-5" : "h-7 w-7"} />
      ) : (
        <HiOutlineHeart
          className={
            isInlineVariant ? "h-5 w-5 stroke-[2.2]" : "h-7 w-7 stroke-[2.2]"
          }
        />
      )}
      {isInlineVariant ? <span>{isFavorite ? "Saved" : "Save"}</span> : null}
    </button>
  );
}
