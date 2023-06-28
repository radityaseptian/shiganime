export default function MoreButton(props) {
  return (
    <button
      {...props}
      className='px-4 py-2 w-full bg-sky-400 hover:bg-sky-500 rounded md:rounded-md mt-4 mb-8'
    >
      {props.text}
    </button>
  )
}
