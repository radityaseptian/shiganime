/* eslint-disable react/prop-types */
export function Loading({ className = 'w-28 h-44 lg:w-full' }) {
  return (
    <>
      <div
        className={`${className} rounded-md grid place-content-center bg-zinc-700`}
      >
        <div
          className={`w-10 h-10 border-[5px] rounded-full border-slate-200 border-t-slate-700 animate-spin`}
        ></div>
      </div>
    </>
  )
}
export function LoadingAnimeDetail() {
  return (
    <>
      <div className='w-32 h-48 md:w-36 md:h-52 lg:w-40 lg:h-60 grid place-content-center bg-zinc-700'>
        <div
          className={`w-12 h-12 md:w-14 md:h-14 border-[5px] rounded-full border-slate-300 border-t-slate-700 animate-spin`}
        ></div>
      </div>
    </>
  )
}
export function LoadingVideoAnime() {
  return (
    <>
      <div className='w-full grid place-content-center h-72 md:h-80 lg:h-96 bg-zinc-700'>
        <div className='w-12 h-12 md:w-14 md:h-14 rounded-full border-slate-300 border-[5px] border-t-slate-700 animate-spin'></div>
      </div>
    </>
  )
}
