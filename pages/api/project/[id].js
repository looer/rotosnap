import { supabase } from '@/utils/supabase-client'

export default async function handler(req, res) {

    const { id } = req.query
    const { data, error, status } = await supabase.from('projects').select('id, name, pictures').eq('id', id).single()
    const baseURL = await getPublicUrl(data)

    const project = {
        ...data,
        baseURL: baseURL
    }
    if (error) {
        res.status(300).json(error)
    } else {
        res.status(200).json(project)
    }
}

async function getPublicUrls(project) {
    if (project) {
        let paths = [];
        for (const picture of project.pictures) {
            let newPicture = await downloadImage(picture);
            paths.push(newPicture);
        }
        return paths
    }
}
async function getPublicUrl(project) {
    let firstURL = await downloadImage(project.pictures[0]);
    const baseURL = firstURL.substring(0, firstURL.lastIndexOf("/") + 1);
    return baseURL
}



async function downloadImage(path) {
    try {
        const { data, error } = await supabase.storage.from('avatars').getPublicUrl(path)

        if (error) {
            throw error
        }
        return data.publicURL;
    }
    catch (error) {
        console.log('Error downloading image: ', error.message)
    }
}