import { useState } from "react";

type JSONFileReaderProps = {
  onContentReady: (data: string) => void;
};
export default function JSONFileReader(props: JSONFileReaderProps) {
  const { onContentReady } = props;
  // a state to reset the input value after reading the file
  const [fileInputKey, setInputKey] = useState(new Date().getTime());
  const resetInput = () => setInputKey(new Date().getTime());

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!!file) {
      handleFileUpload(file);
    }
  };

  const handleFileRead = (e: ProgressEvent<FileReader>) => {
    const content = e.target?.result;
    if (!!content) {
      onContentReady(content.toString());
      resetInput();
    }
  };

  const handleFileUpload = (file: File) => {
    if (!!file) {
      const fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
    }
  };

  return (
    <div className="relative overflow-hidden bg-blue-600 text-white rounded-md p-2 shadow-sm hover:shadow-md text-xl font-medium">
      <button className="flex items-center justify-center focus:outline-none">
        Import
      </button>
      <input
        type="file"
        key={fileInputKey}
        accept=".json"
        onChange={handleFileChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  );
}
