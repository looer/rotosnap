import Viewer from '@/components/Viewer';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/useUser';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase-client'

export default function ProjectPage() {
    let [project, setProject] = useState(null);
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        getProject()
    }, [id])

    async function getProject() {
        const { data, error, status } = await supabase.from('projects').select('id, name, pictures').eq('id', id).single()
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
            {paths && paths.length ? <Viewer images={paths} embed={true}></Viewer> : 'Product not found'}
        </div >
    )
}