import { useEffect, useMemo, useState } from "react";

function CloseIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronLeftIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M12.5 4.5L7 10L12.5 15.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M7.5 4.5L13 10L7.5 15.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function resolveInitialIndex(images, requestedIndex) {
  if (!Array.isArray(images) || images.length === 0) {
    return 0;
  }

  if (!Number.isInteger(requestedIndex)) {
    return 0;
  }

  return Math.min(Math.max(requestedIndex, 0), images.length - 1);
}

export function PhotoCarouselModal({
  isOpen,
  title = "Photos",
  images = [],
  initialIndex = 0,
  onClose,
}) {
  const [activeIndex, setActiveIndex] = useState(() =>
    resolveInitialIndex(images, initialIndex),
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setActiveIndex(resolveInitialIndex(images, initialIndex));
  }, [images, initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose?.();
        return;
      }

      if (images.length <= 1) {
        return;
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((previous) =>
          previous === 0 ? images.length - 1 : previous - 1,
        );
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((previous) =>
          previous === images.length - 1 ? 0 : previous + 1,
        );
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, isOpen, onClose]);

  const activeImage = useMemo(
    () => images[activeIndex] ?? null,
    [activeIndex, images],
  );

  if (!isOpen || !activeImage) {
    return null;
  }

  const canNavigate = images.length > 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border"
        style={{
          borderColor:
            "color-mix(in srgb, var(--fhl-color-border) 80%, white 20%)",
          backgroundColor: "var(--fhl-color-surface)",
          boxShadow: "0 30px 80px -34px rgba(15, 23, 42, 0.65)",
        }}
      >
        <div
          className="flex items-center justify-between border-b px-4 py-3 md:px-5"
          style={{ borderColor: "var(--fhl-color-border)" }}
        >
          <div>
            <p className="text-base font-semibold text-[var(--fhl-color-text)]">
              {title}
            </p>
            <p className="text-xs text-[var(--fhl-color-text-muted)]">
              {activeIndex + 1} of {images.length}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border text-[var(--fhl-color-text)] transition hover:bg-[var(--fhl-color-surface-soft)]"
            style={{ borderColor: "var(--fhl-color-border)" }}
            aria-label="Close photo gallery"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="relative bg-slate-950">
          <img
            src={activeImage.url}
            alt={activeImage.alt || title}
            className="h-[62vh] w-full object-contain"
          />

          {canNavigate ? (
            <>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((previous) =>
                    previous === 0 ? images.length - 1 : previous - 1,
                  )
                }
                className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/55 text-white transition hover:bg-slate-950/75"
                aria-label="Previous photo"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((previous) =>
                    previous === images.length - 1 ? 0 : previous + 1,
                  )
                }
                className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/55 text-white transition hover:bg-slate-950/75"
                aria-label="Next photo"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </>
          ) : null}
        </div>

        {images.length > 1 ? (
          <div
            className="flex gap-2 overflow-x-auto border-t px-4 py-3 md:px-5"
            style={{ borderColor: "var(--fhl-color-border)" }}
          >
            {images.map((image, index) => (
              <button
                key={image.id || `${image.url}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-16 w-24 shrink-0 overflow-hidden rounded-2xl border ${
                  index === activeIndex
                    ? "ring-2 ring-[var(--fhl-color-primary)]"
                    : ""
                }`}
                style={{
                  borderColor:
                    index === activeIndex
                      ? "var(--fhl-color-primary)"
                      : "var(--fhl-color-border)",
                }}
              >
                <img
                  src={image.url}
                  alt={image.alt || `${title} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
