import { FiHome } from 'react-icons/fi'
import { StatItem } from './StatItem'

const meta = {
  title: 'Components/StatItem',
  component: StatItem,
  parameters: {
    layout: 'centered',
  },
  args: {
    icon: FiHome,
    value: '2',
    label: 'Beds',
  },
}

export default meta

export const Default = {}

export const Row = {
  render: (args) => (
    <div className="grid grid-cols-3 divide-x divide-[var(--fhl-color-border)] rounded-2xl border border-[var(--fhl-color-border)] bg-[var(--fhl-color-surface)] p-4">
      <StatItem {...args} value="2" label="Beds" />
      <StatItem {...args} value="2" label="Baths" />
      <StatItem {...args} value="950" label="Sq Ft" />
    </div>
  ),
}

export const Small = {
  args: {
    size: 'sm',
  },
}
