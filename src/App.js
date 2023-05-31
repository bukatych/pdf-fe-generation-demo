import appStyles from './App.module.scss'
import PDFDocument from './components/PDFDocument';
import { useState } from 'react';
import ImageUploading from "react-images-uploading";
import {PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';

const randomText = 'This PDF was generated using React and React PDF Renderer fully on the client side.'

const App = () => {
  const [title, setTitle] = useState('First FE Generated PDF');
  const [text, setText] = useState(randomText);
  const [image, setImage] = useState([]);
  const [showPDF, setShowPDF] = useState(false);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImage(imageList);
  };

  return (
    <div className={appStyles.app}>
      <h1>PDF Generator Demo</h1>
      <div className={appStyles.wrapper}>
        <div className={appStyles.formController}>
          <label htmlFor="title">Enter title:</label>
          <input name='title' type="text" value={title} onChange={(e) => {
            setTitle(e.target.value);
          }}/>
          <label htmlFor={'text'}>Text:</label>
          <textarea name="text" id="text" rows="20" value={text} onChange={(e) => {
            setText(e.target.value)
          }}/>
          <ImageUploading
            multiple
            value={image}
            onChange={onChange}
            maxNumber={1}
            dataURLKey="data_url"
            acceptType={["jpg"]}
          >
            {({
              imageList,
              onImageUpload,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps
            }) => (
              // write your building UI
              imageList.length === 0
                  ?
                  (<div className={appStyles.imageUploader}>
                    <p>Upload image</p>
                    <button
                      style={isDragging ? { color: "red" } : null}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click or Drop here
                    </button>
                  </div>)
                  :
                    imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image.data_url} alt="" width="100%"/>
                        <div className="image-item__btn-wrapper">
                          <button onClick={() => onImageUpdate(index)}>Update</button>
                          <button onClick={() => onImageRemove(index)}>Remove</button>
                        </div>
                      </div>
                    ))
            )}
          </ImageUploading>
          <button className={appStyles.generateButton} onClick={() => {setShowPDF(true)}}>Generate PDF With Preview</button>
          <PDFDownloadLink className={appStyles.generateButton} document={<PDFDocument title={title} text={text} image={image} />} fileName="somename.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download now!'
            }
          </PDFDownloadLink>
        </div>
        {
          showPDF &&
          <PDFViewer className={appStyles.viewer}>
            <PDFDocument
              title={title}
              text={text}
              image={image}
            />
          </PDFViewer>
        }
      </div>
      
    </div>
  );
}

export default App;
