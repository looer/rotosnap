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
    const [debug, setDebug] = useState(false)
    const [shadows, setShadows] = useState(true)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!user) {
            // If no user, redirect to index.
            console.error('no user logged in')
            if (!user) router.replace('/');
        } else {
            getProject()
        }
    }, [user])

    async function getProject() {
        setLoading(true);
        const { data, error, status } = await supabase.from('projects').select('id, user_id, name, pictures').eq('id', id).single()
        setProject(data)
        getPublicUrl(data)
        setLoading(false);
    }

    async function getPublicUrl(proj) {
        if (proj) {
            let firstURL = await downloadImage(proj.pictures[0]);
            const baseURL = firstURL.substring(0, firstURL.lastIndexOf("/") + 1);
            const _paths = proj.pictures.map(p => baseURL + p)
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
                    <div className='fixed top-0 w-full text-md text-center py-4 bg-white border-b border-gray-200 font-bold'>{project ? project.name : ''}</div>
                    <div className='flex h-screen'>
                        <div className='flex-grow flex items-center'>{paths && paths.length ?
                            <Viewer className='align-top' images={paths} debug={debug} embed={!shadows}></Viewer>
                            : 'This product doesn\'t contain any images'}
                        </div>
                        <div className='w-80 bg-white p-8 flex-grow'>
                            <div className='my-8'>
                                <label className='mb-4 text-xl font-bold block w-40'>Options</label>
                                <select className="border border-gray-200 rounded p-2 w-40" name="cars" id="cars" form="carform">
                                    <option value="volvo">Autoplay</option>
                                    <option value="saab">Drag</option>
                                </select>
                                <div className='my-8'>
                                    <input type="checkbox" id="debug" name="debug" checked={debug} onChange={(e) => setDebug(!debug)} />
                                    <label name="debug"> Debug (show picture number in console) </label>
                                </div>
                                <div className='my-8'>
                                    <input type="checkbox" id="shadows" name="shadows" checked={shadows} onChange={e => setShadows(!shadows)} />
                                    <label name="shadows"> Shadows </label>
                                </div>
                            </div>

                            <div className='py-8'>
                                <label className='mb-4 text-lg font-bold block'>Embed</label>
                                <div className='w-full text-accents-2 font-mono border rounded bg-primary-2 border-gray-200 p-4'>
                                    {`<iframe width="500" height="500" src="${process.env.NEXT_PUBLIC_ROOT_URL}/embed/${id}" style="border: none;"></iframe>`}
                                </div>
                            </div>
                            <div>
                                {project && project.pictures.map((p, i) => <li key={i}>{p}</li>)}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}