export default function Title({ title, center = false }) {
  return (
    <div className={`${center && 'text-center'} p-2 bg-sky-400 text-black`}>
      <h2 className='text-lg'>{title}</h2>
    </div>
  )
}
