import React from 'react';
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
  Button,
  Card,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import { Delete, Visibility } from '@material-ui/icons';
import { DeleteOutlined, GetAppOutlined } from '@material-ui/icons';

export default function DisplayContainer({ selector, setSelector }) {
  const [files, setFiles] = React.useState([]);
  const [folders, setFolders] = React.useState([]);

  const getFilesOrFolders = async (folderName) => {
    if (folderName) {
      const res = await axios.get(
        'http://localhost:5000/api/upload?folderName=' + folderName,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        },
      );

      setFolders(res.data.folders);
      setFiles(res.data.files);
      setSelector({ ...selector, folderName });
    } else {
      const res = await axios.get(
        'http://localhost:5000/api/upload?folderName=',
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        },
      );

      setFolders(res.data.folders);
      setFiles(res.data.files);
    }
  };

  const deleteFile = async (fileNameWithExt) => {
    const res = await axios.delete(
      'http://localhost:5000/api/upload?fileOrFolderName=' + fileNameWithExt,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    alert(res.data.message);

    getFilesOrFolders();
  };

  React.useEffect(() => {
    getFilesOrFolders();
  }, []);

  return (
    <div>
      <div id='displayInfoNav'>
        <h1>Folders</h1>
        {selector.folderName && (
          <Button variant='outlined' onClick={() => getFilesOrFolders()}>
            back to root folder
          </Button>
        )}
      </div>
      <div id='contentDisplayer'>
        {folders?.length > 0 ? (
          folders.map((item) => (
            <Card
              style={{ maxHeight: '80px', maxWidth: '250px', margin: '10px' }}>
              <CardActionArea>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component='h2'
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    {item.folderName}
                    <span>
                      <IconButton
                        onClick={() => getFilesOrFolders(item.folderName)}>
                        <Visibility />
                      </IconButton>
                      <IconButton onClick={() => deleteFile(item.folderName)}>
                        <Delete />
                      </IconButton>
                    </span>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <Typography variant='h5' style={{ textAlign: 'center' }}>
            No Folders Found!
          </Typography>
        )}
      </div>
      <div id='displayInfoNav'>
        <h1>Files</h1>
      </div>
      <div id='contentDisplayer'>
        {files?.length > 0 ? (
          <>
            <Typography variant='h5'>Images</Typography>
            <ImageList
              style={{
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
            <ImageList
              style={{
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
            <ImageList
              style={{
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
                        bgcolor: 'background.paper',
                      }}>
                      <ListItem alignItems='flex-start'>
                        <ListItemText primary={item.fileName} />
                        <ListItemIcon>
                          <a
                            href={`data:${item.mimeType};base64,${item.file}`}
                            download={
                              item.fileNameWithExt.split('.')[1] === 'rar'
                                ? item.fileNameWithExt
                                : item.fileName
                            }
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
