import Viewer from '@/components/Viewer';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/useUser';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase-client'
import Image from 'next/image'

export default function ProjectPage() {
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

    const { userLoaded, user, session, userDetails } = useUser();
    let [project, setProject] = useState(null);
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        getProject()
    }, [id])

    async function getProject() {
        const { data, error, status } = await supabase.from('projects').select('id, user_id, name, pictures').eq('id', id).single()
        if (error) throw error
        console.log(data)
        setProject(data)
    }

    const [paths, setPaths] = useState([])
    useEffect(() => {
        getPublicUrls()
    }, [project])

    async function getPublicUrls() {
        if (project) {
            let _paths = [];
            for (const picture of project.pictures) {
                let newPicture = await downloadImage(picture);
                _paths.push(newPicture);
            }
            setPaths(_paths)
        }
    }

    async function downloadImage(path) {
        try {
            const { data, error } = await supabase.storage.from('avatars').getPublicUrl(path)

            if (error) {
                throw error
            }
            //const url = URL.createObjectURL(data)
            console.log("Image url: ", data.publicURL)
            return data.publicURL;
        }
        catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    }


    return (
        <div>
            {paths && paths.length ? <Viewer images={paths}></Viewer> : 'Product not found'}
        </div >
    )
}