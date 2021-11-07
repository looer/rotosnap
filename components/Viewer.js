import { useState, useEffect } from "react";
import Image from 'next/image'

export default function Viewer(props) {
    const { id, images, playable, autoPlay, draggable, mouseMove, buttons, keys, scroll } = props
    const [source, setSource] = useState(images[0])
    const [index, setIndex] = useState(0)
    let n = images.length;

    //console.log('init component')

    useEffect(() => {
        setSource(images[index])
    }, [index])
    //console.log(`${id}-${playable ? 'playable ' : ''}${autoPlay ? 'autoPlay ' : ''}${draggable ? 'draggable ' : ''}${mouseMove ? 'mouseMove ' : ''}${buttons ? 'buttons ' : ''}${keys ? 'keys' : ''}${scroll ? 'scroll ' : ''}`);

    //loaderNone(id);
    //var i = 1, j = 0, move = [],
    //var img = document.querySelector(`#${id} .${id}`);
    function changeSource(e) {
        e.preventDefault();
        e.target.src = images[index]
        console.log('index ', index, 'n ', n)
        if (index + 1 >= n) {
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }
    return (<div className='bg-white w-auto h-auto cursor-move'>
        <Image draggable={true} src={source} onClick={e => changeSource(e)} width={400} height={400}></Image>
    </div>)
}