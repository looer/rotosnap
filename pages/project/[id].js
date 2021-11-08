import Viewer from '@/components/Viewer';
import { useRouter } from 'next/router';

export default function ProjectPage() {
    const garzaImages = ['/Garza/F31 garza-360-01.jpg', '/Garza/F31 garza-360-02.jpg', '/Garza/F31 garza-360-03.jpg',
        '/Garza/F31 garza-360-04.jpg', '/Garza/F31 garza-360-05.jpg', '/Garza/F31 garza-360-06.jpg',
        '/Garza/F31 garza-360-07.jpg', '/Garza/F31 garza-360-08.jpg', '/Garza/F31 garza-360-09.jpg',
        '/Garza/F31 garza-360-10.jpg', '/Garza/F31 garza-360-11.jpg', '/Garza/F31 garza-360-12.jpg',]
    const router = useRouter()
    const { id } = router.query
    return (
        <div>
            <h1 className='text-5xl m-5 text-bold text-center'>Project {id}</h1>
            <Viewer images={garzaImages}></Viewer>
        </div>
    )
}