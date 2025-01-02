import './App.css'
import { useRecoilValue } from 'recoil'
import {pageLoading, SalesAtom} from './store/store'
import { WavyBars } from 'spinny-loader'
import SpinnyWrapper from "spinny-loader/wrapper";

function App() {
  const userData = useRecoilValue(pageLoading)

  return (
    <>
      <div></div>
      <div className='w-full h-screen flex justify-center items-center'>
        {
          userData? <SpinnyWrapper backgroundEffect={false}><WavyBars></WavyBars></SpinnyWrapper>: null
        }
        </div>
      <div></div>
    </>
  )
}

export default App
