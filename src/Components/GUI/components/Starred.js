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
  DialogTitle,
  DialogContent,
  Checkbox,
  DialogActions,
  Dialog,
  Breadcrumbs,
  Link,
} from '@material-ui/core';
import { saveAs } from 'file-saver';
import {
  Info,
  InfoOutlined,
  GetAppOutlined,
  Visibility,
  Star,
  GetApp,
} from '@material-ui/icons';
import JSZip from 'jszip';

export default function Starred({ user, search, selector, setSelector }) {
  const [files, setFiles] = React.useState([]);
  const [folders, setFolders] = React.useState([]);
  const [selectedFolder, setSelectedFolder] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [itemDetails, setItemDetails] = React.useState({});
  const [downloadFiles, setDownloadFiles] = React.useState([]);
  const [downloadFileNames, setDownloadFileNames] = React.useState([]);
  const [select, setSelect] = React.useState(false);
  const [downloadFolderNames, setDownloadFolderNames] = React.useState([]);
  const zip = JSZip();

  const handleClickOpen = (item) => {
    setOpen(true);
    setItemDetails(item);
  };

  const handleClose = () => {
    setOpen(false);
    setItemDetails({});
  };

  const saveFileBinary = (e, binary, name) => {
    if (e.target.checked) {
      setDownloadFiles((prev) => prev.concat(binary));
      setDownloadFileNames((prev) => prev.concat(name));
    } else {
      setDownloadFiles((prev) => {
        let index = prev.indexOf(binary);
        let temp = [...prev];

        temp.splice(index, 1);

        return temp;
      });
      setDownloadFileNames((prev) => {
        let index = prev.indexOf(name);
        let temp = [...prev];

        temp.splice(index, 1);

        return temp;
      });
    }
  };

  const selectFolder = (folderName, index) => {
    if (folderName && !index) {
      setSelectedFolder((prev) => prev + '/' + folderName);

      getFilesOrFolders(
        selectedFolder ? selectedFolder + '/' + folderName : folderName,
      );
    } else if (folderName && index) {
      let temp = selectedFolder.split('/');

      temp.splice(index + 1, temp.length - index - 1);
      temp = temp.join('/');

      setSelectedFolder(temp);
      getFilesOrFolders(temp);
    } else {
      getFilesOrFolders();
    }
  };

  const getFilesOrFolders = async (folderName) => {
    const temp = user.folderPath.split('\\');

    temp.splice(temp.length - 1, 0, 'starred');

    const customPath = temp.join('\\');

    if (folderName) {
      const res = await axios.get(
        `http://localhost:5000/api/upload?customPath=${customPath}&folderName=${folderName}&search=${search}&userId=${user._id}`,
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
        `http://localhost:5000/api/upload?customPath=${customPath}&search=${search}&userId=${user._id}`,
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

  React.useEffect(() => {
    getFilesOrFolders(selectedFolder);
  }, [search]);

  const removeFromStarred = async (customPath) => {
    const res = await axios.post(
      'http://localhost:5000/api/upload/unstare',
      { customPath },
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    alert(res.data.message);

    if (res.data.success) {
      getFilesOrFolders();
    }
  };

  const downloadMultipleItems = () => {
    const link = document.createElement('a');

    link.style.display = 'none';

    document.body.appendChild(link);

    for (let i = 0; i < downloadFileNames.length; i++) {
      link.setAttribute('download', downloadFileNames[i]);
      link.setAttribute('href', downloadFiles[i]);
      link.click();
    }

    for (let i = 0; i < downloadFolderNames.length; i++) {
      getFolderChildren(downloadFolderNames[i]);
    }

    document.body.removeChild(link);

    setSelect(false);
    setDownloadFileNames([]);
    setDownloadFolderNames([]);
    setDownloadFiles([]);
  };

  const download = () => {
    zip.generateAsync({ type: 'blob' }).then(function (blob) {
      saveAs(blob, 'download.zip');
    });
  };

  const generateZip = (obj) => {
    if (obj.folders.length) {
      for (const element of obj.folders) {
        zip.folder(element);
      }
    }

    if (obj.files.length) {
      for (const element of obj.files) {
        let path = element.location.split(
          user.firstName + '-' + user.lastName + '-' + user._id,
        );

        path = path[1].split('\\');
        path.shift();
        path = path.join('/');

        zip.file(path, element.file, {
          base64: true,
        });
      }

      download();
    }
  };

  const getFolderChildren = async (folderName) => {
    const res = await axios.get(
      `http://localhost:5000/api/upload/folderdirectory?folderName=${folderName}&userPath=${user.folderPath}`,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    if (res.data.files.length === 0 && res.data.folders.length === 0)
      alert('Folder is empty!');
    else if (res.data.success) generateZip(res.data);
    else alert(res.data.message);
  };

  return (
    <div>
      <Breadcrumbs aria-label='breadcrumb'>
        {selectedFolder.split('/').map((item, index) =>
          index === selectedFolder.split('/').length - 1 ? (
            <Typography color='textPrimary'>
              {item ? item : 'My Drive'}
            </Typography>
          ) : (
            <Link
              style={{ cursor: 'pointer' }}
              color='inherit'
              onClick={() => selectFolder(item, index)}>
              {item ? item : 'My Drive'}
            </Link>
          ),
        )}
      </Breadcrumbs>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title-2'>
        <DialogTitle id='form-dialog-title-2'>
          {itemDetails.isFolder ? 'Folder details' : 'File details'}
        </DialogTitle>
        <DialogContent>
          {itemDetails.isFolder ? (
            <Typography variant='p'>
              <b>Folder size (MB):</b>{' '}
              {(itemDetails.size / 1024 / 1024).toFixed(2)}
              <br />
              <b>Folder name:</b> {itemDetails.folderName}
              <br />
              <b>Folder location:</b> {itemDetails.location}
              <br />
              <b>Created at:</b> {itemDetails.createdAt}
              <br />
              <b>Updated at:</b> {itemDetails.updatedAt}
            </Typography>
          ) : (
            <Typography variant='p'>
              <b>File size (MB):</b>
              {(itemDetails.size / 1024 / 1024).toFixed(2)}
              <br />
              <b>File type:</b> {itemDetails.mimeType}
              <br />
              <b>File location:</b> {itemDetails.location}
              <br />
              <b>File name:</b> {itemDetails.fileNameWithExt}
              <br />
              <b>Created at:</b> {itemDetails.createdAt}
              <br />
              <b>Updated at:</b> {itemDetails.updatedAt}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div id='displayInfoNav'>
        <h1>Folders</h1>
        {selectedFolder ? (
          <div>
            {(downloadFolderNames.length > 0 || downloadFiles.length > 0) && (
              <Button variant='outlined' onClick={downloadMultipleItems}>
                download multiple
              </Button>
            )}
            <Button
              variant='outlined'
              onClick={() => {
                setSelect((prev) => !prev);
                setDownloadFiles([]);
                setDownloadFileNames([]);
                setDownloadFolderNames([]);
              }}>
              {select ? 'Deselect' : 'Select'}
            </Button>
            <Button variant='outlined' onClick={() => getFilesOrFolders()}>
              back to root folder
            </Button>
          </div>
        ) : (
          <div>
            {(downloadFolderNames.length > 0 || downloadFiles.length > 0) && (
              <Button variant='outlined' onClick={downloadMultipleItems}>
                download multiple
              </Button>
            )}
            <Button
              variant='outlined'
              onClick={() => {
                setSelect((prev) => !prev);
                setDownloadFiles([]);
                setDownloadFileNames([]);
                setDownloadFolderNames([]);
              }}>
              {select ? 'Deselect' : 'Select'}
            </Button>
          </div>
        )}
      </div>
      <div id='contentDisplayer' style={{ display: 'flex', flexWrap: 'wrap' }}>
        {folders?.length > 0 ? (
          folders.map((item) => (
            <>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                &nbsp;
                {select && (
                  <Checkbox
                    color='primary'
                    onClick={() =>
                      setDownloadFolderNames((prev) =>
                        prev.concat(item.folderName),
                      )
                    }
                  />
                )}
                <Card
                  style={{ maxHeight: '80px', margin: '5px', width: '500px' }}>
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
                        <span>{item.folderName}</span>
                        <span>
                          <IconButton
                            onClick={() =>
                              handleClickOpen({ ...item, isFolder: true })
                            }>
                            <Info />
                          </IconButton>
                          <IconButton
                            onClick={() => getFolderChildren(item.folderName)}>
                            <GetApp />
                          </IconButton>
                          {!selectedFolder && (
                            <IconButton
                              onClick={() => removeFromStarred(item.location)}>
                              <Star />
                            </IconButton>
                          )}
                          <IconButton
                            onClick={() => selectFolder(item.folderName)}>
                            <Visibility />
                          </IconButton>
                        </span>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </>
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
                display: 'flex',
                flexWrap: 'wrap',
              }}
              rowHeight={164}>
              {files.map(
                (item, key) =>
                  item.mimeType &&
                  item.mimeType.split('/')[0] === 'image' && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        &nbsp;
                        {select && (
                          <Checkbox
                            color='primary'
                            onChange={(e) =>
                              saveFileBinary(
                                e,
                                `data:${item.mimeType};base64,${item.file}`,
                                item.fileNameWithExt,
                              )
                            }
                          />
                        )}
                        <ImageListItem
                          key={key}
                          style={{
                            width: '500px',
                            height: '300px',
                            padding: '5px',
                          }}>
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
                              <div style={{ display: 'flex' }}>
                                <IconButton
                                  color='primary'
                                  onClick={() =>
                                    handleClickOpen({
                                      ...item,
                                      isFolder: false,
                                    })
                                  }>
                                  <InfoOutlined />
                                </IconButton>
                                <IconButton
                                  color='primary'
                                  onClick={() =>
                                    removeFromStarred(item.location)
                                  }>
                                  <Star />
                                </IconButton>
                                <a
                                  style={{
                                    textDecoration: 'none',
                                  }}
                                  download={item.fileNameWithExt}
                                  href={`data:${item.mimeType};base64,${item.file}`}>
                                  <IconButton color='primary'>
                                    <GetAppOutlined />
                                  </IconButton>
                                </a>
                              </div>
                            }
                          />
                        </ImageListItem>
                      </div>
                    </>
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
                display: 'flex',
                flexWrap: 'wrap',
              }}
              rowHeight={164}>
              {files.map(
                (item, key) =>
                  item.mimeType &&
                  item.mimeType.split('/')[0] === 'video' && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        &nbsp;
                        {select && (
                          <Checkbox
                            color='primary'
                            onChange={(e) =>
                              saveFileBinary(
                                e,
                                `data:${item.mimeType};base64,${item.file}`,
                                item.fileNameWithExt,
                              )
                            }
                          />
                        )}
                        <ImageListItem
                          key={key}
                          style={{
                            width: '500px',
                            height: '300px',
                            padding: '5px',
                          }}>
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
                              <>
                                <IconButton
                                  color='primary'
                                  onClick={() =>
                                    handleClickOpen({
                                      ...item,
                                      isFolder: false,
                                    })
                                  }>
                                  <InfoOutlined />
                                </IconButton>
                                <IconButton
                                  color='primary'
                                  onClick={() =>
                                    removeFromStarred(item.location)
                                  }>
                                  <Star />
                                </IconButton>
                              </>
                            }
                          />
                        </ImageListItem>
                      </div>
                    </>
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
                display: 'flex',
                flexWrap: 'wrap',
              }}
              rowHeight={164}>
              {files.map(
                (item, key) =>
                  item.mimeType &&
                  item.mimeType.split('/')[0] === 'audio' && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        &nbsp;
                        {select && (
                          <Checkbox
                            color='primary'
                            onChange={(e) =>
                              saveFileBinary(
                                e,
                                `data:${item.mimeType};base64,${item.file}`,
                                item.fileNameWithExt,
                              )
                            }
                          />
                        )}
                        <ImageListItem
                          key={key}
                          style={{
                            width: '500px',
                            height: '100px',
                            padding: '5px',
                          }}>
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
                              <>
                                <IconButton
                                  color='primary'
                                  onClick={() =>
                                    removeFromStarred(item.location)
                                  }>
                                  <Star />
                                </IconButton>
                                <IconButton
                                  color='primary'
                                  onClick={() =>
                                    handleClickOpen({
                                      ...item,
                                      isFolder: false,
                                    })
                                  }>
                                  <InfoOutlined />
                                </IconButton>
                              </>
                            }
                          />
                        </ImageListItem>
                      </div>
                    </>
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
                display: 'flex',
                flexWrap: 'wrap',
              }}>
              {files.map(
                (item, key) =>
                  item.mimeType &&
                  (item.mimeType.split('/')[0] === 'application' ||
                    item.mimeType.split('/')[0] === 'text') && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        &nbsp;
                        {select && (
                          <Checkbox
                            color='primary'
                            onChange={(e) =>
                              saveFileBinary(
                                e,
                                `data:${item.mimeType};base64,${item.file}`,
                                item.fileNameWithExt,
                              )
                            }
                          />
                        )}
                        <List
                          style={{
                            bgcolor: 'background.paper',
                            width: '500px',
                            height: '100px',
                            padding: '5px',
                          }}>
                          <ListItem alignItems='flex-start'>
                            <ListItemText primary={item.fileName} />
                            <ListItemIcon>
                              <IconButton
                                color='primary'
                                onClick={() =>
                                  removeFromStarred(item.location)
                                }>
                                <Star />
                              </IconButton>
                              <IconButton
                                color='primary'
                                onClick={() =>
                                  handleClickOpen({ ...item, isFolder: false })
                                }>
                                <InfoOutlined />
                              </IconButton>
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
                            </ListItemIcon>
                          </ListItem>
                          <Divider variant='inset' component='li' />
                        </List>
                      </div>
                    </>
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
