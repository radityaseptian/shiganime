/* eslint-disable react/prop-types */
export default function Loading({ style }) {
  return (
    <>
      <div
        className={`w-full h-full rounded-md border-[1.2px] border-black/50 shadow-md bg-slate-200`}
      >
        <div
          className={`${style} rounded-md flex items-center justify-center bg-slate-300`}
        >
          <div
            className={`w-11 h-11 md:w-16 md:h-16 border-[5px] rounded-full border-slate-200 border-t-slate-700 animate-spin`}
          ></div>
        </div>
      </div>
    </>
  )
}
export function LoadingRekomendasi() {
  return (
    <>
      <div
        className={`rounded-md h-32 w-44 lg:h-52 lg:w-full flex items-center justify-center bg-slate-300`}
      >
        <div
          className={`w-12 h-12 md:w-14 md:h-14 border-[5px] rounded-full border-slate-200 border-t-slate-700 animate-spin`}
        ></div>
      </div>
    </>
  )
}
export function LoadingAnimeDetail() {
  return (
    <>
      <div className='w-32 h-48 md:w-36 md:h-52 lg:w-40 lg:h-60 grid place-content-center bg-slate-200'>
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
      <div className='w-full grid place-content-center h-72 md:h-80 lg:h-96 bg-slate-100'>
        <div className='w-12 h-12 md:w-14 md:h-14 rounded-full border-slate-300 border-[5px] border-t-slate-700 animate-spin'></div>
      </div>
    </>
  )
}
