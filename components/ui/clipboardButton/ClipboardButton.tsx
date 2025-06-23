import { useState } from 'react';

const CopyTotalButton = ({ total }: { total: number | null }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (total === null || total === undefined) return;

    navigator.clipboard.writeText(total.toString()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="w-[250px] md:w-[250px] px-6 py-2 flex items-center justify-center gap-2 rounded-md font-semibold uppercase tracking-wide
                 bg-[#4a5568] hover:bg-[#2d3748] text-white
                 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white
                 transition duration-200 shadow-sm hover:shadow-md
                 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 384 512"
        fill="currentColor"
      >
        <path d="M192 0c17.7 0 32 14.3 32 32v16h40c13.3 0 24 10.7 24 24v16H96V72c0-13.3 
          10.7-24 24-24h40V32c0-17.7 14.3-32 32-32zM384 160v288c0 35.3-28.7 64-64 
          64H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h40v24c0 13.3 10.7 24 24 
          24h128c13.3 0 24-10.7 24-24v-24h40c35.3 0 64 28.7 64 64zM169.4 388.7l120-120c6.2-6.2 
          6.2-16.4 0-22.6s-16.4-6.2-22.6 0L160 353.4l-42.6-42.6c-6.2-6.2-16.4-6.2-22.6 
          0s-6.2 16.4 0 22.6l56 56c6.2 6.2 16.4 6.2 22.6.0z"/>
      </svg>

      {copied ? 'Copied!' : 'Copy total value'}
    </button>
  );
};

export default CopyTotalButton;
