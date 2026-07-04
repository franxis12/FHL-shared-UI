import { useState } from 'react'
import { ImageUploader } from './ImageUploader'

const meta = {
  title: 'Components/ImageUploader',
  component: ImageUploader,
  parameters: {
    layout: 'centered',
  },
}

export default meta

function SingleFileDemo(args) {
  const [value, setValue] = useState(null)
  const [error, setError] = useState('')

  return (
    <div className="w-[26rem]">
      <ImageUploader
        {...args}
        value={value}
        onChange={setValue}
        onError={setError}
      />
      {error ? <p className="mt-2 text-xs text-rose-600">{error}</p> : null}
    </div>
  )
}

function MultipleFilesDemo(args) {
  const [value, setValue] = useState([])
  const [error, setError] = useState('')

  return (
    <div className="w-[30rem]">
      <ImageUploader
        {...args}
        value={value}
        onChange={setValue}
        onError={setError}
      />
      {error ? <p className="mt-2 text-xs text-rose-600">{error}</p> : null}
    </div>
  )
}

export const Single = {
  render: (args) => <SingleFileDemo {...args} />,
  args: {
    label: 'Property cover photo',
    helperText: 'Required. Use a photo of the full property.',
    required: true,
    maxSizeBytes: 2 * 1024 * 1024,
  },
}

export const Multiple = {
  render: (args) => <MultipleFilesDemo {...args} />,
  args: {
    label: 'Common area photos',
    helperText: 'Optional. Up to 12 photos, max 2MB each.',
    multiple: true,
    maxFiles: 12,
    maxSizeBytes: 2 * 1024 * 1024,
  },
}
