import Viewer from '@/components/Viewer';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/useUser';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase-client'

export default function ProjectPage() {

    const { userLoaded, user, session, userDetails } = useUser();
    const [project, setProject] = useState(null);
    const [paths, setPaths] = useState([])
    const router = useRouter()
    const { id } = router.query

    console.log(userDetails, id)
    useEffect(() => {
        getProject()
    }, [userLoaded]) //user, session, userDetails

    async function getProject() {
        if (!userLoaded) return []
        const { data, error, status } = await supabase.from('projects').select('id, user_id, name, pictures').eq('id', id).single()
        if (error) throw error
        console.log(data)
        setProject(data)
    }

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
        <div className='max-w-screen-lg mx-auto px-12 mb-12'>
            <h1 className='text-3xl my-12 font-bold'>{project ? project.name : ''}</h1>
            <div>{paths && paths.length ? <Viewer images={paths}></Viewer> : 'This product doesn\'t contain any images'}</div>
        </div >
    )
}