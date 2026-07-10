import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import {
  Button,
  BUTTON_SHAPE,
  BUTTON_SIZE,
  BUTTON_VARIANT,
} from "../Button";
import {
  Container,
  CONTAINER_PADDING,
  CONTAINER_RADIUS,
} from "../Container";
import { Input } from "../Input";
import { Select } from "../Select";

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

const fieldClassName = "flex flex-col gap-1.5";
const compactLabelClassName =
  "text-xs font-semibold tracking-wide uppercase text-[var(--fhl-color-text-muted)]";
const compactInputContainerClassName =
  "min-h-10 rounded-xl border-[var(--fhl-color-border)] px-3 py-2 shadow-none";
const compactInputClassName = "text-sm";
const pillButtonClassName =
  "h-8 px-3 shadow-none transition-colors duration-200";

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
    <Container
      id="search"
      padding={CONTAINER_PADDING.NONE}
      radius={CONTAINER_RADIUS.XL}
      shadow={false}
      className="relative z-20 -mt-14 md:-mt-16"
      contentClassName="p-4 md:p-5"
      style={{ boxShadow: "0 10px 28px var(--fhl-color-shadow)" }}
    >
      <div className="grid grid-cols-2 gap-2 md:items-end md:grid-cols-[minmax(0,1fr)_11rem_11rem]">
        <Input
          label="Search"
          icon={HiOutlineMagnifyingGlass}
          type="text"
          value={filters.searchText}
          onChange={handleChange("searchText")}
          placeholder="City, address, property, or unit"
          className={`${fieldClassName} col-span-2 min-w-0 md:col-span-1`}
          labelClassName={compactLabelClassName}
          containerClassName={compactInputContainerClassName}
          inputClassName={compactInputClassName}
        />

        <Input
          label="Min"
          type="number"
          value={filters.minPrice}
          onChange={handleChange("minPrice")}
          placeholder="$ Min"
          min="0"
          className={fieldClassName}
          labelClassName={compactLabelClassName}
          containerClassName={compactInputContainerClassName}
          inputClassName={compactInputClassName}
        />

        <Input
          label="Max"
          type="number"
          value={filters.maxPrice}
          onChange={handleChange("maxPrice")}
          placeholder="$ Max"
          min="0"
          className={fieldClassName}
          labelClassName={compactLabelClassName}
          containerClassName={compactInputContainerClassName}
          inputClassName={compactInputClassName}
        />
      </div>

      <div
        className="mt-3 space-y-3 border-t border-[var(--fhl-color-border)] pt-3"
        onBlur={handleMoreFiltersBlur}
        onMouseEnter={keepMoreFiltersOpen}
        onMouseLeave={scheduleMoreFiltersClose}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              onClick={() => setIsMoreOpen((current) => !current)}
              onFocus={keepMoreFiltersOpen}
              variant={BUTTON_VARIANT.GHOST}
              size={BUTTON_SIZE.SM}
              shape={BUTTON_SHAPE.PILL}
              icon={FiChevronDown}
              iconPosition="end"
              iconClassName={`h-3 w-3 shrink-0 transition ${
                isMoreOpen ? "rotate-180" : ""
              }`}
              className="h-8 border-transparent px-1 text-[var(--fhl-color-primary-strong)] shadow-none hover:bg-transparent hover:text-[var(--fhl-color-primary)]"
              aria-expanded={isMoreOpen}
            >
              More filters
            </Button>

            {activeAdvancedFilters.map((filter) => (
              <Button
                key={filter.field}
                type="button"
                onClick={() => onFilterChange(filter.field, filter.resetValue)}
                variant={BUTTON_VARIANT.SECONDARY}
                size={BUTTON_SIZE.SM}
                shape={BUTTON_SHAPE.PILL}
                className={`${pillButtonClassName} inline-flex border-transparent bg-[var(--fhl-color-hover-soft)] text-[var(--fhl-color-text)] hover:bg-[var(--fhl-color-selected-soft)]`}
                title={`Remove ${filter.label}`}
              >
                {filter.label}
                <span className="text-base leading-none text-[var(--fhl-color-alert)]">
                  ×
                </span>
              </Button>
            ))}
          </div>

          <Button
            type="button"
            onClick={onClearFilters}
            variant={BUTTON_VARIANT.SECONDARY}
            size={BUTTON_SIZE.SM}
            shape={BUTTON_SHAPE.PILL}
            className={`${pillButtonClassName} border-transparent bg-[var(--fhl-color-accent)] text-[var(--fhl-color-accent-contrast)] hover:bg-[var(--fhl-color-accent)] hover:brightness-95`}
          >
            Clear
          </Button>
        </div>

        <div
          className={`home-filters-more-panel-shell ${
            isMoreOpen ? "is-open" : ""
          }`}
          aria-hidden={!isMoreOpen}
          inert={isMoreOpen ? undefined : true}
        >
          <div className="home-filters-more-panel grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
            <Input
              label="Zip"
              type="text"
              value={filters.zipcode}
              onChange={handleChange("zipcode")}
              inputMode="numeric"
              placeholder="33101"
              className={fieldClassName}
              labelClassName={compactLabelClassName}
              containerClassName={compactInputContainerClassName}
              inputClassName={compactInputClassName}
            />

            <Select
              label="Property type"
              value={filters.propertyType}
              onChange={handleChange("propertyType")}
              className={fieldClassName}
              labelClassName={compactLabelClassName}
              containerClassName={compactInputContainerClassName}
              selectClassName={compactInputClassName}
            >
              <option value="">Any type</option>
              {propertyTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {formatOptionLabel(type)}
                </option>
              ))}
            </Select>

            <Select
              label="Bedrooms"
              value={filters.minBedrooms}
              onChange={handleChange("minBedrooms")}
              className={fieldClassName}
              labelClassName={compactLabelClassName}
              containerClassName={compactInputContainerClassName}
              selectClassName={compactInputClassName}
            >
              <option value="">Any</option>
              <option value="0">Studio</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </Select>

            <Select
              label="Bathrooms"
              value={filters.minBathrooms}
              onChange={handleChange("minBathrooms")}
              className={fieldClassName}
              labelClassName={compactLabelClassName}
              containerClassName={compactInputContainerClassName}
              selectClassName={compactInputClassName}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="1.5">1.5+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </Select>

            <Input
              label="Min sq ft"
              type="number"
              value={filters.minSquareFeet}
              onChange={handleChange("minSquareFeet")}
              placeholder="e.g. 900"
              min="0"
              className={fieldClassName}
              labelClassName={compactLabelClassName}
              containerClassName={compactInputContainerClassName}
              inputClassName={compactInputClassName}
            />

            <Select
              label="Min parking"
              value={filters.minParkingSpaces}
              onChange={handleChange("minParkingSpaces")}
              className={fieldClassName}
              labelClassName={compactLabelClassName}
              containerClassName={compactInputContainerClassName}
              selectClassName={compactInputClassName}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </Select>

            <Select
              label="Pets"
              value={filters.petsAllowed}
              onChange={handleChange("petsAllowed")}
              className={fieldClassName}
              labelClassName={compactLabelClassName}
              containerClassName={compactInputContainerClassName}
              selectClassName={compactInputClassName}
            >
              {BOOLEAN_FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            <Select
              label="Smoking"
              value={filters.allowsSmoking}
              onChange={handleChange("allowsSmoking")}
              className={fieldClassName}
              labelClassName={compactLabelClassName}
              containerClassName={compactInputContainerClassName}
              selectClassName={compactInputClassName}
            >
              {BOOLEAN_FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </Container>
  );
}
