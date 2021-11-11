import { useUser } from '@/utils/useUser';
import { supabase } from '@/utils/supabase-client'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { FileDrop } from 'react-file-drop'
import Viewer from '@/components/Viewer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@/components/ui/Button';
import LoadingDots from '@/components/ui/LoadingDots';

export const Project = (props) => {

    const url = props.proj.pictures[0]
    const [profile, setProfile] = useState('')
    useEffect(() => {
        if (url) downloadImage(url)
    }, [])

    async function downloadImage(path) {
        try {
            const { data, error } = await supabase.storage.from('avatars').getPublicUrl(path)

            if (error) {
                throw error
            }
            //const url = URL.createObjectURL(data)
            setProfile(data.publicURL)
        }
        catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    }

    return (

        <div className="border border-gray-200 hover:border-gray-300 bg-primary-2 rounded-md w-64 h-64 flex-grow max-w-xs min-w-1/5">
            <Link href={"/project/" + props.proj.id}>
                <a>
                    {profile &&
                        <div className="relative w-full h-32">
                            <Image src={profile}
                                alt='profile pic'
                                layout='fill'
                                objectFit={'cover'}
                                className='rounded-t-md'
                            />
                        </div>}
                    <div className='mt-3 px-4 text-sm font-medium break-words mb-1'>{props.proj.name.split('.')[0]}</div>
                    <div className='mb-4 px-4 text-xs text-gray-400'>{props.proj.pictures.length} pictures</div>
                    <div className='px-4'>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </button>
                        <button onClick={(e) => props.onClick(e, props.index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </a>
            </Link>
        </div>

    )
}


export default function App() {
    const { userLoaded, user, session, userDetails } = useUser();
    const [projectname, setProjectname] = useState('')
    const [submitting, setSubmitting] = useState(false);
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        allProjects()
    }, [session])

    useEffect(() => {
        if (userLoaded && !user) router.replace('/signin');
    }, [userLoaded, user]);


    async function allProjects() {
        setLoading(true)
        if (!user) return []
        const { data, error, status } = await supabase.from('projects').select('id, user_id, name, pictures').eq('user_id', user.id)
        if (error) throw error
        setLoading(false)
        setProjects(data)
    }

    async function createProject(files) {
        setSubmitting(true)
        const uploadedImagePaths = await uploadImages(files)
        const newProject = {
            user_id: user.id,
            name: files[0].name,
            pictures: uploadedImagePaths,
        }
        const { error } = await supabase.from('projects').insert(newProject)

        if (!error) {
            const updatedProjects = [...projects, newProject]
            setProjects(updatedProjects)
            setSubmitting(false);
        } else {
            console.log('Error', error)
            setSubmitting(false)
        }
    }

    async function deleteProject(e, i) {
        const toRemove = projects[i].pictures
        const { data, error } = await supabase.storage.from('avatars').remove(toRemove)
        console.log('pictures to remove ', data, toRemove)
        //console.log('error', error)
        if (!error) {
            const { data, error } = await supabase.from('projects').delete().match({ id: projects[i].id })
            //    console.log('deleted project ', data)
        }
        const updatedProjects = projects.filter((p, j) => { return j !== i })
        console.log('updated projects', updatedProjects)
        setProjects(updatedProjects)
    }

    const uploadImages = async (files) => {
        files = [...files]
        console.log('Files', files)
        if (files.length === 0) {
            return [];
        }
        const UploadedImageData = await Promise.all(
            files.map(async (file) => {
                const { data, error } = await supabase.storage
                    .from('avatars')
                    .upload(file.name, file, { returning: 'minimal', cacheControl: '3600', upsert: true });
                if (error) {
                    console.log("error in uploading image: ", error);
                    throw error;
                }
                if (data) {
                    console.log("image uploaded successfully: ", data);
                    console.log("Logging image_path: ", data.Key);
                    return data.Key.split('/')[1];
                }
            })
        );

        console.log("UploadedImageData: ", UploadedImageData);
        return UploadedImageData;
    }

    const handleSubmit = e => {
        e.preventDefault()

    }

    const handleChange = e => {
        setProjectname(e.target.value)
    }

    // account name = userDetails.full_name.split(' ')[0]
    // list of products
    // image of products


    if (!user) {
        return (<div>User not defined</div>)
    } else return (
        <div className='max-w-8xl mx-auto px-8 mt-8'>
            <div className='flex items-center mb-8'>
                <h2 className='text-2xl font-bold flex-grow'>{loading ? 'Loading projects...' : projects.length + ' projects'}</h2>
                <Link href='/new'>
                    <a>
                        <Button
                            variant="slim"
                            loading={loading}
                        >
                            New
                        </Button>
                    </a>
                </Link>
            </div>
            <div className='flex gap-8 flex-wrap mb-12'>
                {loading ? <div className='w-16 mt-16 mx-auto'><LoadingDots /></div> : projects.map((p, i) => <Project proj={p} key={i} index={i} onClick={deleteProject} />)}
                {!loading && !projects.length && <div className='w-full my-8 text-accents-4 text-center font-medium'>There are no projects yet</div>}
            </div>
        </div >)
}