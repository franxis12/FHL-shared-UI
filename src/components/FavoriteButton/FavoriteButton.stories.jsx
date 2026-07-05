import { useState } from 'react'
import { FavoriteButton } from './FavoriteButton'

function FavoriteButtonDemo(args) {
  const [isFavorite, setIsFavorite] = useState(Boolean(args.isFavorite))

  return (
    <div
      className="relative flex h-40 w-64 items-center justify-center rounded-2xl"
      style={{ backgroundColor: 'var(--fhl-primary-navy)' }}
    >
      <FavoriteButton
        {...args}
        isFavorite={isFavorite}
        onToggle={setIsFavorite}
      />
    </div>
  )
}

const meta = {
  title: 'Components/FavoriteButton',
  component: FavoriteButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    variant: 'floating',
    isFavorite: false,
    isSaving: false,
  },
  render: (args) => <FavoriteButtonDemo {...args} />,
}

export default meta

export const Floating = {}

export const FloatingSaved = {
  args: {
    isFavorite: true,
  },
}

export const Inline = {
  args: {
    variant: 'inline',
  },
  render: (args) => (
    <div className="rounded-2xl border border-[var(--fhl-color-border)] bg-[var(--fhl-color-surface)] p-4">
      <FavoriteButtonDemoInline {...args} />
    </div>
  ),
}

function FavoriteButtonDemoInline(args) {
  const [isFavorite, setIsFavorite] = useState(Boolean(args.isFavorite))
  return (
    <FavoriteButton {...args} isFavorite={isFavorite} onToggle={setIsFavorite} />
  )
}
