/* eslint-disable react/prop-types */
export default function Container({ children }) {
  return (
    <>
      <div className='container mx-auto px-2 max-w-6xl mt-2 lg:flex gap-4'>{children}</div>
    </>
  )
}
