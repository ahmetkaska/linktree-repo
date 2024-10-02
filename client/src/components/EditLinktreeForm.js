import React, { useState, useEffect } from 'react';
import FileBase64 from 'react-file-base64';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChromePicker } from 'react-color';
import { updateLinktree, fetchSingleLinktree } from '../api/index';
import '../css/editLinktreeFrom.css';
import { FaTrashAlt } from 'react-icons/fa';  

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
      iconImage: yup.string().required('Icon image is required'),
    })
  ),
});

const EditLinktreeForm = ({ linktree, closeEditMode, onLinktreeUpdate }) => {
  const [file, setFile] = useState(linktree.logoImage || null);
  const [bgColor, setBgColor] = useState(linktree.bgColor || '#ffffff');
  const [buttons, setButtons] = useState(linktree.buttons || []);
  const [images, setImages] = useState(linktree.images || []);
  const [icons, setIcons] = useState(linktree.icons || []);

  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm({
    resolver: yupResolver(linktreeSchema),
    defaultValues: {
      metaTitle: linktree.metaTitle || '',
      metaDescription: linktree.metaDescription || '',
      title: linktree.title || '',
      slogan: linktree.slogan || '',
      url: linktree.url || '',   
      buttons: linktree.buttons || [],
      images: linktree.images || [],
      icons: linktree.icons || [],
    }
  });

  useEffect(() => {
    reset({
      metaTitle: linktree.metaTitle || '',
      metaDescription: linktree.metaDescription || '',
      title: linktree.title || '',
      slogan: linktree.slogan || '',
      url: linktree.url || '',  
      buttons: linktree.buttons || [],
      images: linktree.images || [],
      icons: linktree.icons || [],
    });
    setButtons(linktree.buttons || []);
    setImages(linktree.images || []);
    setIcons(linktree.icons || []);
    setFile(linktree.logoImage || null);
    setBgColor(linktree.bgColor || '#ffffff');
  }, [linktree, reset]);

  const handleButtonChange = (index, field, value) => {
    const newButtons = [...buttons];
    newButtons[index][field] = value;
    setButtons(newButtons);
  };

  const handleImageChange = (index, field, value) => {
    const newImages = [...images];
    newImages[index][field] = value;
    setImages(newImages);
  };

  const handleIconChange = (index, field, value) => {
    const newIcons = [...icons];
    newIcons[index][field] = value;
    setIcons(newIcons);
  };

  const addButtonField = () => setButtons([...buttons, { buttonContent: '', buttonLink: '' }]);
  const addImageField = () => setImages([...images, { imageTitle: '', imageLink: '' }]);
  const addIconField = () => setIcons([...icons, { iconLink: '', iconImage: '' }]);

  const deleteButton = (index) => setButtons(buttons.filter((_, i) => i !== index));
  const deleteImage = (index) => setImages(images.filter((_, i) => i !== index));
  const deleteIcon = (index) => setIcons(icons.filter((_, i) => i !== index));

  const clearForm = () => {
    reset();
    setButtons([]);
    setImages([]);
    setIcons([]);
    setFile(null);
    if (closeEditMode) closeEditMode();
  };

  const onSubmit = async () => {
    const data = getValues();
    data.buttons = buttons;
    data.images = images;
    data.icons = icons;

    const formData = {
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      title: data.title,
      slogan: data.slogan,
      url: data.url,    
      logoImage: file,
      bgColor: bgColor,
      buttons: data.buttons,
      images: data.images,
      icons: data.icons,
    };

    try {
      await updateLinktree(linktree._id, formData);
      const updatedLinktree = await fetchSingleLinktree(linktree._id);
      clearForm();

      if (typeof onLinktreeUpdate === 'function') {
        onLinktreeUpdate(updatedLinktree);
      }

      window.location.reload(); 
    } catch (error) {
      console.error("Error updating linktree:", error);
    }
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <h3>Edit Linktree</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="form">

          {/* Meta Title Field */}
          <div className="input-group">
            <h3 className='head-edit'>Meta Title</h3>
            <input
              id="metaTitle"
              {...register('metaTitle')}
              className={`input ${errors.metaTitle ? 'error' : ''}`}
              placeholder="Enter meta title"
            />
            {errors.metaTitle && <span className="error-message">{errors.metaTitle.message}</span>}
          </div>

          {/* Meta Description Field */}
          <div className="input-group">
            <h3 className='head-edit'>Meta Description</h3>
            <input
              id="metaDescription"
              {...register('metaDescription')}
              className={`input ${errors.metaDescription ? 'error' : ''}`}
              placeholder="Enter meta description"
            />
            {errors.metaDescription && <span className="error-message">{errors.metaDescription.message}</span>}
          </div>

          {/* URL Field */}
          <div className="input-group">
            <h3 className='head-edit'>URL</h3>
            <input
              id="url"
              {...register('url')}
              className={`input ${errors.url ? 'error' : ''}`}
              placeholder="Enter unique URL"
            />
            {errors.url && <span className="error-message">{errors.url.message}</span>}
          </div>

          {/* Title Field */}
          <div className="input-group">
            <h3 className='head-edit'>Title</h3>
            <input
              id="title"
              {...register('title')}
              className={`input ${errors.title ? 'error' : ''}`}
              placeholder="Enter title"
            />
            {errors.title && <span className="error-message">{errors.title.message}</span>}
          </div>

          {/* Slogan Field */}
          <div className="input-group">
            <h3 className='head-edit'>Slogan</h3>
            <input
              id="slogan"
              {...register('slogan')}
              className={`input ${errors.slogan ? 'error' : ''}`}
              placeholder="Enter slogan"
            />
            {errors.slogan && <span className="error-message">{errors.slogan.message}</span>}
          </div>

          

          {/* Logo Upload */}
          <h3 className='head-edit'>Logo</h3>
          <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />

          {/* Icons Field */}
          <div className='content'>
            <h3 className='head-edit'>Icons</h3>
            <button type="button" className="add-icon-btn" onClick={addIconField}>Add Icon</button>
            {icons.map((icon, index) => (
              <div key={index} className="icon-group">
                <div className='input-container'>
                  <FileBase64
                    multiple={false}
                    onDone={(file) => handleIconChange(index, 'iconImage', file.base64)}
                  />
                  <input
                    placeholder={`Icon Link ${index + 1}`}
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

          {/* Background Color Picker */}
          <div className="color-picker content">
            <h3 className='head-edit'>Background Color</h3>
            <ChromePicker color={bgColor} onChangeComplete={(color) => setBgColor(color.hex)} />
          </div>

          {/* Buttons Field */}
          <div className='content'>
            <h3 className='head-edit'>Buttons</h3>
            <button type="button" className="add-button" onClick={addButtonField}>Add Button</button>
            {buttons.map((button, index) => (
              <div key={index} className="button-group">
                <div className='input-container'>
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

          {/* Images Field */}
          <div className='content'>
            <h3 className='head-edit'>Images</h3>
            <button type="button" className="add-image-btn" onClick={addImageField}>Add Image</button>
            {images.map((image, index) => (
              <div key={index} className="image-group">
                <div className='input-container'>
                  <FileBase64
                    multiple={false}
                    onDone={(file) => handleImageChange(index, 'imageTitle', file.base64)}
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

          {/* Form Actions */}
          <div className="form-actions content">
            <button type="button" onClick={clearForm} className="btn cancel">Cancel</button>
            <button type="submit" className="btn submit" onClick={onSubmit}>Update Linktree</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLinktreeForm;
