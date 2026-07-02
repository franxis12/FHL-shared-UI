import ExampleIcon from '../../assets/icons/example-icon.svg?react'
import { Card } from './Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Simple card',
    children: 'This card is part of a small shared component library sandbox.',
  },
}

export default meta

export const Default = {}

export const WithIcon = {
  args: {
    title: 'Card with icon',
    icon: ExampleIcon,
    children: 'The icon prop accepts an SVG imported as a React component.',
  },
}
