import { Select } from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
  args: {
    label: "Property type",
    defaultValue: "",
    children: (
      <>
        <option value="">Any type</option>
        <option value="single_family">Single Family</option>
        <option value="multi_family">Multi Family</option>
        <option value="studio">Studio</option>
      </>
    ),
  },
};

export default meta;

export const Default = {};
