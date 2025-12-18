import React, { useEffect } from 'react';

const InlinePreview: React.FC<{ url: string; index?: number; isGame?: boolean }> = ({ url, index = 0, isGame = false }) => {
  const [isClient, setIsClient] = React.useState(false);
  useEffect(() => { setIsClient(true); }, []);
  const [src, setSrc] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [blocked, setBlocked] = React.useState(false);
  const timeoutRef = React.useRef<number | null>(null);
  const loadTimerRef = React.useRef<number | null>(null);

  useEffect(() => {
    // stagger loads to avoid many concurrent iframe loads
    const delay = isGame ? Math.min(3000, 500 * index) : Math.min(1500, 300 * index);
    loadTimerRef.current = window.setTimeout(() => {
      setLoading(true);
      setSrc(url);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setBlocked(true);
        setLoading(false);
      }, 6000);
    }, delay);

    return () => {
      if (loadTimerRef.current) { window.clearTimeout(loadTimerRef.current); loadTimerRef.current = null; }
      if (timeoutRef.current) { window.clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, index]);

  // Render a lightweight placeholder until component mounts on the client
  if (!isClient) {
    return (
      <div className="mt-4 border border-white/5 rounded-md overflow-hidden bg-[#070707]">
        <div className="p-2 text-xs text-gray-400">Preview</div>
        <div className="relative w-full bg-black" style={{ minHeight: 800 }} />
      </div>
    );
  }

  const handleGameLoad = () => {
    // give the game a moment to initialize before marking loaded
    window.setTimeout(() => {
      setLoading(false);
      if (timeoutRef.current) { window.clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    }, 300);
  };

  const handleGenericLoad = () => {
    setLoading(false);
    if (timeoutRef.current) { window.clearTimeout(timeoutRef.current); timeoutRef.current = null; }
  };

  return (
    <div className="mt-4 border border-white/5 rounded-md overflow-hidden bg-[#070707]">
      <div className="p-2 text-xs text-gray-400">Preview</div>

      {blocked ? (
        <div className="p-4 text-sm text-gray-300">Preview blocked — <a href={url} target="_blank" rel="noreferrer" className="underline">Open in new tab</a></div>
      ) : (
        isGame ? (
          <div style={{ width: '100%', maxWidth: 800, aspectRatio: '1 / 1', position: 'relative', minHeight: 800, background: '#000' }}>
            {src && (
              <iframe
                src={src}
                title={`preview-${src}`}
                width={800}
                height={800}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                onLoad={handleGameLoad}
                onError={() => { setBlocked(true); setLoading(false); }}
                allow="autoplay; fullscreen; keyboard"
                allowFullScreen
              />
            )}
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: 800, aspectRatio: '1 / 1', position: 'relative', minHeight: 800, background: '#000' }}>
            {src && (
              <iframe
                src={src}
                title={`preview-${src}`}
                width={800}
                height={800}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                onLoad={handleGenericLoad}
                onError={() => { setBlocked(true); setLoading(false); }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default InlinePreview;
