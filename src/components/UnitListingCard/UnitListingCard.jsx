import {
  HiOutlineArrowRight,
  HiOutlineArrowsPointingOut,
  HiOutlineBeaker,
  HiOutlineHomeModern,
  HiOutlineMapPin,
  HiOutlineNoSymbol,
  HiOutlineSparkles,
  HiOutlineTruck,
} from "react-icons/hi2";
import { FavoriteButton } from "../FavoriteButton";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

function formatOptionalNumber(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const numericValue = Number(value);
  return Number.isFinite(numericValue)
    ? numberFormatter.format(numericValue)
    : "—";
}

function formatPropertyType(value) {
  const normalizedValue = String(value || "").trim();

  if (!normalizedValue) {
    return "Available";
  }

  return normalizedValue.replace(/[_-]+/g, " ");
}

function formatPropertyLocation(property) {
  const segments = [
    property?.address,
    [property?.city, property?.state].filter(Boolean).join(", "),
    property?.zipCode,
  ]
    .map((segment) => String(segment ?? "").trim())
    .filter(Boolean);

  return segments.join(" · ") || "Location unavailable";
}

function formatListingLocation(property) {
  const city = String(property?.city || "").trim();
  const state = String(property?.state || "").trim();
  const zipCode = String(property?.zipCode || "").trim();
  const cityState = [city, state].filter(Boolean).join(", ");
  const location = [cityState, zipCode].filter(Boolean).join(" ");

  return location || formatPropertyLocation(property);
}

export function UnitListingCard({
  listing,
  onNavigate,
  isFavorite = false,
  isFavoriteSaving = false,
  onToggleFavorite,
}) {
  const rentAmount = Number(listing.rentAmount);
  const hasRentAmount = Number.isFinite(rentAmount);
  const propertyType = formatPropertyType(listing.property.propertyType);
  const parkingSpaces = Number(listing.parkingSpaces);
  const hasParking = Number.isFinite(parkingSpaces) && parkingSpaces > 0;

  return (
    <article className="group relative overflow-hidden rounded-[1rem] border border-[var(--fhl-color-border)] bg-[var(--fhl-color-surface)] shadow-[0_18px_45px_var(--fhl-color-shadow)] transition hover:-translate-y-1 hover:shadow-[0_26px_55px_var(--fhl-color-shadow)]">
      <a
        href={listing.detailsPath}
        onClick={onNavigate}
        aria-label={`View details for ${listing.title}`}
        className="block text-inherit no-underline focus:outline-none focus:ring-2 focus:ring-[var(--fhl-color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--fhl-color-bg)]"
      >
        <div className="relative mb-4 overflow-hidden">
          {listing.coverImageUrl ? (
            <img
              src={listing.coverImageUrl}
              alt={`${listing.property.title} cover`}
              className="h-44 w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-44 items-center justify-center bg-[var(--fhl-color-surface-soft)] text-sm text-[var(--fhl-color-text-muted)]">
              No image available
            </div>
          )}
        </div>

        <div className="px-5 pb-5">
          <span className="mb-3 inline-flex rounded-full bg-[var(--fhl-color-surface-soft)] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[var(--fhl-color-text-muted)]">
            {propertyType}
          </span>

          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-extrabold tracking-tight text-[var(--fhl-color-text)]">
                {listing.unit.unitName}
              </h3>
              <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[var(--fhl-color-text-muted)]">
                <HiOutlineMapPin className="h-4 w-4 shrink-0 text-[var(--fhl-color-primary)]" />
                <span className="truncate">
                  {formatListingLocation(listing.property)}
                </span>
              </div>
            </div>

            <p className="shrink-0 text-right text-lg font-extrabold tracking-tight text-[var(--fhl-color-text)]">
              {hasRentAmount ? currency.format(rentAmount) : "Price"}
              <span className="ml-1 text-xs font-semibold text-[var(--fhl-color-text-muted)]">
                {hasRentAmount ? "/month" : "not set"}
              </span>
            </p>
          </div>

          <div className="mb-3 border-t border-[var(--fhl-color-border)]" />

          <div className="mb-3 grid grid-cols-3 divide-x divide-[var(--fhl-color-border)] text-center">
            <div className="flex items-center justify-center gap-2 px-1">
              <HiOutlineHomeModern className="h-5 w-5 text-[var(--fhl-color-primary)]" />
              <div className="text-left">
                <p className="text-sm font-extrabold text-[var(--fhl-color-text)]">
                  {formatOptionalNumber(listing.bedrooms)}
                </p>
                <p className="text-[11px] font-semibold text-[var(--fhl-color-text-muted)]">
                  Beds
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 px-1">
              <HiOutlineBeaker className="h-5 w-5 text-[var(--fhl-color-primary)]" />
              <div className="text-left">
                <p className="text-sm font-extrabold text-[var(--fhl-color-text)]">
                  {formatOptionalNumber(listing.bathrooms)}
                </p>
                <p className="text-[11px] font-semibold text-[var(--fhl-color-text-muted)]">
                  Baths
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 px-1">
              <HiOutlineArrowsPointingOut className="h-5 w-5 text-[var(--fhl-color-primary)]" />
              <div className="text-left">
                <p className="text-sm font-extrabold text-[var(--fhl-color-text)]">
                  {formatOptionalNumber(listing.squareFeet)}
                </p>
                <p className="text-[11px] font-semibold text-[var(--fhl-color-text-muted)]">
                  Sq Ft
                </p>
              </div>
            </div>
          </div>

          <div className="mb-3 border-t border-[var(--fhl-color-border)]" />

          <div className="mb-4 flex flex-wrap gap-2 text-[11px] font-semibold text-[var(--fhl-color-text)]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--fhl-color-surface-soft)] px-3 py-1.5">
              <HiOutlineTruck className="h-3.5 w-3.5 text-[var(--fhl-color-primary)]" />
              {hasParking
                ? `${formatOptionalNumber(listing.parkingSpaces)} parking`
                : "No parking"}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--fhl-color-surface-soft)] px-3 py-1.5">
              <HiOutlineSparkles className="h-3.5 w-3.5 text-[var(--fhl-color-primary)]" />
              Pets {listing.petsAllowed ? "allowed" : "not allowed"}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--fhl-color-surface-soft)] px-3 py-1.5">
              <HiOutlineNoSymbol className="h-3.5 w-3.5 text-[var(--fhl-color-primary)]" />
              Smoking {listing.allowsSmoking ? "allowed" : "not allowed"}
            </span>
          </div>

          <span className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--fhl-color-primary-strong)] text-sm font-bold text-[var(--fhl-navy-text)] transition group-hover:bg-[var(--fhl-color-accent)] group-hover:text-[var(--fhl-color-accent-contrast)]">
            View details
            <HiOutlineArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </a>

      <FavoriteButton
        isFavorite={isFavorite}
        isSaving={isFavoriteSaving}
        onToggle={onToggleFavorite}
        className="absolute right-4 top-4 z-20 !h-11 !w-11"
      />
    </article>
  );
}
