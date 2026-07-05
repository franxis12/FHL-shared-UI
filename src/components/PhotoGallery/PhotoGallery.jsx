import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Button, BUTTON_SHAPE, BUTTON_VARIANT } from "../Button";

function EmptyState({ label = "No photos available" }) {
  return (
    <div className="flex h-full min-h-[24rem] items-center justify-center bg-[var(--fhl-color-surface-soft)] text-sm font-semibold text-[var(--fhl-color-text-muted)]">
      {label}
    </div>
  );
}

export function PhotoGallery({
  images = [],
  selectedIndex = 0,
  onSelectIndex,
  badge,
  altText = "Photo",
  emptyLabel = "No photos available",
  maxThumbs = 5,
  onImageClick,
  heightClassName = "h-[28rem]",
}) {
  const activeImage = images[selectedIndex] || images[0] || null;
  const visibleThumbs = images.slice(0, maxThumbs);
  const remainingPhotos = Math.max(images.length - visibleThumbs.length, 0);

  function moveGallery(direction) {
    if (images.length <= 1) return;

    const nextIndex =
      direction === "next"
        ? (selectedIndex + 1) % images.length
        : (selectedIndex - 1 + images.length) % images.length;

    onSelectIndex?.(nextIndex);
  }

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--fhl-color-surface-soft)] shadow-[0_18px_45px_var(--fhl-color-shadow)]">
        {activeImage ? (
          <button
            type="button"
            onClick={() => onImageClick?.(selectedIndex)}
            className={`block w-full ${onImageClick ? "cursor-zoom-in" : "cursor-default"}`}
          >
            <img
              src={activeImage.publicUrl || activeImage.url}
              alt={activeImage.label || altText}
              className={`w-full object-cover ${heightClassName}`}
            />
          </button>
        ) : (
          <EmptyState label={emptyLabel} />
        )}

        {badge ? (
          <span className="absolute left-6 top-6 rounded-2xl bg-[var(--fhl-color-primary)] px-4 py-2 text-sm font-bold capitalize text-[var(--fhl-navy-text)] shadow-lg">
            {badge}
          </span>
        ) : null}

        {images.length > 1 ? (
          <>
            <Button
              variant={BUTTON_VARIANT.SECONDARY}
              shape={BUTTON_SHAPE.CIRCLE}
              icon={HiChevronLeft}
              iconClassName="h-5 w-5 text-[var(--fhl-color-primary)]"
              onClick={() => moveGallery("previous")}
              aria-label="Previous photo"
              className="absolute left-6 top-1/2 -translate-y-1/2 shadow-lg hover:scale-105"
            />
            <Button
              variant={BUTTON_VARIANT.SECONDARY}
              shape={BUTTON_SHAPE.CIRCLE}
              icon={HiChevronRight}
              iconClassName="h-5 w-5 text-[var(--fhl-color-primary)]"
              onClick={() => moveGallery("next")}
              aria-label="Next photo"
              className="absolute right-6 top-1/2 -translate-y-1/2 shadow-lg hover:scale-105"
            />
          </>
        ) : null}
      </div>

      {visibleThumbs.length > 0 ? (
        <div className="grid grid-cols-5 gap-3">
          {visibleThumbs.map((image, index) => {
            const isActive = index === selectedIndex;
            const showRemaining =
              index === visibleThumbs.length - 1 && remainingPhotos > 0;

            return (
              <button
                key={image.id || image.publicUrl || image.url}
                type="button"
                onClick={() => onSelectIndex?.(index)}
                className={[
                  "relative h-24 overflow-hidden rounded-xl border transition",
                  isActive
                    ? "border-[var(--fhl-color-accent)] ring-2 ring-[var(--fhl-color-accent)]/30"
                    : "border-[var(--fhl-color-border)] hover:border-[var(--fhl-color-accent)]",
                ].join(" ")}
              >
                <img
                  src={image.publicUrl || image.url}
                  alt={image.label || `${altText} thumbnail`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {showRemaining ? (
                  <span className="absolute inset-0 grid place-items-center bg-[var(--fhl-color-primary)]/65 text-sm font-bold text-white">
                    +{remainingPhotos} Photos
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
