export default function Output({ code }) {
  return (
    
    <iframe
      srcDoc={code}
      title="Output"
      sandbox="allow-scripts"
      frameBorder="0"
      width="100%"
      height="100%"
      key={code.length} // force re-mount when code length changes
    />
  );
}
