import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { fetchSingleLinktree, deleteLinktree } from '../api/index';
import '../css/linktreeDetails.css';
import EditLinktreeForm from './EditLinktreeForm.js';
import AddLinktreeForm from './AddLinktreeForm.js';

const LinktreeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [addMode, setAddMode] = useState(false);
    const [currentLinktree, setCurrentLinktree] = useState(null);
    const location = useLocation();

    // Function to update meta tags and favicon dynamically
    const updateMetaAndFavicon = (logoUrl, metaTitle, metaDescription) => {
        const favicon = document.querySelector("link[rel~='icon']");
        const title = document.querySelector('title');
        const metaDescriptionTag = document.querySelector('meta[name="description"]');

        // Update or create favicon link
        if (favicon) {
            favicon.href = logoUrl;
        } else {
            const newFavicon = document.createElement('link');
            newFavicon.rel = 'icon';
            newFavicon.href = logoUrl;
            document.head.appendChild(newFavicon);
        }

        // Update or create the page title
        if (title) {
            title.innerText = `${metaTitle}`;
        } else {
            const newTitle = document.createElement('title');
            newTitle.innerText = `${metaTitle}`;
            document.head.appendChild(newTitle);
        }

        // Update or create the meta description tag
        if (metaDescriptionTag) {
            metaDescriptionTag.content = metaDescription;
        } else {
            const newMetaDescription = document.createElement('meta');
            newMetaDescription.name = 'description';
            newMetaDescription.content = metaDescription;
            document.head.appendChild(newMetaDescription);
        }
    };

    useEffect(() => {
        const getLinktreeData = async () => {
            try {
                const { data } = await fetchSingleLinktree(id);
                setCurrentLinktree(data);

                // Update meta tags and favicon when logo, meta title, and meta description are loaded
                if (data.logoImage && data.metaTitle && data.metaDescription) {
                    updateMetaAndFavicon(data.logoImage, data.metaTitle, data.metaDescription);
                }
            } catch (error) {
                console.error('Error fetching linktree data:', error);
            }
        };
        getLinktreeData();
    }, [id]);

    if (!currentLinktree && !addMode) {
        return <div></div>;
    }

    const handleLinkClick = (url) => {
        if (url.includes('whatsapp')) {
            const whatsappNumber = url.replace(/[^0-9]/g, '');
            window.open(`https://wa.me/${whatsappNumber}`, '_blank');
        } else if (url.includes('telegram')) {
            const telegramUser = url.replace(/[^a-zA-Z0-9]/g, '');
            window.open(`https://t.me/${telegramUser}`, '_blank');
        } else {
            window.open(url, '_blank');
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Linktree?");
        if (confirmDelete) {
            try {
                await deleteLinktree(id);
                navigate('/linktree');
            } catch (error) {
                console.error('Error deleting linktree:', error);
            }
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setAddMode(false);
    };

    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    const handleEdit = async () => {
        try {
            const { data } = await fetchSingleLinktree(id);
            setEditMode(true);
            setCurrentLinktree(data);
            setOpen(true);
        } catch (error) {
            console.error('Error fetching Linktree data:', error);
        }
    };

    const handleNewLinktree = () => {
        setAddMode(true);
        setOpen(true);
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem('isAuthenticated');
            setOpen(false);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const isLinktreePage = location.pathname === '/linktree';

    const handleUpdateSuccess = (updatedData) => {
        setCurrentLinktree(updatedData);
        setEditMode(false);
        setOpen(false);
    };

    const handleAddSuccess = () => {
        setAddMode(false);
        setOpen(false);
        navigate('/linktree');
    };

    return (
        <div>
            {isAuthenticated && (
                <div className="btned-cont">
                    <button className="edit-button" onClick={handleEdit}>Edit</button>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                </div>
            )}

            <div className="linktreeDetails-container" style={{ backgroundColor: currentLinktree?.bgColor }}>
                {isAuthenticated && (
                    <div id='menuToggle'>
                        <input id='sandwichCheckBox' type='checkbox' />
                        <span></span>
                        <span></span>
                        <span></span>
                        <ul id='menu'>
                            <a href='/linktree' onClick={() => document.getElementById('sandwichCheckBox').checked = false}>
                                <li>Home</li>
                            </a>
                            <hr />
                            <a onClick={handleNewLinktree}>
                                <li>New Linktree</li>
                            </a>
                            <hr />
                            {isAuthenticated && !isLinktreePage && (
                                <>
                                    <a onClick={handleEdit}>
                                        <li>Edit</li>
                                    </a>
                                    <hr />
                                    <a onClick={handleDelete}>
                                        <li>Delete</li>
                                    </a>
                                    <hr />
                                </>
                            )}
                            <a onClick={handleLogout}>
                                <li>Logout</li>
                            </a>
                            <hr />
                        </ul>
                    </div>
                )}

                {/* Add or Edit Mode */}
                {addMode ? (
                    <AddLinktreeForm
                        open={open}
                        handleClose={handleClose}
                        addLinktree={handleAddSuccess}
                    />
                ) : editMode ? (
                    <EditLinktreeForm
                        linktree={currentLinktree}
                        open={open}
                        closeEditMode={handleClose}
                        onLinktreeUpdate={handleUpdateSuccess}
                    />
                ) : (
                    <>
                        <div className="logo-container">
                            <img src={currentLinktree.logoImage} alt="Logo" className="logo" />
                        </div>

                        <div className="title-container">
                            <h2>{currentLinktree.title}</h2>
                        </div>

                        <div className="slogan-container">
                            <h2>{currentLinktree.slogan}</h2>
                        </div>

                        <div className="icon-row">
                            {currentLinktree.icons && currentLinktree.icons.map((icon, index) => (
                                <img
                                    key={index}
                                    src={icon.iconImage}
                                    alt={icon.iconName}
                                    className="social-icons"
                                    onClick={() => handleLinkClick(icon.iconLink)}
                                />
                            ))}
                        </div>

                        <div className="button-container">
                            {currentLinktree.buttons && currentLinktree.buttons.map((button, index) => (
                                <button key={index} onClick={() => handleLinkClick(button.buttonLink)}>
                                    {button.buttonContent}
                                </button>
                            ))}
                        </div>

                        <div className="image-grid">
                            {currentLinktree.images && currentLinktree.images.map((image, index) => (
                                <div key={index} className="image-grid-item" onClick={() => handleLinkClick(image.imageLink)}>
                                    <img src={image.imageTitle} alt={image.imageTitle} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LinktreeDetails;
