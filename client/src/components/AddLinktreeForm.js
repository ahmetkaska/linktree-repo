import React, { useState } from 'react';
import FileBase64 from "react-file-base64";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChromePicker } from 'react-color';  
import { FaTrashAlt } from 'react-icons/fa';  
import { createLinktree } from '../api'; 
import '../css/addLinktreeForm.css';

const linktreeSchema = yup.object().shape({
    metaTitle: yup.string().required('Meta title is required'),
    metaDescription: yup.string().required('Meta description is required'),
    title: yup.string().required('Title is required'),
    slogan: yup.string().required('Slogan is required'),
    url: yup.string().required('URL is required'),  
    buttons: yup.array().of(
        yup.object().shape({
            buttonContent: yup.string().required('Button content is required'),
            buttonLink: yup.string().required('Button link is required')
        })
    ),
    images: yup.array().of(
        yup.object().shape({
            imageTitle: yup.string().required('Image title is required'),
            imageLink: yup.string().required('Image link is required'),
        })
    ),
    icons: yup.array().of(
        yup.object().shape({
            iconLink: yup.string().required('Icon link is required'),
            iconImage: yup.string().required('Icon image is required')
        })
    ),
});

const AddLinktreeForm = ({ open, handleClose }) => {
    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm({
        resolver: yupResolver(linktreeSchema)
    });
    
    const [buttons, setButtons] = useState([{ buttonContent: '', buttonLink: '' }, { buttonContent: '', buttonLink: '' }, { buttonContent: '', buttonLink: '' }]);
    const [images, setImages] = useState([]);
    const [icons, setIcons] = useState([{ iconLink: '', iconImage: '' }]);
    const [bgColor, setBgColor] = useState('#ffffff');
    const [file, setFile] = useState(null);

    // Handle button changes
    const handleButtonChange = (index, field, value) => {
        const newButtons = [...buttons];
        newButtons[index][field] = value;
        setButtons(newButtons);
    };

    // Delete button
    const deleteButton = (index) => {
        setButtons(buttons.filter((_, i) => i !== index));
    };

    // Add new button field
    const addButtonField = () => {
        setButtons([...buttons, { buttonContent: '', buttonLink: '' }]);
    };

    // Handle image changes
    const handleImageChange = (index, field, value) => {
        const newImages = [...images];
        newImages[index][field] = value;
        setImages(newImages);
    };

    // Delete image
    const deleteImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    // Handle file upload for images
    const handleFileUpload = (index, file) => {
        const newImages = [...images];
        newImages[index].imageTitle = file.base64;
        setImages(newImages);
    };

    // Add new image field
    const addImageField = () => {
        setImages([...images, { imageTitle: '', imageLink: '' }]);
    };

    // Handle icon changes
    const handleIconChange = (index, field, value) => {
        const newIcons = [...icons];
        newIcons[index][field] = value;
        setIcons(newIcons);
    };

    // Delete icon
    const deleteIcon = (index) => {
        setIcons(icons.filter((_, i) => i !== index));
    };

    // Handle file upload for icons
    const handleIconUpload = (index, file) => {
        const newIcons = [...icons];
        newIcons[index].iconImage = file.base64;
        setIcons(newIcons);
    };

    // Add new icon field
    const addIconField = () => {
        setIcons([...icons, { iconLink: '', iconImage: '' }]);
    };

    const clearForm = () => {
        reset();
        setButtons([{ buttonContent: '', buttonLink: '' }, { buttonContent: '', buttonLink: '' }, { buttonContent: '', buttonLink: '' }]);
        setImages([]);
        setIcons([{ iconLink: '', iconImage: '' }]);
        setFile(null);
        setBgColor('#ffffff');
        handleClose();
    };

    const onSubmit = async () => {
        const data = getValues();
        data.buttons = buttons;
        data.images = images;
        data.icons = icons;

        if (!file) {
            alert('Please upload a logo image.');
            return;
        }

        const formData = {
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            title: data.title,
            slogan: data.slogan,
            url: data.url,  
            buttons: data.buttons,
            images: data.images,
            icons: data.icons,
            logoImage: file,
            bgColor: bgColor,
        };

        try {
            const response = await createLinktree(formData);
            console.log('Linktree created successfully:', response.data);
            clearForm();

            // Reload the page to load the newly created Linktree
            window.location.reload();
        } catch (error) {
            console.error('Error creating Linktree:', error);
            alert('Error occurred while creating Linktree');
        }
    };

    return (
        <div className={`modal ${open ? 'open' : ''}`}>
            <div className="modal-content">
                <h2 className='add-header'> Create a new Linktree</h2>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    
                    <h3 className='head'>Meta Title</h3>
                    <input
                        id='metaTitle'
                        placeholder='Meta Title'
                        name='metaTitle'
                        {...register('metaTitle')}
                        className={`input-field ${errors.metaTitle ? 'error' : ''}`}
                    />
                    {errors.metaTitle && <p className="error-text">{errors.metaTitle.message}</p>}
                    
                    <h3 className='head'>Meta Description</h3>
                    <input
                        id='metaDescription'
                        placeholder='Meta Description'
                        name='metaDescription'
                        {...register('metaDescription')}
                        className={`input-field ${errors.metaDescription ? 'error' : ''}`}
                    />
                    {errors.metaDescription && <p className="error-text">{errors.metaDescription.message}</p>}

                    <h3 className='head'>URL</h3>
                    <input
                        id='url'
                        placeholder='Unique URL'
                        name='url'
                        {...register('url')}
                        className={`input-field ${errors.url ? 'error' : ''}`}
                    />
                    {errors.url && <p className="error-text">{errors.url.message}</p>}
                    
                    <h3 className='head'>Title</h3>
                    <input
                        id='title'
                        placeholder='Title'
                        name='title'
                        {...register('title')}
                        className={`input-field ${errors.title ? 'error' : ''}`}
                    />
                    {errors.title && <p className="error-text">{errors.title.message}</p>}

                    <h3 className='head'>Slogan</h3>
                    <input
                        id='slogan'
                        placeholder='Slogan'
                        name='slogan'
                        {...register('slogan')}
                        className={`input-field ${errors.slogan ? 'error' : ''}`}
                    />
                    {errors.slogan && <p className="error-text">{errors.slogan.message}</p>}

                    
                    
                    <h3 className='head'>Logo</h3>
                    <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
                    <br/>

                    <div className='content'>
                        <h3 className='head'>Icons</h3>
                        <button type="button" onClick={addIconField} className="add-icon-btn">Add Icon</button>
                        {icons.map((icon, index) => (
                            <div key={index} className="icon-group">
                                <div className="input-container">
                                    <FileBase64 
                                        multiple={false} 
                                        onDone={(file) => handleIconUpload(index, file)} 
                                    />
                                    <input
                                        placeholder='Icon Link'
                                        value={icon.iconLink}
                                        onChange={(e) => handleIconChange(index, 'iconLink', e.target.value)}
                                        className="input-field"
                                    />
                                </div>
                                <div className='delete-btn-icon-container'>
                                    <FaTrashAlt
                                        className='delete-btn-icon'
                                        onClick={() => deleteIcon(index)}
                                        style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
                                    />
                                </div>
                            </div>
                        ))}
                        {errors.icons && <p className="error-text">{errors.icons.message}</p>}
                    </div>

                    <div className='content'>
                        <h3 className='head'>Buttons</h3>
                        <button type="button" onClick={addButtonField} className="add-button">Add Button</button>
                        {buttons.map((button, index) => (
                            <div key={index} className="button-group">
                                <div className="input-container">
                                    <input
                                        placeholder={`Button Content ${index + 1}`}
                                        value={button.buttonContent}
                                        onChange={(e) => handleButtonChange(index, 'buttonContent', e.target.value)}
                                        className="input-field"
                                    />
                                    <input
                                        placeholder={`Button Link ${index + 1}`}
                                        value={button.buttonLink}
                                        onChange={(e) => handleButtonChange(index, 'buttonLink', e.target.value)}
                                        className="input-field"
                                    />
                                </div>
                                <div className='delete-btn-icon-container'>
                                    <FaTrashAlt
                                        className='delete-btn-icon'
                                        onClick={() => deleteButton(index)}
                                        style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
                                    />
                                </div>
                            </div>
                        ))}
                        {errors.buttons && <p className="error-text">{errors.buttons.message}</p>}
                    </div>

                    <div className="color-picker content">
                        <h3 className='head'>Background Color</h3>
                        <ChromePicker color={bgColor} onChange={(color) => setBgColor(color.hex)} />
                    </div>
                    <br/>

                    <div className='content'>
                        <h3 className='head'>Images</h3>
                        <button type="button" onClick={addImageField} className="add-image-btn">Add Image</button>
                        {images.map((image, index) => (
                            <div key={index} className="image-group">
                                <div className="input-container">
                                    <FileBase64 
                                        multiple={false} 
                                        onDone={(file) => handleFileUpload(index, file)} 
                                    />
                                    <input
                                        placeholder='Image Link'
                                        value={image.imageLink}
                                        onChange={(e) => handleImageChange(index, 'imageLink', e.target.value)}
                                        className="input-field"
                                    />
                                </div>
                                <div className='delete-btn-icon-container'>
                                    <FaTrashAlt
                                        className='delete-btn-icon'
                                        onClick={() => deleteImage(index)}
                                        style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
                                    />
                                </div>
                            </div>
                        ))}
                        {errors.images && <p className="error-text">{errors.images.message}</p>}
                    </div>

                    <div className="modal-actions content">
                        <button type='button' onClick={clearForm} className="cancel-btn">
                            Cancel
                        </button>
                        <button type='submit' className="submit-btn" onClick={onSubmit}>
                            Create Linktree
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLinktreeForm;
