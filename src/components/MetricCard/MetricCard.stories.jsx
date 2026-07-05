import ExampleIcon from '../../assets/icons/example-icon.svg?react'
import { MetricCard } from './MetricCard'

const meta = {
  title: 'Components/MetricCard',
  component: MetricCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Pending Payments',
    value: 0,
    hint: 'Waiting for payment',
    icon: ExampleIcon,
  },
}

export default meta

export const Default = {}
