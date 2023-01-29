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

  const deleteFile = async (fileName) => {
    const res = await axios.delete(
      'http://localhost:5000/api/upload?fileName=' + fileName,
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
        <h2>Files</h2>
        <button>
          <img src={list_view} alt='Reload page' className='opacity' />
        </button>
        <button>
          <img src={info} alt='Reload page' className='opacity' />
        </button>
      </div>
      {console.log(files, 'files')}
      <div id='contentDisplayer'>
        {files?.length > 0 ? (
          <>
            <Typography variant='h5'>Images</Typography>
            <br />
            <ImageList
              style={{ width: '100%', height: '300px' }}
              cols={3}
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
                        // subtitle={
                        //   <Typography variant='string' color='textPrimary'>
                        //     <b>Deleted At:</b>{' '}
                        //     {new Date(item?.createdAt).toLocaleString()}
                        //   </Typography>
                        // }
                        actionIcon={
                          <IconButton
                            color='primary'
                            onClick={() => deleteFile(item.fileName)}>
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
              style={{ width: '100%', height: '300px' }}
              cols={3}
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
                        // subtitle={
                        //   <Typography variant='string' color='textPrimary'>
                        //     <b>Deleted At:</b>{' '}
                        //     {new Date(item?.createdAt).toLocaleString()}
                        //   </Typography>
                        // }
                        actionIcon={
                          <IconButton
                            color='primary'
                            onClick={() => deleteFile(item.fileName)}>
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
              style={{ width: '100%', height: '300px' }}
              cols={3}
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
                        // subtitle={
                        //   <Typography variant='string' color='textPrimary'>
                        //     <b>Deleted At:</b>{' '}
                        //     {new Date(item?.createdAt).toLocaleString()}
                        //   </Typography>
                        // }
                        actionIcon={
                          <IconButton
                            color='primary'
                            onClick={() => deleteFile(item.fileName)}>
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
                // overflowY: 'scroll',
                width: '100%',
                height: 'auto',
              }}>
              {files.map(
                (item, key) =>
                  item.mimeType &&
                  item.mimeType.split('/')[0] === 'application' && (
                    <List
                      sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                      }}>
                      <ListItem alignItems='flex-start'>
                        <ListItemText
                          primary={item.fileName}
                          // secondary={
                          //   <>
                          //     <Typography variant='body2' color='textPrimary'>
                          //       <b>Deleted By: </b>
                          //       {item?.userId?.firstName +
                          //         ' ' +
                          //         item?.userId?.lastName}
                          //     </Typography>
                          //     <Typography variant='body2' color='textPrimary'>
                          //       <b>Deleted At: </b>
                          //       {new Date(item?.createdAt).toLocaleString()}
                          //     </Typography>
                          //   </>
                          // }
                        />
                        <ListItemIcon>
                          {/* <a
                            href={item?.path}
                            download='assighment'
                            target='_blank'>
                            <IconButton>
                              <GetAppOutlined color='primary' />
                            </IconButton>
                          </a> */}
                          <IconButton
                            color='primary'
                            onClick={() => deleteFile(item.fileName)}>
                            <DeleteOutlined />
                          </IconButton>
                        </ListItemIcon>
                      </ListItem>
                      <Divider variant='inset' component='li' />
                    </List>
                    // <>
                    //   <div
                    //     style={{
                    //       display: 'flex',
                    //       justifyContent: 'flex-start',
                    //       alignItems: 'center',
                    //     }}
                    //   >
                    //     <Typography variant="h6">File-{key + 1}</Typography>
                    //     <a
                    //       href={item?.path}
                    //       download="assighment"
                    //       target="_blank"
                    //     >
                    //       <IconButton>
                    //         <Typography variant="body2">
                    //           Download Attachment
                    //           <AttachFile fontSize="medium" />
                    //         </Typography>
                    //       </IconButton>
                    //     </a>
                    //     <IconButton onClick={() => onDelete(item._id, item.path)}>
                    //       <DeleteOutlined fontSize="large" color="primary" />
                    //     </IconButton>
                    //   </div>
                    //   <Typography variant="body2">
                    //     {item?.userId?.firstName +
                    //       ' ' +
                    //       item?.userId?.lastName}
                    //   </Typography>
                    // </>
                  ),
              )}
              <Divider />
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
