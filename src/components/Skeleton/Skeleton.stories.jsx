import { Container } from "../Container";
import { Skeleton, SKELETON_RADIUS } from "./Skeleton";

const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  args: {
    className: "h-4 w-full",
  },
};

export default meta;

export const Lines = {
  render: (args) => (
    <Container className="w-full max-w-xl" contentClassName="space-y-3">
      <Skeleton {...args} className="h-4 w-full" />
      <Skeleton {...args} className="h-4 w-11/12" />
      <Skeleton {...args} className="h-4 w-8/12" />
    </Container>
  ),
};

export const Card = {
  render: (args) => (
    <Container className="w-full max-w-sm" contentClassName="space-y-4" shadow>
      <Skeleton
        {...args}
        className="h-44 w-full"
        radius={SKELETON_RADIUS.XL}
      />
      <Skeleton {...args} className="h-4 w-3/5" />
      <Skeleton {...args} className="h-4 w-full" />
      <Skeleton {...args} className="h-4 w-2/3" />
      <Skeleton
        {...args}
        className="h-11 w-full"
        radius={SKELETON_RADIUS.FULL}
      />
    </Container>
  ),
};

export const Avatar = {
  args: {
    className: "h-14 w-14",
    radius: SKELETON_RADIUS.FULL,
  },
};
