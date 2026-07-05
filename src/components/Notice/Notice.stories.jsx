import { Notice, NOTICE_TONE } from "./Notice";

const meta = {
  title: "Feedback/Notice",
  component: Notice,
  args: {
    children: "Status message for forms and protected actions.",
  },
};

export default meta;

export const Info = {
  args: {
    tone: NOTICE_TONE.INFO,
  },
};

export const Success = {
  args: {
    tone: NOTICE_TONE.SUCCESS,
    children: "Changes were saved successfully.",
  },
};

export const Warning = {
  args: {
    tone: NOTICE_TONE.WARNING,
    children: "Check this field before continuing.",
  },
};

export const Error = {
  args: {
    tone: NOTICE_TONE.ERROR,
    children: "Something went wrong. Try again.",
  },
};
