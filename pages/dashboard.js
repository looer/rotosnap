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
import Layout from '@/components/Layout';

export const Project = (props) => {
    const url = (props.proj ? props.proj.pictures[0] : null);
    const [profile, setProfile] = useState('')
    const [menuOpen, setMenuOpen] = useState('')
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if (url && !props.empty) downloadImage(url)
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

        <div className="relative filter drop-shadow-h-1 bg-white rounded-lg w-64 
        flex-grow max-w-xs min-w-1/5 transition-all overflow-hidden"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            {hover &&
                <div onClick={props.onMoreOptions}>
                    <img src='/ic24-more-hor.svg' className="absolute z-40 right-4 top-2 cursor-pointer">
                    </img>
                </div>}
            {props.selected ?
                <div className='absolute right-3 top-3 rounded-lg filter drop-shadow-h-2 z-50 bg-white py-2'>
                    <Link href={'/project/' + props.proj.id}><a>
                        <div className='text-sm py-4 w-32 pl-4 hover:bg-accents-8 cursor-pointer'>
                            Edit
                        </div></a>
                    </Link>
                    <div className='text-sm py-4 w-32 pl-4 hover:bg-accents-8 cursor-pointer'
                        onClick={props.onDelete}>
                        Delete
                    </div>
                </div>
                : ''}
            <Link href={props.proj ? "/project/" + props.proj.id : "/"}>
                <a>
                    <div className="relative w-full h-40 rounded-t-lg overflow-hidden z-30 bg-gray-100">
                        <div className={"t-0 absolute w-full h-full bg-black-fade z-20 transition duration-300 animate-none ease-in-out " + (hover ? "bg-opacity-20" : "opacity-0")}></div>
                        {profile && <Image src={profile}
                            alt='profile pic'
                            layout='fill'
                            objectFit={'cover'}
                            className={"transform-gpu transition-transform duration-300 ease-in-out rounded-t-lg " + (hover ? 'scale-110 rounded-t-lg' : "")}
                        />}
                    </div>
                    <div className='mt-3 px-4 text-sm font-medium break-words mb-1 truncate'>{props.empty ? "..." : props.proj.name.split('.')[0]}</div>
                    <div className='mb-3 px-4 text-xs text-gray-400'>{props.proj ? props.proj.pictures.length + " pictures" : "..."}</div>
                </a>
            </Link>
        </div >

    )
}


export default function Dashboard({ user }) {
    //const { userLoaded, user, session, userDetails } = useUser();
    const [projectname, setProjectname] = useState('')
    const [submitting, setSubmitting] = useState(false);
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const router = useRouter();

    useEffect(() => {
        allProjects()
    }, [user])

    useEffect(() => {
        if (!user) router.replace('/signin');
        //if (!user) console.log('no user');
    }, [user]);


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

    async function deleteProject(i) {
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

    let skeleton = [];
    for (let i = 0; i < 8; i++) {
        skeleton.push(" ");
    }


    if (!user) {
        return (<div className='w-full text-center py-64'>User not found</div>)
    } else return (
        <Layout footer={false} user={user}>
            <div className='max-w-8xl mx-auto px-8 pt-8'>
                <div className='flex items-center mb-8'>
                    <div className='flex-grow'>
                        <h2 className='text-2xl font-bold mb-0.5'>All projects</h2>
                        {/*<div className='text-xs text-accents-3'>{loading ? 'Loading projects...' : projects.length + ' projects'}</div>*/}
                    </div>

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
                    {loading ? skeleton.map(() => <Project empty />) :
                        projects.map((p, i) => <Project proj={p} key={i} index={i} selected={i == selected} onMoreOptions={() => setSelected(i)} onDelete={() => deleteProject(i)} />)}
                    {!loading && !projects.length &&
                        <div className='w-full my-32 text-accents-4 text-center font-medium'>
                            <div className='mb-6'>There are no projects yet</div>
                            <Link href='/new'>
                                <a>
                                    <Button
                                        variant="slim"
                                        loading={loading}>
                                        New project
                                    </Button>
                                </a>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </Layout>)
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        // If no user, redirect to index.
        return { props: {}, redirect: { destination: '/signin', permanent: false } }
    }

    // If there is a user, return it.
    return { props: { user } }
}