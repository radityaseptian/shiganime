export default function Iframe({ src }) {
  return (
    <div className='relative w-full h-0 min-h-[16rem] pb-[56.25%]'>
      <iframe
        src={src}
        allowFullScreen={true}
        scrolling='no'
        className='absolute top-0 left-0 w-full h-full m-0 border-none outline-none'
      ></iframe>
    </div>
  )
}
