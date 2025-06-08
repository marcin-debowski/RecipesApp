function Footer() {
  return (
    <footer className="w-full bg-white text-black py-6 flex justify-center shadow shadow-[0_-3px_6px_-4px_rgba(0,0,0,0.15)]">
      <div className="w-full max-w-screen-2xl px-4 flex flex-col items-center justify-center">
        <div className="text-center">
          <span className="font-semibold text-lg block">Tasty Recipes</span>
          <span className="block text-sm mt-1">&copy; {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer