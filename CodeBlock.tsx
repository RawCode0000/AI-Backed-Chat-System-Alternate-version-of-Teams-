import React, { useState } from 'react';
import { Copy, Check, Code2, Sparkles, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  onAskAiToExplain?: (code: string, language: string) => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  filename,
  onAskAiToExplain,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="my-2.5 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 font-mono text-xs shadow-md">
      {/* Code Header Bar */}
      <div className="px-3 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-semibold text-slate-200">{filename || `snippet.${language}`}</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px] uppercase">
            {language}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {onAskAiToExplain && (
            <button
              onClick={() => onAskAiToExplain(code, language)}
              className="flex items-center space-x-1 px-2 py-0.5 rounded bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30 transition-colors text-[10px] font-sans font-medium"
            >
              <Sparkles className="w-3 h-3 text-yellow-300" />
              <span>Explain with AI</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-[10px]"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body with line numbers */}
      <div className="p-3 overflow-x-auto max-h-80 leading-relaxed font-mono">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-900/50">
                <td className="select-none text-slate-600 text-right pr-4 w-8 font-mono text-[10px] align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre text-slate-200">
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
