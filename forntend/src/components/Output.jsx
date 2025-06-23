// src/components/Output.jsx
export default function Output({ code }) {
  return (
    <iframe
      className="w-full h-full bg-white"
      srcDoc={code}
      title="output"
      sandbox="allow-scripts"
    />
  )
}
