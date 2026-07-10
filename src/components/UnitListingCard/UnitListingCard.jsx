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
import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

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
            <div className="flex h-44 items-center justify-center bg-[var(--fhl-color-surface-soft)]">
              <Text
                as="span"
                size={TEXT_SIZE.SM}
                tone={TEXT_TONE.MUTED}
                weight={TEXT_WEIGHT.MEDIUM}
              >
                No image available
              </Text>
            </div>
          )}
        </div>

        <div className="px-5 pb-5">
          <Text
            as="span"
            size={TEXT_SIZE.XS}
            tone={TEXT_TONE.MUTED}
            weight={TEXT_WEIGHT.BOLD}
            uppercase
            className="mb-3 inline-flex rounded-full bg-[var(--fhl-color-surface-soft)] px-2.5 py-1"
          >
            {propertyType}
          </Text>

          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Text
                as="h3"
                size={TEXT_SIZE.LG}
                weight={TEXT_WEIGHT.BOLD}
                truncate
                className="tracking-tight"
              >
                {listing.unit.unitName}
              </Text>
              <div className="mt-1.5 flex items-center gap-1.5">
                <HiOutlineMapPin className="h-4 w-4 shrink-0 text-[var(--fhl-color-primary)]" />
                <Text
                  as="span"
                  size={TEXT_SIZE.XS}
                  tone={TEXT_TONE.MUTED}
                  weight={TEXT_WEIGHT.MEDIUM}
                  truncate
                >
                  {formatListingLocation(listing.property)}
                </Text>
              </div>
            </div>

            <Text
              as="p"
              size={TEXT_SIZE.LG}
              weight={TEXT_WEIGHT.BOLD}
              align="right"
              className="shrink-0 tracking-tight"
            >
              {hasRentAmount ? currency.format(rentAmount) : "Price"}
              <Text
                as="span"
                size={TEXT_SIZE.XS}
                tone={TEXT_TONE.MUTED}
                weight={TEXT_WEIGHT.SEMIBOLD}
                className="ml-1"
              >
                {hasRentAmount ? "/month" : "not set"}
              </Text>
            </Text>
          </div>

          <div className="mb-3 border-t border-[var(--fhl-color-border)]" />

          <div className="mb-3 grid grid-cols-3 divide-x divide-[var(--fhl-color-border)] text-center">
            <div className="flex items-center justify-center gap-2 px-1">
              <HiOutlineHomeModern className="h-5 w-5 text-[var(--fhl-color-primary)]" />
              <div className="text-left">
                <Text
                  as="p"
                  size={TEXT_SIZE.SM}
                  weight={TEXT_WEIGHT.BOLD}
                >
                  {formatOptionalNumber(listing.bedrooms)}
                </Text>
                <Text
                  as="p"
                  size={TEXT_SIZE.XS}
                  tone={TEXT_TONE.MUTED}
                  weight={TEXT_WEIGHT.SEMIBOLD}
                  className="text-[11px]"
                >
                  Beds
                </Text>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 px-1">
              <HiOutlineBeaker className="h-5 w-5 text-[var(--fhl-color-primary)]" />
              <div className="text-left">
                <Text
                  as="p"
                  size={TEXT_SIZE.SM}
                  weight={TEXT_WEIGHT.BOLD}
                >
                  {formatOptionalNumber(listing.bathrooms)}
                </Text>
                <Text
                  as="p"
                  size={TEXT_SIZE.XS}
                  tone={TEXT_TONE.MUTED}
                  weight={TEXT_WEIGHT.SEMIBOLD}
                  className="text-[11px]"
                >
                  Baths
                </Text>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 px-1">
              <HiOutlineArrowsPointingOut className="h-5 w-5 text-[var(--fhl-color-primary)]" />
              <div className="text-left">
                <Text
                  as="p"
                  size={TEXT_SIZE.SM}
                  weight={TEXT_WEIGHT.BOLD}
                >
                  {formatOptionalNumber(listing.squareFeet)}
                </Text>
                <Text
                  as="p"
                  size={TEXT_SIZE.XS}
                  tone={TEXT_TONE.MUTED}
                  weight={TEXT_WEIGHT.SEMIBOLD}
                  className="text-[11px]"
                >
                  Sq Ft
                </Text>
              </div>
            </div>
          </div>

          <div className="mb-3 border-t border-[var(--fhl-color-border)]" />

          <div className="mb-4 flex flex-wrap gap-2">
            <Text
              as="span"
              size={TEXT_SIZE.XS}
              weight={TEXT_WEIGHT.SEMIBOLD}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--fhl-color-surface-soft)] px-3 py-1.5 text-[11px]"
            >
              <HiOutlineTruck className="h-3.5 w-3.5 text-[var(--fhl-color-primary)]" />
              {hasParking
                ? `${formatOptionalNumber(listing.parkingSpaces)} parking`
                : "No parking"}
            </Text>
            <Text
              as="span"
              size={TEXT_SIZE.XS}
              weight={TEXT_WEIGHT.SEMIBOLD}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--fhl-color-surface-soft)] px-3 py-1.5 text-[11px]"
            >
              <HiOutlineSparkles className="h-3.5 w-3.5 text-[var(--fhl-color-primary)]" />
              Pets {listing.petsAllowed ? "allowed" : "not allowed"}
            </Text>
            <Text
              as="span"
              size={TEXT_SIZE.XS}
              weight={TEXT_WEIGHT.SEMIBOLD}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--fhl-color-surface-soft)] px-3 py-1.5 text-[11px]"
            >
              <HiOutlineNoSymbol className="h-3.5 w-3.5 text-[var(--fhl-color-primary)]" />
              Smoking {listing.allowsSmoking ? "allowed" : "not allowed"}
            </Text>
          </div>

          <Text
            as="span"
            size={TEXT_SIZE.SM}
            tone={TEXT_TONE.INHERIT}
            weight={TEXT_WEIGHT.BOLD}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--fhl-color-primary-strong)] text-[var(--fhl-navy-text)] transition group-hover:bg-[var(--fhl-color-accent)] group-hover:text-[var(--fhl-color-accent-contrast)]"
          >
            View details
            <HiOutlineArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Text>
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
