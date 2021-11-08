import { useState, useEffect } from "react";
import Image from 'next/image'

export default function Viewer(props) {
    const { id, images, playable, autoPlay, draggable, mouseMove, buttons, keys, scroll } = props
    const [source, setSource] = useState(images[0])
    const [index, setIndex] = useState(0)
    const [dragging, setDragging] = useState(false)
    const [position, setPosition] = useState(0)

    let n = images.length

    useEffect(() => {
        setSource(images[index])
    }, [index])

    return (<div className='bg-white w-auto h-auto cursor-move'>
        <Image draggable={false} src={source}

            onMouseDown={e => {
                setDragging(true);
            }}
            onMouseUp={e => {
                setDragging(false)
            }}
            onMouseOut={e => {
                setDragging(false)
            }}
            onMouseMove={e => {
                if (dragging) {

                    var pos = position
                    setPosition(pos - e.movementX)
                    var _index = Math.abs(Math.floor(position / 30))
                    setIndex(_index)

                    if (_index + 1 >= n) {
                        setIndex(_index % n)
                    } else if (_index - 1 <= n) {
                        setIndex(_index % n)
                    } else {
                        setIndex(_index + 1)
                    }
                }
            }}
            width={400} height={400}></Image>
        <div className="text-black">{dragging ? 'dragging' : 'not dragging'}</div>
        <div className="text-black">{position}</div>
        <div className="text-black">{index}</div>
    </div>)
}