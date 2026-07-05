import { useState } from 'react'
import { UnitListingCard } from './UnitListingCard'

const SAMPLE_LISTING = {
  id: 'listing-1',
  title: 'Oak Street Apartments · Unit 3B',
  detailsPath: '#',
  coverImageUrl:
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  rentAmount: 1850,
  bedrooms: 2,
  bathrooms: 2,
  squareFeet: 950,
  parkingSpaces: 1,
  petsAllowed: true,
  allowsSmoking: false,
  property: {
    id: 'property-1',
    title: 'Oak Street Apartments',
    propertyType: 'apartment_building',
    city: 'Miami',
    state: 'FL',
    zipCode: '33101',
  },
  unit: {
    id: 'unit-1',
    unitName: 'Unit 3B',
  },
}

function UnitListingCardDemo(args) {
  const [isFavorite, setIsFavorite] = useState(Boolean(args.isFavorite))

  return (
    <div className="w-96">
      <UnitListingCard
        {...args}
        isFavorite={isFavorite}
        onToggleFavorite={setIsFavorite}
      />
    </div>
  )
}

const meta = {
  title: 'Components/UnitListingCard',
  component: UnitListingCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    listing: SAMPLE_LISTING,
    isFavorite: false,
    isFavoriteSaving: false,
  },
  render: (args) => <UnitListingCardDemo {...args} />,
}

export default meta

export const Default = {}

export const Saved = {
  args: {
    isFavorite: true,
  },
}

export const NoCoverImage = {
  args: {
    listing: { ...SAMPLE_LISTING, coverImageUrl: '' },
  },
}

export const PriceNotSet = {
  args: {
    listing: { ...SAMPLE_LISTING, rentAmount: null },
  },
}
