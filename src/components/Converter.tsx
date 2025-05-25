import { useState } from 'react';
import { convertFullLatex } from '../utils/convertLatex';
import Latex from './Latex';
import '../styles/global.css';

export default function LatexToHwpConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = (value: string) => {
    setInput(value);
    const converted = convertFullLatex(value);
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
  return (
    <div>
      <h1><Latex></Latex> to Hwp Converter</h1>
      <div>
        이 툴은 Latex 수식을 Hwp format으로 변환해주는 용도입니다.<br/><br/>
        한글 파일에 붙어넣기를 한 후, 백틱 부분만 오려내기 후 수식입력기에 붙여넣기 후 저장하면됩니다.<br/>
        더 편하게 사용하기 위해서는 스크립트 매크로를 사용하여 자동으로 변환할수 있습니다<br/>
        사용방법은 밑에 한글가이드를 이용하면 됩니다.<br/>
        <br/>
        <strong style={{ color: 'red' }}>!Note:</strong> 해당 변환은 <strong>완벽</strong>하지 않으므로, 참고하여 사용하고, 약간의 변경이 필요할 수 있습니다.
        <br/>
        <div>
          현재까지 가능한 작업은 다음과 같습니다.
          <ul>
            <li><strong>수식 변환 - 2025.05.25 부로 가능</strong></li>
            <li>링크 이미지 변환 - 진행 중, 스크립트 매크로로 사용 가능</li>
            <li>표 변환 - 개발 중</li>
            <li>추후 작성 예정...</li>
          </ul>
        </div>
      </div>
      <textarea
        placeholder="Paste your Latex Code here"
        value={input}
        onChange={(e) => handleConvert(e.target.value)}
        rows={10}
      />

      <h2>Convert Result</h2>
      <button onClick={handleCopy} style={{ marginTop: '0.5rem' }}>
          {copied ? '✅ Copied' : '📋  Copy?'}
        </button>
      <pre>{output || 'auto converting... (noting Pasted..)'}</pre>
    </div>
  );
}
 