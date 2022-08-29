import PopupModal from '../../PopupModal';
import { Button, Container } from 'react-bootstrap';
import { useState } from 'react';

import { Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import { ImCross } from 'react-icons/im';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';

import { getNewsfeedApi } from '../../../api/axiosHook';

const MdPostModal = ({ setAllPosts }) => {
  const [postModalShow, setPostModalShow] = useState(false);

  const [content, setContent] = useState('');
  const [postImage, setPostImage] = useState('');
  const { eventId } = useParams();

  const [html, setHtml] = useState('');

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log('Loading');
      },
      (error) => {
        console.log('Error');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          console.log(downloadUrl);
          setPostImage(downloadUrl);
          sessionStorage.setItem('post_image', downloadUrl);
          // document.getElementById("banner").style.backgroundImage = `url(${downloadUrl})`;
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if(content===''){
    //     alert('Please enter some content');
    //     return;
    // }
    // setContent(html);
    setPostModalShow(false);

    let post = {
      content: content,
      image: postImage,
      poll_options: [],
      questions: [],
      post_type: 'text',
    };

    console.log(post);

    getNewsfeedApi(localStorage.getItem('token'))
      .post(`${eventId}/post`, post)
      .then((res) => {
        setAllPosts((allPosts) => [...allPosts, res.data.post]);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
      });
  };

  const clickInputButton = (e) => {
    document.getElementById('uploadInput').click();
  };

  // Initialize a markdown parser
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  // Finish!
  function handleEditorChange({ html, text }) {
    // console.log('handleEditorChange\n',"html:\n", html,"\ntext:\n", text);
    setHtml(html);
    setContent(html);
  }

  function updateContent(e) {
    const textAreaElem = document.getElementById('srcContent');
    const textContent = textAreaElem.value;
    setContent(textContent);
  }

  function openFilePicker(e) {
    const imageFileElem = document.getElementById('postImage');
    imageFileElem.click();
  }

  function uploadPostImage(e) {
    const imageFile = e.target.files[0];
    const fileNameParts = imageFile.name.split('.');
    const fileExtension = fileNameParts[fileNameParts.length - 1];

    const randomUUID = crypto.randomUUID();
    const imageFileName = `${randomUUID}.${fileExtension}`;
    console.log(imageFileName);

    //  Uploading to firebase
    //  baseRef is the default bucket reference
    //  storageRef is the folder reference for 'posts'
    const storage = getStorage();
    const baseRef = ref(storage, 'posts');
    const storageRef = ref(baseRef, imageFileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log('Loading');
      },
      (error) => {
        console.log('Error in uploading image!');
        alert('Error in uploading image');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log('Download url:', url);

          const srcContentElem = document.getElementById('srcContent');
          const previousContent = content;
          const newContent = content + `\n ![](${url})`;

          srcContentElem.value = newContent;
          setContent(newContent);
        });
      }
    );
  }

  const MyImage = (props) => {
    return <img className="img-fluid" />;
  };

  const MyPara = (props) => {
    return (
      <Container>
        <p>{props.children}</p>
      </Container>
    );
  };

  const renderers = {
    image: MyImage,
  };

  const postJSX = (
    <Container>
      <Stack gap={4}>
        <ReactMarkdown
          components={renderers}
          children={content}
          skipHtml={true}
        />

        <textarea
          id="srcContent"
          placeholder="What's on your mind?"
          onChange={(e) => updateContent(e)}
        />

        <div>
          <Button
            width={'full'}
            colorScheme={'linkedin'}
            onClick={openFilePicker}
            onChange={uploadPostImage}
          >
            <input type="file" id="postImage" hidden />
            Add Image
          </Button>
        </div>
        <div>
          {postImage !== '' ? (
            <>
              <Button variant="secondary" style={{ position: 'absolute' }}>
                <ImCross onClick={() => setPostImage('')} />
              </Button>
              <img src={postImage} alt="postImage" style={{ width: '40%' }} />
            </>
          ) : (
            <></>
          )}
        </div>
      </Stack>
    </Container>
  );

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setPostModalShow(true)}
      >
        {' '}
        Add Post
      </Button>

      <PopupModal
        show={postModalShow}
        onHide={() => setPostModalShow(false)}
        header="New Markdown Post"
        bodyComponent={postJSX}
        size="lg"
        saveButtonText={'Add Post'}
        saveButtonAction={handleSubmit}
      />
    </>
  );
};

export default MdPostModal;
