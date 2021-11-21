import { useState, useEffect } from "react";

export default function Viewer(props) {
    const { id, images, debug, embed } = props
    const [index, setIndex] = useState(0)
    const [nextIndex, setNextIndex] = useState(0)
    const [prevIndex, setPrevIndex] = useState(0)
    const [dragging, setDragging] = useState(false)
    const [position, setPosition] = useState(0)
    const [prevTouch, setPrevTouch] = useState(0)
    const [play, setPlay] = useState(true)

    let n = images.length

    useEffect(() => {
        // Find index of next and previous images to avoid flickering
        //var _nextIndex = index + 1;
        //if (_nextIndex + 1 >= n || _nextIndex - 1 <= n) {
        //    setNextIndex(_nextIndex % n)
        //} else {
        //    setNextIndex(_nextIndex + 1)
        //}

        //var _prevIndex = index - 1;
        //while (_prevIndex < 0) {
        //    _prevIndex += n;
        //}
        //if (_prevIndex + 1 >= n || prevIndex - 1 <= n) {
        //    setPrevIndex(_prevIndex % n)
        //} else {
        //    setPrevIndex(_prevIndex + 1)
        //}
        if (play) {
            setTimeout(function () {
                if (index + 1 >= n) {
                    setIndex(0)
                }
                else {
                    setIndex(index + 1)
                }
            }, 200)
        }

        if (true || debug) console.log(index)
    }, [index])


    return (<div className='mx-auto w-auto h-auto cursor-move'>
        <div className="relative">
            <div className='z-10'>
                <img
                    id="myviewer"
                    draggable={false}
                    src={images[index]}
                    className={embed ? "" : "rounded-3xl shadow-md"}
                    onTouchStart={e => {
                        setPrevTouch(e.touches[0])
                        setPlay(false)
                    }}
                    onTouchMove={e => {
                        const currentTouch = e.touches[0]
                        const movementX = currentTouch.clientX - prevTouch.clientX
                        setPrevTouch(currentTouch)

                        setPosition(position - movementX * 2)
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
                    }}
                    onMouseDown={e => {
                        setDragging(true);
                        setPlay(false)
                    }}
                    onMouseUp={e => {
                        setDragging(false)
                    }}
                    onMouseOut={e => {
                        setDragging(false)
                    }}
                    onMouseMove={e => {
                        setPlay(false)

                        if (true) {

                            setPosition(position - e.movementX)
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


                {images.map((i, k) => <img src={i} key={k} hidden loading="lazy"></img>)}
                {/* PREVIOUS AND NEXT IMAGES

            <div className="absolute top-0" style={{ 'z-index': '-1' }}><img draggable={false} src={images[nextIndex]} width={400} height={400}></img></div>
            <div className="absolute top-0" style={{ 'z-index': '-1' }}><img draggable={false} src={images[prevIndex]} width={400} height={400}></img></div>*/}
                <div className="flex m-5">

                    <button className="w-auto text-center" onClick={e => {
                        e.preventDefault()
                        if (!play) {
                            setPlay(true)
                            setIndex(index + 1)
                        } else {
                            setPlay(false)
                        }
                    }}>{!play ? 'Play' : 'Stop'}</button>
                </div>
            </div>
        </div>
    </div >)
}