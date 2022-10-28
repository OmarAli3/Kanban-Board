import { useState } from "react";

type JSONFileReaderProps = {
  onContentReady: (data: string) => void;
};
export default function JSONFileReader(props: JSONFileReaderProps) {
  const { onContentReady } = props;

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
    <div className="flex flex-col gap-4">
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="relative text-white rounded-md p-2 shadow-sm hover:shadow-md text-xl font-medium w-[8ch]
                   after:content-['Import'] after:absolute after:inset-0 after:cursor-pointer after:z-10 after:bg-blue-600 
                   after:flex after:items-center after:justify-center      
                   "
      />
    </div>
  );
}
