import Viewer from '@/components/Viewer';
import { useState, useEffect } from 'react';
import { FileDrop } from 'react-file-drop'
import { useRouter } from 'next/router';
import { useUser } from '@/utils/useUser';
import GoingUp from '@/components/icons/GoingUp';
import { supabase } from '@/utils/supabase-client'
import Button from '@/components/ui/Button';

export default function LandingPage() {
  const [pictures, setPictures] = useState([])
  const router = useRouter();

  const loadFiles = (files) => {
    console.log(files)
    const pics = [...files].map(f => URL.createObjectURL(f))
    console.log(pics)
    setPictures(pics)
  }

  const { userLoaded, user, session, userDetails, subscription } = useUser();

  useEffect(() => {
    if (user) router.replace('/dashboard');
  }, [user]);

  const garzaImages = ['/Garza/F31 garza-360-01.jpg', '/Garza/F31 garza-360-02.jpg', '/Garza/F31 garza-360-03.jpg',
    '/Garza/F31 garza-360-04.jpg', '/Garza/F31 garza-360-05.jpg', '/Garza/F31 garza-360-06.jpg',
    '/Garza/F31 garza-360-07.jpg', '/Garza/F31 garza-360-08.jpg', '/Garza/F31 garza-360-09.jpg',
    '/Garza/F31 garza-360-10.jpg', '/Garza/F31 garza-360-11.jpg', '/Garza/F31 garza-360-12.jpg',
    '/Garza/F31 garza-360-13.jpg', '/Garza/F31 garza-360-14.jpg', '/Garza/F31 garza-360-15.jpg',
    '/Garza/F31 garza-360-16.jpg', '/Garza/F31 garza-360-17.jpg', '/Garza/F31 garza-360-18.jpg',
    '/Garza/F31 garza-360-19.jpg', '/Garza/F31 garza-360-20.jpg', '/Garza/F31 garza-360-21.jpg',
    '/Garza/F31 garza-360-22.jpg', '/Garza/F31 garza-360-23.jpg', '/Garza/F31 garza-360-24.jpg',
    '/Garza/F31 garza-360-25.jpg', '/Garza/F31 garza-360-26.jpg', '/Garza/F31 garza-360-27.jpg',
    '/Garza/F31 garza-360-28.jpg', '/Garza/F31 garza-360-29.jpg', '/Garza/F31 garza-360-30.jpg',
    '/Garza/F31 garza-360-31.jpg', '/Garza/F31 garza-360-32.jpg'
  ]

  return <div>
    <div>
      <div className="px-3 flex flex-wrap flex-col py-16 md:pt-16 md:flex-row items-center justify-center">
        <div className="flex flex-col w-full justify-center text-center md:w-2/5 md:text-left">
          <h1 className="my-4 text-5xl text-primary font-extrabold leading-tight text-center">Add 360˚<br />interactive views<br />in minutes</h1>
          <p className="leading-normal text-xl text-accents-3 mb-8 text-center">Integrate 360 views of your products into your website.</p>
          <a href="/pricing" className="inline-block self-center text-center mx-auto lg:mx-0 hover:underline bg-primary text-secondary font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow z-10">Sign Up!</a>
        </div>
        <div className="md:pl-20 pl-0 z-10">
          <Viewer images={garzaImages} />
        </div>
      </div>
      <div className="relative -mt-12 lg:-mt-24">
        <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g transform="scaleY(-1)" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fillRule="nonzero">
              <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
              <path d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z" opacity="0.100000001"></path>
              <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
            </g>
            <g transform="translate(-4.000000, 76.000000)" fill="#FFFFFF" fillRule="nonzero">
              <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
            </g>
          </g>
        </svg>
      </div>
      <section className="tx-lg border-b py-8 bg-white">
        <div className="container max-w-5xl mx-auto m-8">
          <h1 className="w-full my-2 text-4xl font-bold leading-tight text-center text-black">Drop some pictures to try it live!</h1>
          <div className="mt-8 flex flex-col items-center justify-center">
            {pictures.length > 0 ? <Viewer images={pictures} /> :
              <div onDrop={e => e.preventDefault()} className="mx-auto text-center w-full my-0 py-5 rounded-t text-black">
                <form>
                  <FileDrop onDrop={(files, e) => { loadFiles(files) }}>
                    <div id='droppable'
                      className='py-20 m-5 border-2 border-gray-300 bg-transparent border-dashed rounded-xl hover:bg-gray-100'>
                      <label className='space-y-2' for="demoPictures">
                        <div className="mt-4">Drag and drop images here</div>
                        <div className="text-sm">OR</div>
                        <Button variant="slim" type='neutral'>Select images</Button>
                      </label>
                      <input hidden type="file"
                        id="demoPictures" name="demoPictures"
                        accept="image/png, image/jpeg"
                        multiple={true}
                        onChange={e => {
                          console.log(e.target.files)
                          loadFiles(e.target.files)
                        }}>

                      </input>

                    </div>
                  </FileDrop>
                </form>
              </div>
            }
          </div>
        </div>
      </section>
    </div >
    <section className="tx-lg bg-white border-b py-8">
      <div className="container max-w-5xl mx-auto m-8">
        <h1 className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800">360 views increase conversions</h1>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-5/6 sm:w-1/2 p-6">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3"></h3>
            <div className="text-lg text-gray-600 mb-8">
              But setting them up can be a real pain. You need to figure out JavaScript, hosting, and repeat for every product.
            </div>

          </div>
          <div className="w-full sm:w-1/2 p-6 flex flex-row space-between">
            <img className="w-1/2 p-2 object-contain" src="https://d33wubrfki0l68.cloudfront.net/5817627dcc2d2dbd79f91bbf95d102cd7b2668a4/6f0de/assets/success.png" />
            <img className="w-1/2 p-2 object-contain" src="https://d33wubrfki0l68.cloudfront.net/cb45b114dacdd8dee53f7749ccd6b1009f368133/47053/assets/fail.png" />
          </div>
        </div>

        <div className="flex flex-wrap flex-col-reverse sm:flex-row">
          <div className="w-full sm:w-1/2 p-6 mt-6">

            <img className="" src="/undraw_Photograph.png" />

          </div>
          <div className="w-full sm:w-1/2 p-6 mt-6 flex">
            <div className="align-middle">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">A Better Way</h3>
              <p className="text-lg text-gray-600 mb-8">RotoSnap offers a plug-and-play solution to embed 360 views of your products – or anything else for that matter – on your website.<br /><br />
              </p>

            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-5/6 sm:w-1/2 p-6">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 mt-6">Upload and embed. Done.</h3>
            <p className="text-lg text-gray-600 mb-8">RotoSnap takes care of all the heavy lifting surrounding file upload and hosting.The widget hooks into an input with class of simple-file-upload and replaces it with a dropzone.The user drops a file and the file is automatically uploaded to cloud storage via a direct upload.Files are served via a CDN which is imperitive in today's modern megabyte-sized website world. <br /><br />
            </p></div>
          <div className="w-full sm:w-1/2 p-6">
            <img className="w-5/6 sm:h-64 mx-auto mt-6" src="https://d33wubrfki0l68.cloudfront.net/9475b01d7e8f54ea97bf17911c0882e6a89c32ee/ff7af/assets/server.svg" />
          </div>
        </div>

        <div className="flex flex-wrap flex-col-reverse sm:flex-row">
          <div className="w-full sm:w-1/2 p-6 mt-6">
            <GoingUp />
          </div>
          <div className="w-full sm:w-1/2 p-6 mt-6">
            <div className="align-middle">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">Will it work for me?</h3>
              <p className="text-lg text-gray-600 mb-8">Yes! It can work with all kinds of languages and backends. RotoSnap can be embedded into any HTML using an iframe or via a javascript snippet or React component.<br /><br />
              </p></div>
          </div>
        </div>
      </div>
    </section>
    <section className="container mx-auto text-center py-6 mb-12">
      <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-black">Try it now!</h1>
      <div className="w-full mb-4">

      </div>
      <h3 className="my-4 p-5 text-xl leading-tight">Sign up for a free 7 day trial! </h3>

      <a href="/pricing" className="mx-auto lg:mx-0 hover:underline bg-primary text-secondary font-bold
  rounded-full my-10 py-4 px-8 shadow-lg">Sign Up</a>


    </section>
  </div >;
}