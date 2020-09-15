import React, { Fragment } from 'react'


import './spinner.styles.scss'

const Spinner: React.FC = () => {
    return (
        <Fragment>
            <td className="spinner__container">
                <td className="spinner__rotate"></td>
            </td>
        </Fragment>
    )
}


export default Spinner