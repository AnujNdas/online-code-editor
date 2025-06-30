import { useState } from "react";
import { Plus, Folder, File } from "lucide-react";

// Recursive TreeItem component
const TreeItem = ({ item, depth = 0, onSelect }) => {
  const [expanded, setExpanded] = useState(true);

  if (item.type === "folder") {
    return (
      <div style={{ paddingLeft: depth * 12 }}>
        <div
          className="flex items-center gap-1 text-yellow-400 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <Folder className="w-4 h-4" />
          <span>{item.name}</span>
        </div>
        {expanded &&
          item.children?.map((child, index) => (
            <TreeItem
              key={index}
              item={child}
              depth={depth + 1}
              onSelect={onSelect}
            />
          ))}
      </div>
    );
  }

  return (
    <div
      style={{ paddingLeft: depth * 12 }}
      className="px-1 text-blue-100 rounded cursor-pointer hover:bg-gray-800"
      onClick={() => onSelect(item.name)}
    >
      <div className="flex items-center gap-1">
        <File className="w-4 h-4" />
        <span>{item.name}</span>
      </div>
    </div>
  );
};

export default function FileTree({
  files,
  onSelectFile,
  selectedFile,
  onCreateFile,
  onDeleteFile,
}) {
  const [newFileName, setNewFileName] = useState("");
  const [showMobileFiles, setShowMobileFiles] = useState(false);

  return (
    <div className="relative">
      {/* Mobile toggle button */}
      <div className="flex items-center justify-between p-2 text-white bg-gray-900 sm:hidden">
        <span className="font-semibold">Files</span>
        <button
          onClick={() => setShowMobileFiles(!showMobileFiles)}
          className="px-2 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600"
        >
          {showMobileFiles ? "Hide" : "Show"}
        </button>
      </div>

      {/* File panel (mobile collapsible) */}
      <div
        className={`p-2 bg-gray-800 sm:block ${
          showMobileFiles ? "block" : "hidden"
        }`}
      >
        <div className="mb-2">
          <input
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            className="w-full px-2 py-1 text-sm rounded"
            placeholder="New file name"
          />
          <button
            onClick={() => {
              if (newFileName.trim()) {
                onCreateFile(newFileName.trim());
                setNewFileName("");
              }
            }}
            className="w-full py-1 mt-1 text-sm text-white bg-gray-600 rounded hover:bg-blue-700"
          >
            Create File
          </button>
        </div>

        <ul>
          {files.map((file) => (
            <li
              key={file}
              className={`flex items-center justify-between px-2 py-1 text-sm text-white rounded cursor-pointer bg-gray-900 ${
                selectedFile === file ? "bg-gray-600" : "hover:bg-gray-500"
              }`}
            >
              <span onClick={() => onSelectFile(file)} className="flex-1">
                {file}
              </span>
              <button
                onClick={() => onDeleteFile(file)}
                className="ml-2 text-red-500 hover:text-red-700"
                title="Delete file"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
