import React from 'react';
import { data } from '../data';
import '../style/blog.css'
import { Link } from "react-router-dom";
export default function Research() {
    return (
        <>
            <section className="product">
                <div className="container" >
                    <div className="row" >
                        {data.map((research, index) => {
                            return (
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item" key={index} >
                                    <div className="card" >
                                        <img src={research.imageUrl} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{research.researchName}</h5>
                                            <p className="card-text">{research.metaDescription}</p>
                                            <p className="card-text-author">Author: {research.authorName}</p>
                                            <Link to={`/research/${research.idresearch}`}>View Research Article</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}