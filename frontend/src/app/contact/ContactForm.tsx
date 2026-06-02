'use client';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useRef, useState } from 'react';

export default function ContactForm() {
  const [result, setResult] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult('loading');
    const formData = new FormData(event.currentTarget);
    formData.append('access_key', 'ae36c57e-4685-4133-b2ee-e0836043ea1e');
    if (captchaToken) {
      formData.append('h-captcha-response', captchaToken);
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setResult(data.success ? 'success' : 'error');
    if (data.success) {
      (event.target as HTMLFormElement).reset();
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 max-w-lg">
      <h2 className="text-lg font-semibold">Connect with me</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500"
      />
      <textarea
        name="message"
        placeholder="Message"
        rows={5}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500 resize-none"
      />
      <HCaptcha
        sitekey="ae36c57e-4685-4133-b2ee-e0836043ea1e"
        reCaptchaCompat={false}
        onVerify={(token) => setCaptchaToken(token)}
        ref={captchaRef}
      />
      <button
        type="submit"
        disabled={result === 'loading'}
        className="self-start px-6 py-2 rounded-full bg-[#211814] text-white text-sm font-medium hover:bg-amber-800 transition-colors disabled:opacity-50"
      >
        {result === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      {result === 'success' && (
        <p className="text-green-600 text-sm">Message sent!</p>
      )}
      {result === 'error' && (
        <p className="text-red-500 text-sm">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
