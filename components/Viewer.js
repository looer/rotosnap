import { useState, useEffect } from "react";

export default function Viewer(props) {
    const { id, images, debug, embed } = props
    const [index, setIndex] = useState(0)
    const [nextIndex, setNextIndex] = useState(0)
    const [prevIndex, setPrevIndex] = useState(0)
    const [dragging, setDragging] = useState(false)
    const [position, setPosition] = useState(0)

    let n = images.length

    useEffect(() => {
        // Find index of next and previous images to avoid flickering
        var _nextIndex = index + 1;
        if (_nextIndex + 1 >= n || _nextIndex - 1 <= n) {
            setNextIndex(_nextIndex % n)
        } else {
            setNextIndex(_nextIndex + 1)
        }

        var _prevIndex = index - 1;
        while (_prevIndex < 0) {
            _prevIndex += n;
        }
        if (_prevIndex + 1 >= n || prevIndex - 1 <= n) {
            setPrevIndex(_prevIndex % n)
        } else {
            setPrevIndex(_prevIndex + 1)
        }

        if (true || debug) console.log(index)


    }, [index])

    return (<div className='mx-auto w-auto h-auto cursor-move'>
        <div className="relative">
            <div className='z-10'>
                <img
                    draggable={false}
                    src={images[index]}
                    className={embed ? "" : "rounded-3xl shadow-md"}

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
                        if (true) {

                            var pos = position
                            setPosition(pos - e.movementX)
                            var _index = Math.floor(position / 30)
                            do {
                                _index += n;
                            } while (_index < 0)
                            setIndex(_index)

                            if (_index + 1 >= n || index - 1 <= n) {
                                setIndex(_index % n)
                            }
                            else {
                                setIndex(_index + 1)
                            }
                        }
                    }}
                    width={props.width || 500} height={props.height || 500}></img>
            </div>

            {images.map((i, k) => <img src={i} key={k} hidden loading="lazy"></img>)}
            {/* PREVIOUS AND NEXT IMAGES

            <div className="absolute top-0" style={{ 'z-index': '-1' }}><img draggable={false} src={images[nextIndex]} width={400} height={400}></img></div>
            <div className="absolute top-0" style={{ 'z-index': '-1' }}><img draggable={false} src={images[prevIndex]} width={400} height={400}></img></div>*/}
        </div>
    </div >)
}