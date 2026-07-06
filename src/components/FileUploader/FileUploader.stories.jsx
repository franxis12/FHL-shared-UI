import { useState } from "react";
import { FileUploader, FILE_UPLOADER_STATUS } from "./FileUploader";

const meta = {
  title: "Forms/FileUploader",
  component: FileUploader,
  args: {
    label: "Income proof",
    helperText: "Upload PDF, JPG, or PNG files.",
    multiple: true,
  },
};

export default meta;

function Demo(args) {
  const [files, setFiles] = useState([
    {
      id: "stub-1",
      name: "paystub-june.pdf",
      detail: "PDF · 284 KB",
    },
  ]);

  return (
    <div className="max-w-2xl">
      <FileUploader
        {...args}
        files={files}
        onFilesSelect={(nextFiles) =>
          setFiles((previous) => [
            ...previous,
            ...nextFiles.map((file, index) => ({
              id: `${file.name}-${file.size}-${index}`,
              name: file.name,
              detail: `${file.type || "file"} · ${Math.max(
                1,
                Math.round(file.size / 1024),
              )} KB`,
            })),
          ])
        }
        onRemoveFile={(fileItem) =>
          setFiles((previous) =>
            previous.filter((entry) => entry.id !== fileItem.id),
          )
        }
      />
    </div>
  );
}

export function Default(args) {
  return <Demo {...args} />;
}

export function ErrorState(args) {
  return (
    <div className="max-w-2xl">
      <FileUploader
        {...args}
        files={[]}
        status={FILE_UPLOADER_STATUS.ERROR}
        statusMessage="Upload at least one file before continuing."
      />
    </div>
  );
}
