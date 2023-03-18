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

export default function DisplayContainer({
  userstate,
  setUserState,
  selector,
  setSelector,
}) {
  const [files, setFiles] = React.useState([]);
  const [saveFiles, setSaveFiles] = React.useState([]);
  const [folders, setFolders] = React.useState([]);
  const [sameFolder, setSameFolder] = React.useState(false);
  const [selectedFolder, setSelectedFolder] = React.useState('');

  const selectFolder = (folderName) => {
    setSelectedFolder((prev) => prev + '/' + folderName);

    getFilesOrFolders(
      selectedFolder ? selectedFolder + '/' + folderName : folderName,
    );
  };

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
      setSelector({ ...selector, folderName: '' });
      setSelectedFolder('');
    }
  };

  const deleteFile = async (fileNameWithExt, folder) => {
    const res = await axios.delete(
      'http://localhost:5000/api/upload?fileOrFolderName=' +
        fileNameWithExt +
        '&folder=' +
        folder,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    alert(res.data.message);

    getFilesOrFolders();
  };

  const uploadFiles = async () => {
    const formData = new FormData();
    let size = 0;

    for (let i = 0; i < saveFiles.length; i++) {
      size += saveFiles[i].size;

      formData.append('files', saveFiles[i]);
    }

    if (
      userstate?.currentStorage + size / 1024 / 1024 / 1024 >=
      userstate?.storageLimit
    )
      return alert('Uploaded files size is greater than your storage limit');

    if (selector.folderName) {
      const res = await axios.post(
        'http://localhost:5000/api/upload?folderName=' +
          selector.folderName +
          '&sameFolder=' +
          sameFolder,
        formData,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        },
      );

      alert(res.data.message);

      setSaveFiles([]);
      setSameFolder(false);

      if (res.data.success) {
        setUserState(res.data.user);

        localStorage.setItem('user', JSON.stringify(res.data.user));

        getFilesOrFolders(selector.folderName);
      }
    }
  };

  React.useEffect(() => {
    getFilesOrFolders();
  }, []);

  React.useEffect(() => {
    saveFiles.length > 0 && uploadFiles();
  }, [saveFiles]);

  const onUploadFiles = (e) => {
    const arr = [];

    for (let i = 0; i < e.target.files.length; i++) {
      arr.push(e.target.files[i]);
    }

    setSaveFiles(arr);
    setSameFolder(true);
  };

  return (
    <div>
      <div id='displayInfoNav'>
        <h1>Folders</h1>
        {selector.folderName && (
          <div>
            <input
              style={{ display: 'none' }}
              id='contained-button-file'
              multiple
              type='file'
              onChange={onUploadFiles}
            />
            <label htmlFor='contained-button-file'>
              <Button variant='outlined' component='span'>
                upload files in Folder: <b>{selector.folderName}</b>
              </Button>
            </label>
            <Button variant='outlined' onClick={() => getFilesOrFolders()}>
              back to root folder
            </Button>
          </div>
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
                      <IconButton onClick={() => selectFolder(item.folderName)}>
                        <Visibility />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteFile(item.folderName, true)}>
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
                            onClick={() =>
                              deleteFile(item.fileNameWithExt, false)
                            }>
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
                            onClick={() =>
                              deleteFile(item.fileNameWithExt, false)
                            }>
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
                            onClick={() =>
                              deleteFile(item.fileNameWithExt, false)
                            }>
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
                            onClick={() =>
                              deleteFile(item.fileNameWithExt, false)
                            }>
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
