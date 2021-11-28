import Viewer from '@/components/Viewer';
import LoadingDots from '@/components/ui/LoadingDots';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/useUser';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase-client'

export default function ProjectPage() {

    const { userLoaded, user, session, userDetails } = useUser();
    const [project, setProject] = useState(null);
    const [paths, setPaths] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { id } = router.query

    console.log(userDetails, id)
    useEffect(() => {
        getProject()
    }, [userLoaded]) //user, session, userDetails

    async function getProject() {
        setLoading(true);
        if (!userLoaded) return []
        const { data, error, status } = await supabase.from('projects').select('id, user_id, name, pictures').eq('id', id).single()
        if (error) throw error
        console.log(data)
        setLoading(false);
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
        <div className='max-w-screen-lg mx-auto p-12'>
            {loading ? <div className='w-16 pt-16 mx-auto'><LoadingDots /></div> :
                <div>
                    <h1 className='text-3xl py-12 font-bold'>{project ? project.name : ''}</h1>
                    <div>{paths && paths.length ? <Viewer images={paths}></Viewer> : 'This product doesn\'t contain any images'}</div>
                    <div className='my-8'>
                        <label className='mb-4 text-xl font-bold block w-40'>Mode</label>
                        <select className="border border-gray-200 rounded p-2 w-40" name="cars" id="cars" form="carform">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>
                    <div className='py-8'>
                        <label className='mb-4 text-xl font-bold block'>Embed</label>
                        <div className='w-full text-accents-2 font-mono border rounded bg-primary-2 border-gray-200 p-8'>
                            {`<iframe width="500" height="500" src="${process.env.ROOT_URL}/embed/${id}"></iframe>`}
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}