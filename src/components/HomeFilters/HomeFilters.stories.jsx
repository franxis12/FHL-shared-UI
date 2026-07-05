import { useState } from 'react'
import { HomeFilters } from './HomeFilters'

const DEFAULT_FILTERS = {
  searchText: '',
  zipcode: '',
  minPrice: '',
  maxPrice: '',
  propertyType: '',
  minBedrooms: '',
  minBathrooms: '',
  minSquareFeet: '',
  minParkingSpaces: '',
  petsAllowed: 'any',
  allowsSmoking: 'any',
}

function HomeFiltersDemo(args) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  return (
    <div className="w-full max-w-4xl pt-16">
      <HomeFilters
        {...args}
        filters={filters}
        onFilterChange={(field, value) =>
          setFilters((previous) => ({ ...previous, [field]: value }))
        }
        onClearFilters={() => setFilters(DEFAULT_FILTERS)}
      />
    </div>
  )
}

const meta = {
  title: 'Components/HomeFilters',
  component: HomeFilters,
  parameters: {
    layout: 'padded',
  },
  args: {
    propertyTypeOptions: [
      'single_family',
      'multi_family',
      'apartment_building',
      'studio',
      'duplex',
      'triplex',
      'commercial',
    ],
  },
  render: (args) => <HomeFiltersDemo {...args} />,
}

export default meta

export const Default = {}
