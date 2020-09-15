import React, { Fragment } from 'react'

import { Listings } from '../'

import './table.styles.scss'

const Table: React.FC = () => {
    return (
        <Fragment>
            <main className="main">
                <section className="section__main">
                    <div className="section__top">
                        <div className="refresh__group">
                                <form className="form">
                                    <span className="text__primary">Refresh after </span> 
                                    <input type="text" name="timeInterval" className="form__input"/>
                                    <span className="text__primary"> Seconds </span> 
                                    <button type="submit" className="btn__primary">Update</button>
                                    
                                </form>
                        </div>
                    </div>
                    <div className="section__body">
                        <Listings />
                    </div>
                </section>
            </main>
        </Fragment>
    )
}


export default Table