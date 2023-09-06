export const NavBar: React.FC<{ onShowAbout: () => void }> = ({ onShowAbout }) => {
  return (
    <nav className="flex items-center justify-between flex-row bg-teal-500 p-6 text-white">
      <span className="font-sans font-bold text-xl tracking-tight md:block hidden">Edinburgh Short Term Let Application Explorer</span>
      <span className="font-sans font-bold text-xl tracking-tight md:hidden block">Edinburgh STL Explorer</span>
      <button onClick={onShowAbout} className="block  inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        <span className="hidden md:block">
          About
        </span>
        <svg className="w-6 h-6 text-white md:hidden " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
      </button >
    </nav>
  )
}
