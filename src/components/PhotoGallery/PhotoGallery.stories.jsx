import { useState } from 'react'
import { PhotoGallery } from './PhotoGallery'

const SAMPLE_IMAGES = [
  {
    id: '1',
    publicUrl:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    label: 'Living room',
  },
  {
    id: '2',
    publicUrl:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
    label: 'Kitchen',
  },
  {
    id: '3',
    publicUrl:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    label: 'Bedroom',
  },
  {
    id: '4',
    publicUrl:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    label: 'Bathroom',
  },
]

function PhotoGalleryDemo(args) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="w-[42rem]">
      <PhotoGallery {...args} selectedIndex={selectedIndex} onSelectIndex={setSelectedIndex} />
    </div>
  )
}

const meta = {
  title: 'Components/PhotoGallery',
  component: PhotoGallery,
  parameters: {
    layout: 'centered',
  },
  args: {
    images: SAMPLE_IMAGES,
    badge: 'available',
    altText: 'Unit photo',
  },
  render: (args) => <PhotoGalleryDemo {...args} />,
}

export default meta

export const Default = {}

export const SinglePhoto = {
  args: {
    images: [SAMPLE_IMAGES[0]],
  },
}

export const NoPhotos = {
  args: {
    images: [],
  },
}
