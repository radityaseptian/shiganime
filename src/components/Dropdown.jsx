import { MdKeyboardArrowDown } from 'react-icons/md'

export default function Dropdown(props) {
  const { current, show, children, onClick } = props
  return (
    <div className='text-sm'>
      <button
        onClick={onClick}
        className='flex items-center rounded p-2 gap-1 bg-zinc-800'
      >
        <span>{current}</span>
        <MdKeyboardArrowDown />
      </button>
      <div className='relative'>
        {show && (
          <div className='absolute z-10 top-1 text-center left-0 rounded whitespace-nowrap bg-zinc-800'>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
export function Item(props) {
  return (
    <div {...props} className='py-2 px-4 cursor-pointer hover:bg-zinc-700'>
      {props.text}
    </div>
  )
}
