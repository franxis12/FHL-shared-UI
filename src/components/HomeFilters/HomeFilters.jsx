import { useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const BOOLEAN_FILTER_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

function formatOptionLabel(value) {
  return String(value || "")
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const labelClass = "flex flex-col gap-1.5";
const labelTextClass =
  "text-xs font-semibold tracking-wide text-[var(--fhl-color-text-muted)] uppercase";
const controlClass =
  "h-10 rounded-xl border border-[var(--fhl-color-border)] bg-[var(--fhl-color-surface)] px-3 text-sm text-[var(--fhl-color-text)] placeholder:text-[var(--fhl-color-text-muted)] outline-none transition focus:border-[var(--fhl-color-primary)]";

export function HomeFilters({
  filters,
  propertyTypeOptions = [],
  onFilterChange,
  onClearFilters,
}) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const activeAdvancedFilters = useMemo(() => {
    const activeFilters = [];

    if (filters.zipcode) {
      activeFilters.push({
        field: "zipcode",
        label: `Zip ${filters.zipcode}`,
        resetValue: "",
        mobileOnly: true,
      });
    }

    if (filters.propertyType) {
      activeFilters.push({
        field: "propertyType",
        label: formatOptionLabel(filters.propertyType),
        resetValue: "",
      });
    }

    if (filters.minBedrooms) {
      activeFilters.push({
        field: "minBedrooms",
        label:
          filters.minBedrooms === "0"
            ? "Studio"
            : `${filters.minBedrooms}+ beds`,
        resetValue: "",
      });
    }

    if (filters.minBathrooms) {
      activeFilters.push({
        field: "minBathrooms",
        label: `${filters.minBathrooms}+ baths`,
        resetValue: "",
      });
    }

    if (filters.minSquareFeet) {
      activeFilters.push({
        field: "minSquareFeet",
        label: `${filters.minSquareFeet}+ sq ft`,
        resetValue: "",
      });
    }

    if (filters.minParkingSpaces) {
      activeFilters.push({
        field: "minParkingSpaces",
        label: `${filters.minParkingSpaces}+ parking`,
        resetValue: "",
      });
    }

    if (filters.petsAllowed !== "any") {
      activeFilters.push({
        field: "petsAllowed",
        label: filters.petsAllowed === "yes" ? "Pets allowed" : "No pets",
        resetValue: "any",
      });
    }

    if (filters.allowsSmoking !== "any") {
      activeFilters.push({
        field: "allowsSmoking",
        label:
          filters.allowsSmoking === "yes" ? "Smoking allowed" : "No smoking",
        resetValue: "any",
      });
    }

    return activeFilters;
  }, [filters]);

  const keepMoreFiltersOpen = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleMoreFiltersClose = () => {
    keepMoreFiltersOpen();
    closeTimerRef.current = window.setTimeout(() => {
      setIsMoreOpen(false);
    }, 550);
  };

  const handleChange = (field) => (event) => {
    onFilterChange(field, event.target.value);
  };

  const handleMoreFiltersBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      scheduleMoreFiltersClose();
    }
  };

  return (
    <section
      id="search"
      className="relative z-20 -mt-14 rounded-3xl border border-[var(--fhl-color-border)] bg-[var(--fhl-color-surface)] p-4 md:-mt-16 md:p-5"
      style={{ boxShadow: "0 10px 28px var(--fhl-color-shadow)" }}
    >
      <div className="grid grid-cols-2 gap-2 md:grid-cols-[5fr_1fr_2fr_2fr]">
        <label className={`${labelClass} col-span-2 md:col-span-1`}>
          <span className={labelTextClass}>Search</span>
          <span className="relative">
            <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--fhl-color-primary)]" />
            <input
              type="text"
              value={filters.searchText}
              onChange={handleChange("searchText")}
              placeholder="City, address, property, or unit"
              className={`${controlClass} w-full pl-9`}
            />
          </span>
        </label>

        <label className={`${labelClass} hidden md:flex`}>
          <span className={labelTextClass}>Zip</span>
          <input
            type="text"
            value={filters.zipcode}
            onChange={handleChange("zipcode")}
            inputMode="numeric"
            placeholder="33101"
            className={controlClass}
          />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Min</span>
          <input
            type="number"
            value={filters.minPrice}
            onChange={handleChange("minPrice")}
            placeholder="$ Min"
            min="0"
            className={controlClass}
          />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Max</span>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={handleChange("maxPrice")}
            placeholder="$ Max"
            min="0"
            className={controlClass}
          />
        </label>
      </div>

      <div
        className="mt-3 space-y-3 border-t border-[var(--fhl-color-border)] pt-3"
        onBlur={handleMoreFiltersBlur}
        onMouseEnter={keepMoreFiltersOpen}
        onMouseLeave={scheduleMoreFiltersClose}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMoreOpen((current) => !current)}
              onFocus={keepMoreFiltersOpen}
              className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full px-1 text-xs font-semibold text-[var(--fhl-color-primary-strong)] transition hover:text-[var(--fhl-color-primary)]"
              aria-expanded={isMoreOpen}
            >
              More filters
              <span
                className={`text-[10px] transition ${
                  isMoreOpen ? "rotate-180" : ""
                }`}
              >
                ⌄
              </span>
            </button>

            {activeAdvancedFilters.map((filter) => (
              <button
                key={filter.field}
                type="button"
                onClick={() => onFilterChange(filter.field, filter.resetValue)}
                className={`h-8 items-center gap-1.5 rounded-full bg-[var(--fhl-color-hover-soft)] px-3 text-xs font-semibold text-[var(--fhl-color-text)] transition hover:bg-[var(--fhl-color-selected-soft)] ${
                  filter.mobileOnly ? "inline-flex md:hidden" : "inline-flex"
                }`}
                title={`Remove ${filter.label}`}
              >
                {filter.label}
                <span className="text-base leading-none text-[var(--fhl-color-alert)]">
                  ×
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onClearFilters}
            className="h-8 rounded-full bg-[var(--fhl-color-accent)] px-3 text-xs font-semibold text-[var(--fhl-color-accent-contrast)] transition hover:brightness-95"
          >
            Clear
          </button>
        </div>

        <div
          className={`home-filters-more-panel-shell ${
            isMoreOpen ? "is-open" : ""
          }`}
          aria-hidden={!isMoreOpen}
          inert={isMoreOpen ? undefined : true}
        >
          <div className="home-filters-more-panel grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
            <label className={`${labelClass} md:hidden`}>
              <span className={labelTextClass}>Zip</span>
              <input
                type="text"
                value={filters.zipcode}
                onChange={handleChange("zipcode")}
                inputMode="numeric"
                placeholder="33101"
                className={controlClass}
              />
            </label>

            <label className={labelClass}>
              <span className={labelTextClass}>Property type</span>
              <select
                value={filters.propertyType}
                onChange={handleChange("propertyType")}
                className={controlClass}
              >
                <option value="">Any type</option>
                {propertyTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {formatOptionLabel(type)}
                  </option>
                ))}
              </select>
            </label>

            <label className={labelClass}>
              <span className={labelTextClass}>Bedrooms</span>
              <select
                value={filters.minBedrooms}
                onChange={handleChange("minBedrooms")}
                className={controlClass}
              >
                <option value="">Any</option>
                <option value="0">Studio</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </label>

            <label className={labelClass}>
              <span className={labelTextClass}>Bathrooms</span>
              <select
                value={filters.minBathrooms}
                onChange={handleChange("minBathrooms")}
                className={controlClass}
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="1.5">1.5+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </label>

            <label className={labelClass}>
              <span className={labelTextClass}>Min sq ft</span>
              <input
                type="number"
                value={filters.minSquareFeet}
                onChange={handleChange("minSquareFeet")}
                placeholder="e.g. 900"
                min="0"
                className={controlClass}
              />
            </label>

            <label className={labelClass}>
              <span className={labelTextClass}>Min parking</span>
              <select
                value={filters.minParkingSpaces}
                onChange={handleChange("minParkingSpaces")}
                className={controlClass}
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </label>

            <label className={labelClass}>
              <span className={labelTextClass}>Pets</span>
              <select
                value={filters.petsAllowed}
                onChange={handleChange("petsAllowed")}
                className={controlClass}
              >
                {BOOLEAN_FILTER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className={labelClass}>
              <span className={labelTextClass}>Smoking</span>
              <select
                value={filters.allowsSmoking}
                onChange={handleChange("allowsSmoking")}
                className={controlClass}
              >
                {BOOLEAN_FILTER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
