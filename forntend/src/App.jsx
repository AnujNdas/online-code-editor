import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import CodeEditor from './components/Editor'
import Output from './components/Output'

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('Code copied to clipboard!')
  } catch (err) {
    alert('Failed to copy!')
  }
}

const defaultHtml = '<h1>Hello World</h1>'
const defaultCss = 'h1 { color: red; }'
const defaultJs = 'console.log("Hello from JS")'

export default function App() {
const [html, setHtml] = useState(() => localStorage.getItem('html') || defaultHtml)
const [css, setCss] = useState(() => localStorage.getItem('css') || defaultCss)
const [js, setJs] = useState(() => localStorage.getItem('js') || defaultJs)

  const [activeTab, setActiveTab] = useState('html')

  const [debouncedHtml] = useDebounce(html, 500)
  const [debouncedCss] = useDebounce(css, 500)
  const [debouncedJs] = useDebounce(js, 500)

  useEffect(() => {
    localStorage.setItem('html', html)
  }, [debouncedHtml])

  useEffect(() => {
    localStorage.setItem('css', css)
  }, [debouncedCss])

  useEffect(() => {
    localStorage.setItem('js', js)
  }, [debouncedJs])

  const generateSrcDoc = () => `
    <html>
      <head><style>${debouncedCss}</style></head>
      <body>
        ${debouncedHtml}
        <script>${debouncedJs}<\/script>
      </body>
    </html>
  `

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-950 text-white">
      {/* Tab buttons */}
      <div className="flex flex-col">
<div className="flex gap-2 bg-gray-800 p-2 items-center">
  {['html', 'css', 'js'].map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-1 rounded ${
        activeTab === tab
          ? 'bg-blue-600 text-white'
          : 'bg-gray-600 text-gray-300'
      }`}
    >
      {tab.toUpperCase()}
    </button>
  ))}

  {/* Copy All Button */}
  <button
    onClick={() => copyToClipboard(generateSrcDoc())}
    className="ml-auto px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
  >
    Copy All
  </button>

  {/* Reset Button */}
  <button
    onClick={() => {
      setHtml(defaultHtml)
      setCss(defaultCss)
      setJs(defaultJs)
      localStorage.setItem('html', defaultHtml)
      localStorage.setItem('css', defaultCss)
      localStorage.setItem('js', defaultJs)
    }}
    className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
  >
    Reset Code
  </button>
</div>



      <div className="flex-1 overflow-hidden">
        <CodeEditor
          language={activeTab}
          code={
            activeTab === 'html' ? html : activeTab === 'css' ? css : js
          }
          setCode={
            activeTab === 'html' ? setHtml : activeTab === 'css' ? setCss : setJs
          }
        />
      </div>
      </div>

      <div className="w-full lg:w-1/2 bg-gray-950">
      <Output code={generateSrcDoc()} />
    </div>
    </div>
  )
}
