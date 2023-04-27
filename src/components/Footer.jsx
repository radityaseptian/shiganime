/* eslint-disable react/prop-types */
import { FaReact, FaFacebookF, FaGithub } from 'react-icons/fa'
import { SiTailwindcss } from 'react-icons/si'

export default function Footer(props) {
  const {bgColor = 'bg-white'} = props 

  return (
    <>
      <footer className={`${bgColor} flex flex-col`}>
        <svg
          className='leading-none'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
        >
          <path
            fill='#292524'
            d='M0,96L26.7,112C53.3,128,107,160,160,160C213.3,160,267,128,320,144C373.3,160,427,224,480,208C533.3,192,587,96,640,90.7C693.3,85,747,171,800,176C853.3,181,907,107,960,90.7C1013.3,75,1067,117,1120,117.3C1173.3,117,1227,75,1280,69.3C1333.3,64,1387,96,1413,112L1440,128L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z'
          ></path>
        </svg>
        <div className='leading-none w-full pb-8 text-slate-100 h-24 flex justify-evenly gap-4 bg-stone-800'>
          <div className='grid place-content-center text-center mb-2'>
            <h4 className='text-sm md:text-lg lg:text-md'>-RMS_15-</h4>
            <p className='text-xs md:text-sm mt-1 sm:mt-3'>
              Built using react <FaReact className='inline-block' /> and
              tailwind
              <SiTailwindcss className='ml-1 inline-block' />
            </p>
          </div>
          <div className='grid place-content-center text-center'>
            <h4 className='text-xs sm:text-sm lg:text-md'>Find me on social media</h4>
            <div className='flex justify-center gap-6 mt-1 sm:mt-3'>
              <FaFacebookF className='p-2 box-content hover:bg-black/40 rounded-md border-1 border-slate-800' />
              <FaGithub className='p-2 box-content hover:bg-black/40 rounded-md' />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
