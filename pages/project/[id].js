import Viewer from '@/components/Viewer';
import LoadingDots from '@/components/ui/LoadingDots';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/useUser';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase-client'

export default function ProjectPage({ user }) {

    //const { userLoaded, user, session, userDetails } = useUser();
    const [project, setProject] = useState(null);
    const [paths, setPaths] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { id } = router.query

    //console.log(userDetails, id)
    useEffect(() => {
        getProject()
    }, [user]) //user, session, userDetails

    async function getProject() {
        setLoading(true);
        if (!user) return []
        const { data, error, status } = await supabase.from('projects').select('id, user_id, name, pictures').eq('id', id).eq('user_id', user.id).single()
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
        <div>
            {loading ? <div className='w-16 pt-16 mx-auto'><LoadingDots /></div> :
                <div>
                    <h1 className='text-lg text-center py-4 bg-white border-b border-gray-200 font-bold'>{project ? project.name : ''}</h1>
                    <div className='flex h-100'>
                        <div className='flex-grow flex items-center'>{paths && paths.length ?
                            <Viewer images={paths}></Viewer>
                            : 'This product doesn\'t contain any images'}</div>
                        <div className='w-80 bg-white p-8 flex-grow-0'>
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
                    </div>
                </div>
            }
        </div >
    )
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        // If no user, redirect to index.
        return { props: {}, redirect: { destination: '/', permanent: false } }
    }

    // If there is a user, return it.
    return { props: { user } }
}