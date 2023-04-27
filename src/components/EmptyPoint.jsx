/* eslint-disable react/prop-types */
import Rekomendasi from './Rekomendasi'

export default function EmptyPoint({className, loading}) {
  return <Rekomendasi className={className} refresh={true} loading={loading} />
}
