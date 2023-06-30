export default function Button(props) {
  return (
    <button
      {...props}
      className={`${props.className} flex items-center gap-1 px-4 py-2 border-2 rounded border-slate-400`}
    >
      {props.children || props.text}
    </button>
  )
}
