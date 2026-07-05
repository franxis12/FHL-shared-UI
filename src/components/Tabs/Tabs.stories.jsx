import { useState } from 'react'
import { Tabs } from './Tabs'

const ITEMS = [
  { key: 'overview', label: 'Overview', href: '#overview' },
  { key: 'amenities', label: 'Amenities', href: '#amenities' },
  { key: 'features', label: 'Features', href: '#features' },
  { key: 'location', label: 'Location', href: '#location' },
  { key: 'reviews', label: 'Reviews', href: '#reviews' },
]

function TabsDemo(args) {
  const [activeKey, setActiveKey] = useState(ITEMS[0].key)

  return (
    <div className="w-[36rem]">
      <Tabs {...args} activeKey={activeKey} onSelect={setActiveKey} />
    </div>
  )
}

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  args: {
    items: ITEMS,
  },
  render: (args) => <TabsDemo {...args} />,
}

export default meta

export const Default = {}
