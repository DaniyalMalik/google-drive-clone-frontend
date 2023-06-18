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
  Checkbox,
  Select,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Dialog,
  MenuItem,
  InputLabel,
  Breadcrumbs,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Visibility,
  Info,
  InfoOutlined,
  GetAppOutlined,
  GetApp,
} from '@material-ui/icons';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
}));

export default function Shared({ search }) {
  const classes = useStyles();
  const [files, setFiles] = React.useState([]);
  const [folders, setFolders] = React.useState([]);
  const [shared, setShared] = React.useState([]);
  const [sharedFolderPaths, setSharedFolderPaths] = React.useState('None');
  const [open_1, setOpen_1] = React.useState(false);
  const [open_2, setOpen_2] = React.useState(false);
  const [itemDetails, setItemDetails] = React.useState({});
  const [selectedFolder, setSelectedFolder] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState('');
  const [select, setSelect] = React.useState(false);
  const [downloadFiles, setDownloadFiles] = React.useState([]);
  const [downloadFileNames, setDownloadFileNames] = React.useState([]);
  const zip = JSZip();

  const selectFolder = (folderName, index, location) => {
    if (folderName && !index) {
      let temp = sharedFolderPaths.sharedPath[0].split('\\');
      let tempUser =
        sharedFolderPaths.sharedBy.firstName +
        '-' +
        sharedFolderPaths.sharedBy.lastName +
        '-' +
        sharedFolderPaths.sharedBy._id;

      if (
        sharedFolderPaths.sharedPath.length === 1 &&
        temp[temp.length - 1] === tempUser
      ) {
        getFilesOrFolders(
          selectedFolder ? selectedFolder + '/' + folderName : folderName,
        );

        return setSelectedFolder((prev) => prev + '/' + folderName);
      }

      setSelectedLocation(location);
      getFilesOrFolders('', location);
      setSelectedFolder((prev) => prev + '/' + folderName);
    } else if (folderName && index) {
      let temp = sharedFolderPaths.sharedPath[0].split('\\');
      let tempUser =
        sharedFolderPaths.sharedBy.firstName +
        '-' +
        sharedFolderPaths.sharedBy.lastName +
        '-' +
        sharedFolderPaths.sharedBy._id;

      if (
        sharedFolderPaths.sharedPath.length === 1 &&
        temp[temp.length - 1] === tempUser
      ) {
        let temp = selectedFolder.split('/');

        temp.splice(index + 1, temp.length - index - 1);
        temp = temp.join('/');

        setSelectedLocation('');
        setSelectedFolder(temp);
        getFilesOrFolders(temp);
      } else {
        let tempPath = selectedLocation.split('\\');
        let temp = selectedFolder.split('/');
        let tempPathIndex;

        temp.splice(index + 1, temp.length - index - 1);
        tempPathIndex = tempPath.indexOf(temp[1]);
        tempPath.splice(tempPathIndex + 1, tempPath.length - tempPathIndex - 1);
        tempPath = tempPath.join('\\');
        temp = temp.join('/');

        setSelectedLocation('');
        setSelectedFolder(temp);
        getFilesOrFolders('', tempPath);
      }
    } else {
      setSelectedLocation('');
      getFilesOrFolders();
    }
  };

  const handleChange = (event) => {
    setSharedFolderPaths(event.target.value);
  };

  const handleClose_1 = () => {
    setOpen_1(false);
  };

  const handleOpen_1 = () => {
    setOpen_1(true);
  };

  const getFilesOrFolders = async (folderName, customPath) => {
    let temp = sharedFolderPaths.sharedPath[0].split('\\');
    let tempUser =
      sharedFolderPaths.sharedBy.firstName +
      '-' +
      sharedFolderPaths.sharedBy.lastName +
      '-' +
      sharedFolderPaths.sharedBy._id;

    if (folderName && !customPath) {
      const res = await axios.get(
        'http://localhost:5000/api/upload/?folderName=' +
          folderName +
          '&userId=' +
          sharedFolderPaths.sharedBy._id +
          '&search=' +
          search,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        },
      );

      if (res.data.success) {
        setFolders(res.data.folders);
        setFiles(res.data.files);
      } else {
        alert(res.data.message);
      }
    } else if (
      sharedFolderPaths.sharedPath.length === 1 &&
      temp[temp.length - 1] === tempUser
    ) {
      const res = await axios.get(
        'http://localhost:5000/api/upload/?customPath=' +
          sharedFolderPaths.sharedPath[0] +
          '&search=' +
          search,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        },
      );

      if (res.data.success) {
        setFolders(res.data.folders);
        setFiles(res.data.files);
        setSelectedFolder('');
      } else {
        alert(res.data.message);
      }
    } else if (customPath) {
      const res = await axios.get(
        'http://localhost:5000/api/upload/?customPath=' +
          customPath +
          '&search=' +
          search,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        },
      );

      if (res.data.success) {
        setFolders(res.data.folders);
        setFiles(res.data.files);
      } else {
        alert(res.data.message);
      }
    } else {
      const res = await axios.post('http://localhost:5000/api/upload/shared', {
        paths: sharedFolderPaths.sharedPath,
        user: sharedFolderPaths.sharedBy,
        search,
      });

      if (res.data.success) {
        setFolders(res.data.folders);
        setFiles(res.data.files);
        setSelectedFolder('');
      } else {
        alert(res.data.message);
      }
    }
  };

  const handleClickOpen_2 = (item) => {
    setOpen_2(true);
    setItemDetails(item);
  };

  const handleClose_2 = () => {
    setOpen_2(false);
    setItemDetails({});
  };

  React.useEffect(() => {
    if (
      typeof sharedFolderPaths === 'object' &&
      Object.keys(sharedFolderPaths).length > 0
    ) {
      if (selectedLocation) getFilesOrFolders(selectedFolder, selectedLocation);
      else getFilesOrFolders(selectedFolder);
    }
  }, [sharedFolderPaths, search]);

  React.useEffect(async () => {
    const res = await axios.get('http://localhost:5000/api/upload/sharedwith', {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });

    setShared(res.data.shared);
  }, []);

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

  const downloadMultipleFiles = () => {
    const link = document.createElement('a');

    link.style.display = 'none';

    document.body.appendChild(link);

    for (let i = 0; i < downloadFileNames.length; i++) {
      link.setAttribute('download', downloadFileNames[i]);
      link.setAttribute('href', downloadFiles[i]);
      link.click();
    }

    document.body.removeChild(link);

    setSelect(false);
    setDownloadFileNames([]);
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
          sharedFolderPaths.sharedBy.firstName +
            '-' +
            sharedFolderPaths.sharedBy.lastName +
            '-' +
            sharedFolderPaths.sharedBy._id,
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

  const getFolderChildren = async (folderName, customPath) => {
    let tempPath = sharedFolderPaths.sharedPath[0].split('\\');
    let tempUser =
      sharedFolderPaths.sharedBy.firstName +
      '-' +
      sharedFolderPaths.sharedBy.lastName +
      '-' +
      sharedFolderPaths.sharedBy._id;

    if (
      sharedFolderPaths.sharedPath.length === 1 &&
      tempPath[tempPath.length - 1] === tempUser
    ) {
      let temp = selectedFolder.split('/');

      temp.shift();
      temp = temp.join('/');

      const res = await axios.get(
        `http://localhost:5000/api/upload/folderdirectory?folderName=${
          temp + '/' + folderName
        }&userPath=${sharedFolderPaths.sharedBy.folderPath}`,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        },
      );

      if (res.data.success) generateZip(res.data, folderName);
    } else {
      const userFolder = `${sharedFolderPaths.sharedBy.firstName}-${sharedFolderPaths.sharedBy.lastName}-${sharedFolderPaths.sharedBy._id}`;
      const res = await axios.get(
        `http://localhost:5000/api/upload/folderdirectory?customPath=${customPath}&userFolder=${userFolder}`,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        },
      );

      if (res.data.success) generateZip(res.data, folderName);
      else alert(res.data.message);
    }
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
        open={open_2}
        onClose={handleClose_2}
        aria-labelledby='form-dialog-title-2'>
        <DialogTitle id='form-dialog-title-2'>
          {itemDetails.isFolder ? 'Folder details' : 'File details'}
        </DialogTitle>
        <DialogContent>
          {itemDetails.isFolder ? (
            <Typography variant='p'>
              <b>Folder size (MB): </b>
              {(itemDetails.size / 1024 / 1024).toFixed(2)}
              <br />
              <b>Folder name:</b> {itemDetails.folderName}
              <br />
              <b>Folder location:</b> {itemDetails.location}
            </Typography>
          ) : (
            <Typography variant='p'>
              <b>File size (MB): </b>
              {(itemDetails.size / 1024 / 1024).toFixed(2)}
              <br />
              <b>File type:</b> {itemDetails.mimeType}
              <br />
              <b>File location:</b> {itemDetails.location}
              <br />
              <b>File name:</b> {itemDetails.fileNameWithExt}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose_2} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div id='displayInfoNav'>
        <h1>Folders</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {selectedFolder ? (
            <>
              {downloadFiles.length > 0 && (
                <Button variant='outlined' onClick={downloadMultipleFiles}>
                  download multiple
                </Button>
              )}
              <Button
                variant='outlined'
                onClick={() => setSelect((prev) => !prev)}>
                {select ? 'Deselect' : 'Select'}
              </Button>
              <Button variant='outlined' onClick={() => getFilesOrFolders()}>
                back to root folder
              </Button>
            </>
          ) : (
            sharedFolderPaths !== 'None' && (
              <>
                {downloadFiles.length > 0 && (
                  <Button variant='outlined' onClick={downloadMultipleFiles}>
                    download multiple
                  </Button>
                )}
                <Button
                  variant='outlined'
                  onClick={() => setSelect((prev) => !prev)}>
                  {select ? 'Deselect' : 'Select'}
                </Button>
              </>
            )
          )}
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-controlled-open_1-select-label'>
              Shared Folder
            </InputLabel>
            <Select
              labelId='demo-controlled-open_1-select-label'
              id='demo-controlled-open_1-select'
              open={open_1}
              onClose={handleClose_1}
              onOpen={handleOpen_1}
              value={sharedFolderPaths}
              onChange={handleChange}>
              <MenuItem value='None'>
                <em>None</em>
              </MenuItem>
              {shared.map((item) => (
                <MenuItem value={item}>
                  {item.sharedBy.firstName + ' ' + item.sharedBy.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div id='contentDisplayer' style={{ display: 'flex', flexWrap: 'wrap' }}>
        {folders?.length > 0 ? (
          folders.map((item) => (
            <>
              {/* &nbsp;
              {select && <Checkbox color='primary' />} */}
              <Card
                style={{ maxHeight: '80px', margin: '10px', width: '500px' }}>
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
                          onClick={() =>
                            selectFolder(item.folderName, null, item.location)
                          }>
                          <Visibility />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            getFolderChildren(item.folderName, item.location)
                          }>
                          <GetApp />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            handleClickOpen_2({ ...item, isFolder: true })
                          }>
                          <Info />
                        </IconButton>
                      </span>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
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
                        style={{ width: '500px', height: '300px' }}>
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
                                  handleClickOpen_2({
                                    ...item,
                                    isFolder: false,
                                  })
                                }>
                                <InfoOutlined />
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
                        style={{ width: '500px', height: '300px' }}>
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
                            <div style={{ display: 'flex' }}>
                              <IconButton
                                color='primary'
                                onClick={() =>
                                  handleClickOpen_2({
                                    ...item,
                                    isFolder: false,
                                  })
                                }>
                                <InfoOutlined />
                              </IconButton>
                            </div>
                          }
                        />
                      </ImageListItem>
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
                        style={{ width: '500px', height: '100px' }}>
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
                                handleClickOpen_2({ ...item, isFolder: false })
                              }>
                              <InfoOutlined />
                            </IconButton>
                          }
                        />
                      </ImageListItem>
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
                        }}>
                        <ListItem alignItems='flex-start'>
                          <ListItemText primary={item.fileName} />
                          <ListItemIcon>
                            <IconButton
                              color='primary'
                              onClick={() =>
                                handleClickOpen_2({ ...item, isFolder: false })
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
