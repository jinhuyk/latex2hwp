import { useState } from 'react';
import {stringify } from '../utils/parse';
import Latex from './Latex';
import '../styles/global.css';

export default function LatexToHwpConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = (value: string) => {
    setInput(value);
    const converted = stringify(value);
    setOutput(converted);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
    } catch (err) {
      alert('복사 실패: 클립보드를 사용할 수 없습니다.');
    }
  };

  const copiedMessageStyle: React.CSSProperties = {
    fontFamily: 'NanumSquare',
    fontWeight:600,
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    opacity: copied ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    pointerEvents: 'none',
  };

  return (
    <div style={{ position: 'relative' }}>
      {copied && <div style={copiedMessageStyle}>복사완료</div>}
      <div style={{ display: 'flex', height: '60vh', width: '100%', boxSizing: 'border-box', minHeight: '30vh' }}>
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', minHeight: '30vh' }}>
          <h2 style={{ margin: 0, marginBottom: '0.5rem' }}>LaTeX</h2>
          <textarea
            placeholder="Latex 수식을 입력하세요"
            value={input}
            onChange={(e) => handleConvert(e.target.value)}
            style={{
              flex: 1,
              resize: 'none',
              fontSize: '1rem',
              fontFamily: 'monospace',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              height: '100%',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ width: '50%',   display: 'flex', flexDirection: 'column', boxSizing: 'border-box', minHeight: '30vh' }}>
          <h2 style={{ margin: 0, marginBottom: '0.5rem' }}>Result</h2>
          <div
            onClick={handleCopy}
            style={{ flex: 1, cursor: 'pointer' }}
          >
            <pre style={{
              flex: 1,
              overflow: 'auto',
              background: '#f9f9f9',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '1rem',
              whiteSpace: 'pre-wrap',
              height: '100%',
              boxSizing: 'border-box',
              margin: 0,
            }}>
              {output || ''}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}