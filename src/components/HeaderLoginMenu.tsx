import { Menu, Transition } from '@headlessui/react';
import { Fragment, useCallback } from 'react';
import { User2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

function socialSignIn(provider: 'google'|'linkedin') {
  const redirect = encodeURIComponent(window.location.href);
  const url = `${API_URL}/auth/${provider}?redirect_uri=${redirect}`;
  window.location.href = url;
}

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="w-6 h-6"><path fill="#FFC107" d="M43.6 20.5h-1.9V20H24v8h11.3C33.6 31.9 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.3 2.8l5.7-5.7C33.3 7 28.9 5.3 24 5.3 12.6 5.3 3.3 14.6 3.3 26S12.6 46.7 24 46.7 44.7 37.4 44.7 26c0-1.9-.2-3.3-1.1-5.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.8 15.7 19 13 24 13c2.8 0 5.3 1 7.3 2.8l5.7-5.7C33.3 7 28.9 5.3 24 5.3c-7.7 0-14.3 4.4-17.7 10.8z"/><path fill="#4CAF50" d="M24 46.7c5.1 0 9.6-1.7 13.1-4.6l-6.1-5c-2 1.4-4.6 2.2-7 2.2-5.2 0-9.6-3.3-11.2-8l-6.6 5.1C9.5 41.9 16.1 46.7 24 46.7z"/><path fill="#1976D2" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.3 3.9-5.1 7-11.3 7-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.3 2.8l5.7-5.7C33.3 7 28.9 5.3 24 5.3 12.6 5.3 3.3 14.6 3.3 26S12.6 46.7 24 46.7 44.7 37.4 44.7 26c0-1.9-.2-3.3-1.1-5.5z"/></svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
    <path fill="#0A66C2" d="M20.447 20.452H17.2v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.943v5.663H9.067V9h3.121v1.561h.045c.435-.825 1.498-1.695 3.082-1.695 3.295 0 3.903 2.17 3.903 4.992v6.594zM5.337 7.433A1.812 1.812 0 1 1 5.34 3.81a1.812 1.812 0 0 1-.003 3.623zM6.92 20.452H3.75V9H6.92v11.452z"/>
  </svg>
);

export default function HeaderLoginMenu() {
  const onGoogle = useCallback(() => socialSignIn('google'), []);
  const onLinkedIn = useCallback(() => socialSignIn('linkedin'), []);

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/90 hover:bg-white text-slate-800 border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Entrar"
      >
        <User2 className="w-5 h-5" />
        <span>Entrar</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Menu.Items
          className="absolute right-0 mt-2 w-80 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-slate-200 focus:outline-none p-2"
        >
          {/* caret */}
          <div className="absolute -top-2 right-6 h-4 w-4 rotate-45 bg-white ring-1 ring-slate-200 rounded-sm" aria-hidden />

          <Menu.Item>
            {({ active }: { active: boolean }) => (
              <button
                onClick={onLinkedIn}
                className={`w-full text-left ${active ? 'bg-slate-50' : ''} flex items-center gap-3 p-3 rounded-lg`}
              >
                <LinkedInIcon />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900">Entre ou registre-se com</span>
                  <span className="text-xs text-slate-600">LinkedIn</span>
                </div>
              </button>
            )}
          </Menu.Item>

          <div className="my-1 h-px bg-slate-100" />

          <Menu.Item>
            {({ active }: { active: boolean }) => (
              <button
                onClick={onGoogle}
                className={`w-full text-left ${active ? 'bg-slate-50' : ''} flex items-center gap-3 p-3 rounded-lg`}
              >
                <GoogleIcon />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900">Entre ou registre-se com</span>
                  <span className="text-xs text-slate-600">Google</span>
                </div>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
