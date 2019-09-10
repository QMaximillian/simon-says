import React, { useRef } from 'react'
import styles from '../Modal.module.css'
import PropTypes from 'prop-types'

export default function Modal (props){

    const container = useRef()

    function overlayClick(){
        if (props.overlayClickable) props.onClose()
    }


        const { open, onClose, showDefaultCloseBtn } = props
        if (!open) return null

        return (
            <div>
                <div className={styles.container}>
                    <div
                        onClick={overlayClick}
                        className={styles['overlay-click']}
                    ></div>
                    <div className={styles['main-box']}>
                        {props.children}
                        {showDefaultCloseBtn && (
                            <div
                                onClick={onClose}
                                style={{ bottom: -100 }}
                                className={styles['default-close']}
                            >
                                {/* X circle <IoIosCloseCircle className="text-white text-6xl" /> */}
                                <p className={styles.close}>Close</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }


Modal.defaultProps = {
    showDefaultCloseBtn: true,
    overlayClickable: false,
}

Modal.propTypes = {
    // If modal is open.
    open: PropTypes.bool,
    // Function that executes when default close button or clickable overlay is clicked.
    onClose: PropTypes.func.isRequired,
    // If default close button should be displayed.
    showDefaultCloseBtn: PropTypes.bool,
    // If clicking overlay should close the modal.
    overlayClickable: PropTypes.bool,
}


