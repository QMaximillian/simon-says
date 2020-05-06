import React from 'react'
import styles from '../styles/Modal.module.css'
import PropTypes from 'prop-types'

export default function Modal (props){

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
                                className={styles['default-close']}
                            >
                                {/* <div className={styles.close}>Play Again?</div> */}
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


