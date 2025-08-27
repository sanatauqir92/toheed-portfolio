import { useState } from 'react';

{/* Accordion component */}

        type AccordionProps = {
          title: string;
          children: React.ReactNode;
        };

        const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
          const [open, setOpen] = useState(false);

          return (
            <div
              className={`bg-gradient-to-r from-[#0f2027] via-[#2c5364] to-[#1a2980] rounded-xl shadow-lg border border-[#00ffe7] transition-all duration-300`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-lg font-semibold text-[#00ffe7] tracking-wide uppercase focus:outline-none"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
              >
                <span>{title}</span>
                <span
                  className={`transform transition-transform duration-300 ${
                    open ? 'rotate-90' : ''
                  }`}
                >
                  <svg width="24" height="24" fill="none">
                    <path
                      d="M8 10l4 4 4-4"
                      stroke="#00ffe7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 px-6 ${
                  open ? 'max-h-fit py-2 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {children}
              </div>
            </div>
          );
        };

        export default Accordion;