import ExampleIcon from '../../assets/icons/example-icon.svg?react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Click me',
    variant: 'primary',
    disabled: false,
  },
}

export default meta

export const Primary = {}

export const Secondary = {
  args: {
    children: 'Secondary button',
    variant: 'secondary',
  },
}

export const Disabled = {
  args: {
    children: 'Disabled button',
    disabled: true,
  },
}

export const WithIcon = {
  args: {
    children: 'Button with icon',
    icon: ExampleIcon,
  },
}
