import React, { useState, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'

const pages = [
({ style }) => <animated.div style={{ ...style, background: '#ffb6c1' }} />,
    ({ style }) => <animated.div style={{ ...style, background: '#add8e6' }} />,
    ({ style }) => <animated.div style={{ ...style, background: '#90ee90' }} />,
    ({ style }) => <animated.div style={{ ...style, background: '#ffa500' }} />,
    ({ style }) => <animated.div style={{ ...style, background: '#008080' }} />,
({ style }) => <animated.div style={{ ...style, background: '#E52A88' }} />,
({ style }) => <animated.div style={{ ...style, background: '#B52AF4' }} />,
({ style }) => <animated.div style={{ ...style, background: '#4E9059' }} />,
({ style }) => <animated.div style={{ ...style, background: '#D6781F' }} />,
({ style }) => <animated.div style={{ ...style, background: '#0EBD12' }} />,
({ style }) => <animated.div style={{ ...style, background: '#63ADFD' }} />,
({ style }) => <animated.div style={{ ...style, background: '#FFD98E' }} />,
({ style }) => <animated.div style={{ ...style, background: '#F00E63' }} />,
({ style }) => <animated.div style={{ ...style, background: '#7D94B0' }} />,
({ style }) => <animated.div style={{ ...style, background: '#E94AF2' }} />,
({ style }) => <animated.div style={{ ...style, background: '#DD4D93' }} />,
({ style }) => <animated.div style={{ ...style, background: '#95C3A5' }} />,
({ style }) => <animated.div style={{ ...style, background: '#E4748F' }} />,
({ style }) => <animated.div style={{ ...style, background: '#41ADF9' }} />,
({ style }) => <animated.div style={{ ...style, background: '#0411E2' }} />,
({ style }) => <animated.div style={{ ...style, background: '#55A554' }} />,
({ style }) => <animated.div style={{ ...style, background: '#F185D5' }} />,
({ style }) => <animated.div style={{ ...style, background: '#517A5B' }} />,
({ style }) => <animated.div style={{ ...style, background: '#DED6F6' }} />,
({ style }) => <animated.div style={{ ...style, background: '#C8E8EE' }} />,
({ style }) => <animated.div style={{ ...style, background: '#B886D3' }} />,
({ style }) => <animated.div style={{ ...style, background: '#396ECA' }} />,
({ style }) => <animated.div style={{ ...style, background: '#42E1E6' }} />,
({ style }) => <animated.div style={{ ...style, background: '#6208FB' }} />,
({ style }) => <animated.div style={{ ...style, background: '#908876' }} />,
({ style }) => <animated.div style={{ ...style, background: '#7AD3D4' }} />,
({ style }) => <animated.div style={{ ...style, background: '#365890' }} />,
({ style }) => <animated.div style={{ ...style, background: '#381CE7' }} />,
({ style }) => <animated.div style={{ ...style, background: '#955586' }} />,
({ style }) => <animated.div style={{ ...style, background: '#22D5F0' }} />,
({ style }) => <animated.div style={{ ...style, background: '#51E83D' }} />,
({ style }) => <animated.div style={{ ...style, background: '#5B06BA' }} />,
({ style }) => <animated.div style={{ ...style, background: '#339F71' }} />,
({ style }) => <animated.div style={{ ...style, background: '#92656E' }} />,
({ style }) => <animated.div style={{ ...style, background: '#2B15FD' }} />,
({ style }) => <animated.div style={{ ...style, background: '#4970F1' }} />,
({ style }) => <animated.div style={{ ...style, background: '#48F9A9' }} />,
({ style }) => <animated.div style={{ ...style, background: '#0B771A' }} />,
({ style }) => <animated.div style={{ ...style, background: '#167FA0' }} />,
({ style }) => <animated.div style={{ ...style, background: '#1BE5F6' }} />,
({ style }) => <animated.div style={{ ...style, background: '#7723FD' }} />,
({ style }) => <animated.div style={{ ...style, background: '#D215EC' }} />,
({ style }) => <animated.div style={{ ...style, background: '#11958A' }} />,
({ style }) => <animated.div style={{ ...style, background: '#8FFE58' }} />,
({ style }) => <animated.div style={{ ...style, background: '#068365' }} />,
({ style }) => <animated.div style={{ ...style, background: '#062939' }} />,
({ style }) => <animated.div style={{ ...style, background: '#3388A7' }} />,
({ style }) => <animated.div style={{ ...style, background: '#EF14D8' }} />,
({ style }) => <animated.div style={{ ...style, background: '#D3D4BE' }} />,

]




export default function BackgroundTransition(props) {
    const [index, set] = useState(0)

    
    const transitions = useTransition(index, p => p, {
        // change background color animation
        from: { opacity: 0, transform: 'translate3d(0%,0%,100%)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0%)' },
        leave: { opacity: 0, transform: 'translate3d(0,-50%, 0)' },
    })

    // rtl animation

    // from: { opacity: 0, transform: 'translate3d(100%,0%,0)' },
    // enter: { opacity: 1, transform: 'translate3d(0%,0%,0)' },
    // leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },

    // Bottom Up Animation

    // from: { opacity: 0, transform: 'translate3d(0%,100%,0)' },
    // enter: { opacity: 1, transform: 'translate3d(0%,0%,0)' },
    // leave: { opacity: 0, transform: 'translate3d(0%,-50%,0)' },

    useEffect(() => {
        if (props.levelUp) {
            set(state => (state + 1) % pages.length)
        }
    }, [props.levelUp])

    return (
        <div className="simple-trans-main">
            {transitions.map(({ item, props, key }) => {
                const Page = pages[item]
                return <Page key={key} style={props} />
            })}
        </div>
    )
}