export default function Content({ children }) {
  return (
    <>
      <ul className='text-sm place-content-center grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-5 gap-2 p-2 bg-zinc-800 min-h-[12rem]'>
        {children}
      </ul>
    </>
  )
}
