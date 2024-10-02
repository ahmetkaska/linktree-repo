import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import '../css/linktree.css';

const Linktree = ({ _id, title, logoImage, slogan, createdAt, bgColor, url }) => {

    const convertRelativeTime = (date) => {
        return moment(date).fromNow();
    };

    return (
        <div className="card" style={{ backgroundColor: bgColor }}>
            <div className="card-media" style={{ backgroundImage: `url(${logoImage})` }}>
                <div className="overlay">
                    <h6>Admin</h6>
                    <p>{convertRelativeTime(createdAt)}</p>
                </div>
            </div>
            <div className="card-content">
                <h6>{title}</h6>
                <p className="slogan">{slogan}</p>
                
            </div>
            <div className="card-actions">
                <Link to={`/linktree/${_id}`} className="more-link">{url}</Link> 
            </div>
        </div>
    );
};

export default Linktree;
