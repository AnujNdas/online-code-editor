import Editor from '@monaco-editor/react'

export default function CodeEditor({ language, code, setCode }) {
  return (
    <Editor
      key={language} // force re-render when language changes
      height="100%"
      language={language}
      value={code}
      theme="vs-dark"
      onChange={(value) => setCode(value || '')}
      options={{
        fontSize: 16,
        minimap: { enabled: false },
        automaticLayout: true,
      }}
    />
  )
}
