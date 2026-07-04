import { DefinitionList } from './DefinitionList'

const meta = {
  title: 'Components/DefinitionList',
  component: DefinitionList,
  parameters: {
    layout: 'centered',
  },
  args: {
    items: [
      { key: 'available', label: 'Available from', value: 'Now' },
      { key: 'term', label: 'Lease term', value: '12 months' },
      { key: 'pets', label: 'Pets', value: 'Allowed' },
      { key: 'parking', label: 'Parking', value: '1 spot included' },
      { key: 'smoking', label: 'Smoking', value: 'Not allowed' },
    ],
  },
}

export default meta

export const Default = {
  render: (args) => (
    <div className="w-80 rounded-2xl border border-[var(--fhl-color-border)] bg-[var(--fhl-color-surface)] p-6">
      <DefinitionList {...args} />
    </div>
  ),
}
