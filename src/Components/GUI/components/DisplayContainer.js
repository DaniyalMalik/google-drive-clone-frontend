import React from 'react';
import list_view from '../pics/list_view.jpg';
import info from '../pics/info.png';
import '../css/DisplayContainer.css';
import axios from 'axios';
import {
  Typography,
  Divider,
  ImageListItem,
  IconButton,
  ImageListItemBar,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  ImageList,
} from '@material-ui/core';
import { DeleteOutlined, GetAppOutlined } from '@material-ui/icons';

export default function DisplayContainer() {
  const [files, setFiles] = React.useState([]);

  const getImages = async () => {
    const res = await axios.get('http://localhost:5000/api/upload', {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });

    setFiles(res.data.files);
  };

  const deleteFile = async (fileNameWithExt) => {
    const res = await axios.delete(
      'http://localhost:5000/api/upload?fileName=' + fileNameWithExt,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    alert(res.data.message);

    getImages();
  };

  React.useEffect(() => {
    getImages();
  }, []);

  return (
    <div id='displayCont'>
      <div id='displayInfoNav'>
        <h1>Files</h1>
        <button>
          <img src={list_view} alt='Reload page' className='opacity' />
        </button>
        <button>
          <img src={info} alt='Reload page' className='opacity' />
        </button>
      </div>
      <div id='contentDisplayer'>
        {files?.length > 0 ? (
          <>
            <Typography variant='h5'>Images</Typography>
            <br />
            <ImageList
              style={{
                maxWidth: '100%',
                height: 'auto',
                marginBottom: '50px',
                marginTop: '50px',
              }}
              rowHeight={164}>
              {files.map(
                (item, key) =>
                  item.mimeType &&
                  item.mimeType.split('/')[0] === 'image' && (
                    <ImageListItem key={key}>
                      <img
                        src={`data:${item.mimeType};base64,${item.file}`}
                        alt='image'
                        loading='lazy'
                      />
                      <ImageListItemBar
                        title={
                          <Typography
                            variant='body1'
                            style={{ color: 'white' }}>
                            {item.fileName}
                          </Typography>
                        }
                        actionIcon={
                          <IconButton
                            color='primary'
                            onClick={() => deleteFile(item.fileNameWithExt)}>
                            <DeleteOutlined />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ),
              )}
            </ImageList>
            <Divider />
            <br />
            <Typography variant='h5'>Videos</Typography>
            <br />
            <ImageList
              style={{
                width: '100%',
                height: 'auto',
                marginBottom: '50px',
                marginTop: '50px',
              }}
              rowHeight={164}>
              {files.map(
                (item, key) =>
                  item.mimeType &&
                  item.mimeType.split('/')[0] === 'video' && (
                    <ImageListItem key={key}>
                      <video controls>
                        <source
                          type={item.mimeType}
                          src={`data:${item.mimeType};base64,${item.file}`}
                        />
                      </video>
                      <ImageListItemBar
                        title={
                          <Typography
                            variant='body1'
                            style={{ color: 'white' }}>
                            {item.fileName}
                          </Typography>
                        }
                        actionIcon={
                          <IconButton
                            color='primary'
                            onClick={() => deleteFile(item.fileNameWithExt)}>
                            <DeleteOutlined />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ),
              )}
            </ImageList>
            <Divider />
            <br />
            <Typography variant='h5'>Audios</Typography>
            <br />
            <ImageList
              style={{
                width: '100%',
                height: 'auto',
                marginBottom: '50px',
                marginTop: '50px',
              }}
              rowHeight={164}>
              {files.map(
                (item, key) =>
                  item.mimeType &&
                  item.mimeType.split('/')[0] === 'audio' && (
                    <ImageListItem key={key}>
                      <audio
                        controls
                        src={`data:${item.mimeType};base64,${item.file}`}
                      />
                      <ImageListItemBar
                        title={
                          <Typography
                            variant='body1'
                            style={{ color: 'white' }}>
                            {item.fileName}
                          </Typography>
                        }
                        actionIcon={
                          <IconButton
                            color='primary'
                            onClick={() => deleteFile(item.fileNameWithExt)}>
                            <DeleteOutlined />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ),
              )}
            </ImageList>
            <Divider />
            <br />
            <Typography variant='h5'>Documents</Typography>
            <div
              style={{
                width: '100%',
                height: 'auto',
                marginBottom: '50px',
                marginTop: '50px',
              }}>
              {files.map(
                (item, key) =>
                  item.mimeType &&
                  (item.mimeType.split('/')[0] === 'application' ||
                    item.mimeType.split('/')[0] === 'text') && (
                    <List
                      sx={{
                        width: '100%',
                        height: 'auto',
                        bgcolor: 'background.paper',
                      }}>
                      <ListItem alignItems='flex-start'>
                        <ListItemText primary={item.fileName} />
                        <ListItemIcon>
                          <a
                            href={`data:${item.mimeType};base64,${item.file}`}
                            download={item.fileName}
                            rel='noreferrer'
                            target='_blank'>
                            <IconButton>
                              <GetAppOutlined color='primary' />
                            </IconButton>
                          </a>
                          <IconButton
                            color='primary'
                            onClick={() => deleteFile(item.fileNameWithExt)}>
                            <DeleteOutlined />
                          </IconButton>
                        </ListItemIcon>
                      </ListItem>
                      <Divider variant='inset' component='li' />
                    </List>
                  ),
              )}
              <br />
            </div>
          </>
        ) : (
          <Typography variant='h5' style={{ textAlign: 'center' }}>
            No Files Found!
          </Typography>
        )}
      </div>
    </div>
  );
}
