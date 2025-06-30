import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import CodeEditor from "./components/Editor";
import Output from "./components/Output";
import FileTree from "./components/File_tree";

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("Code copied to clipboard!");
  } catch {
    alert("Failed to copy!");
  }
};

const boilerplates = {
  "index.html": `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`,
  "style.css": `body {
  font-family: Arial, sans-serif;
  background-color: #121212;
  color: white;
}`,
  "app.js": `document.addEventListener("DOMContentLoaded", function () {
  console.log("JS Loaded!");
});`,
};

export default function App() {
  const [fileContents, setFileContents] = useState(() => {
    const saved = localStorage.getItem("fileContents");
    return saved ? JSON.parse(saved) : boilerplates;
  });

  const [selectedFile, setSelectedFile] = useState(() => {
    const saved = localStorage.getItem("selectedFile");
    const contents = localStorage.getItem("fileContents");
    const keys = contents ? Object.keys(JSON.parse(contents)) : Object.keys(boilerplates);
    return saved && keys.includes(saved) ? saved : keys[0];
  });

  const [code, setCode] = useState(fileContents[selectedFile] || "");
  const [debouncedCode] = useDebounce(code, 500);
  const [outputSrcDoc, setOutputSrcDoc] = useState("");

  useEffect(() => {
    setCode(fileContents[selectedFile] || "");
  }, [selectedFile]);

  useEffect(() => {
    setFileContents((prev) => {
      const updated = { ...prev, [selectedFile]: code };
      localStorage.setItem("fileContents", JSON.stringify(updated));
      return updated;
    });

    // Auto-run the code
    setOutputSrcDoc(generateSrcDoc());
  }, [debouncedCode]);


  useEffect(() => {
    localStorage.setItem("selectedFile", selectedFile);
  }, [selectedFile]);

  function handleAddFile() {
    const name = prompt("Enter new file name (e.g., newfile.html):");
    if (!name) return;

    const ext = name.split(".").pop();
    const boilerplate = boilerplates[name] || boilerplates["index." + ext] || "";

    if (fileContents[name]) {
      alert("File already exists!");
      return;
    }

    setFileContents((prev) => ({
      ...prev,
      [name]: boilerplate,
    }));
    setSelectedFile(name);
  }

  const handleDeleteFile = (filename) => {
    if (window.confirm(`Are you sure you want to delete ${filename}?`)) {
      const updatedFiles = { ...fileContents };
      delete updatedFiles[filename];

      setFileContents(updatedFiles);

      const remainingFiles = Object.keys(updatedFiles);
      setSelectedFile(remainingFiles[0] || "");
    }
  };

  const generateSrcDoc = () => {
    const htmlCode = fileContents["index.html"] || "";
    const cssCode = fileContents["style.css"] || "";
    const jsCode = fileContents["app.js"] || "";

    return `
      <html>
        <head><style>${cssCode}</style></head>
        <body>
          ${htmlCode}
          <script>${jsCode}<\/script>
        </body>
      </html>
    `;
  };


  const handleRun = () => {
    const doc = generateSrcDoc();
    setOutputSrcDoc(doc);
  };

  return (
    <div className="flex w-full h-screen bg-gray-950">
      <div className="flex flex-col w-64 bg-blue-900 border-r border-gray-800">
        <div className="p-2 bg-gray-900 border-b border-gray-800">
          <button
            onClick={handleAddFile}
            className="w-full py-1 text-white bg-gray-800 rounded hover:bg-blue-700"
          >
            + New File
          </button>
        </div>
        <div className="flex-1 overflow-auto bg-gray-900">
          <FileTree
            files={Object.keys(fileContents)}
            onSelectFile={setSelectedFile}
            selectedFile={selectedFile}
            onCreateFile={handleAddFile}
            onDeleteFile={handleDeleteFile}
          />
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex flex-row items-center gap-2 p-2 bg-gray-600">
          <span className="text-gray-400">{selectedFile}</span>
          <button
            onClick={handleRun}
            className="px-2 ml-auto text-white bg-gray-900 rounded hover:bg-gray-700"
          >
            ▶ 
          </button>
          <button
            onClick={() => copyToClipboard(generateSrcDoc())}
            className="px-2 text-white bg-gray-900 rounded hover:bg-gray-700"
          >
            ⧉
          </button>
          <button
            onClick={() => {
              localStorage.setItem("fileContents", JSON.stringify(boilerplates));
              localStorage.setItem("selectedFile", "index.html");
              setFileContents(boilerplates);
              setSelectedFile("index.html");
              setOutputSrcDoc("");
            }}
            className="px-2 text-white bg-gray-900 rounded hover:bg-gray-700"
          >
            ↻
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-3/5 h-full">
            <CodeEditor
              language={
                selectedFile.endsWith(".css")
                  ? "css"
                  : selectedFile.endsWith(".js")
                  ? "javascript"
                  : "html"
              }
              code={code}
              setCode={setCode}
            />
          </div>
          <div className="w-2/5 h-full border-l border-gray-800">
            <Output code={outputSrcDoc} />
          </div>
        </div>
      </div>
    </div>
  );
}
