import React, { useEffect } from 'react';

const SitePreview: React.FC<{ url: string; index?: number }> = ({ url, index = 0 }) => {
  const [isClient, setIsClient] = React.useState(false);
  useEffect(() => { setIsClient(true); }, []);

  const [src, setSrc] = React.useState<string | null>(null);
  const [blocked, setBlocked] = React.useState(false);
  const timeoutRef = React.useRef<number | null>(null);
  const loadTimerRef = React.useRef<number | null>(null);

  useEffect(() => {
    const delay = Math.min(1500, 300 * index);
    loadTimerRef.current = window.setTimeout(() => {
      setSrc(url);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setBlocked(true);
      }, 6000);
    }, delay);

    return () => {
      if (loadTimerRef.current) { window.clearTimeout(loadTimerRef.current); loadTimerRef.current = null; }
      if (timeoutRef.current) { window.clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    };
  }, [url, index]);

  const handleLoad = () => {
    if (timeoutRef.current) { window.clearTimeout(timeoutRef.current); timeoutRef.current = null; }
  };

  if (!isClient) {
    return (
      <div className="mt-4 border border-white/5 rounded-md overflow-hidden bg-[#070707]">
        <div className="p-2 text-xs text-gray-400">Preview</div>
        <div className="relative w-full bg-black" style={{ minHeight: 800 }} />
      </div>
    );
  }

  return (
    <div className="mt-4 border border-white/5 rounded-md overflow-hidden bg-[#070707]">
      <div className="p-2 text-xs text-gray-400">Preview</div>
      {blocked ? (
        <div className="p-4 text-sm text-gray-300">Preview blocked — <a href={url} target="_blank" rel="noreferrer" className="underline">Open in new tab</a></div>
      ) : (
        <div style={{ width: '100%', maxWidth: 600, aspectRatio: '1 / 1', position: 'relative', minHeight: 600, background: '#000' }}>
          {src && (
            <iframe
              src={src}
              title={`preview-${src}`}
              width={600}
              height={600}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              onLoad={handleLoad}
              onError={() => { setBlocked(true); }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SitePreview;
