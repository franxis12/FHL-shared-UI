import { FiMessageSquare } from "react-icons/fi";
import { Textarea, TEXTAREA_STATUS } from "./Textarea";

const meta = {
  title: "Forms/Textarea",
  component: Textarea,
  args: {
    label: "Additional notes",
    placeholder: "Type here...",
    helperText: "Use this field for longer written responses.",
  },
};

export default meta;

export function Default(args) {
  return (
    <div className="max-w-xl">
      <Textarea {...args} />
    </div>
  );
}

export function WithIcon(args) {
  return (
    <div className="max-w-xl">
      <Textarea {...args} icon={FiMessageSquare} selected />
    </div>
  );
}

export function ErrorState(args) {
  return (
    <div className="max-w-xl">
      <Textarea
        {...args}
        status={TEXTAREA_STATUS.ERROR}
        statusMessage="Please include a short explanation."
        defaultValue=""
      />
    </div>
  );
}
