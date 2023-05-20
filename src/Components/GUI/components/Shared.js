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
} from '@material-ui/icons';

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
  const [open_3, setOpen_3] = React.useState(false);
  const [itemDetails, setItemDetails] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [selectedFolder, setSelectedFolder] = React.useState('');

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

  const handleChange = (event) => {
    setSharedFolderPaths(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const getFilesOrFolders = async (folderName) => {
    if (folderName) {
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
    } else {
      const res = await axios.post(
        'http://localhost:5000/api/upload/shared',
        {
          paths: sharedFolderPaths.sharedPath,
          user: sharedFolderPaths.sharedBy,
          search,
        },
      );

      if (res.data.success) {
        setFolders(res.data.folders);
        setFiles(res.data.files);
        setSelectedFolder('');
      } else {
        alert(res.data.message);
      }
    }
  };

  const handleClickOpen_3 = (item) => {
    setOpen_3(true);
    setItemDetails(item);
  };

  const handleClose_3 = () => {
    setOpen_3(false);
    setItemDetails({});
  };

  React.useEffect(() => {
    if (
      typeof sharedFolderPaths === 'object' &&
      Object.keys(sharedFolderPaths).length > 0
    )
      getFilesOrFolders(selectedFolder);
  }, [sharedFolderPaths, search]);

  React.useEffect(async () => {
    const res = await axios.get('http://localhost:5000/api/upload/sharedwith', {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });

    setShared(res.data.shared);
  }, []);

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
        open={open_3}
        onClose={handleClose_3}
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
          <Button onClick={handleClose_3} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div id='displayInfoNav'>
        <h1>Folders</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {selectedFolder && (
            <Button variant='outlined' onClick={() => getFilesOrFolders()}>
              back to root folder
            </Button>
          )}
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-controlled-open-select-label'>
              Shared Folder
            </InputLabel>
            <Select
              labelId='demo-controlled-open-select-label'
              id='demo-controlled-open-select'
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
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
                        onClick={() =>
                          handleClickOpen_3({ ...item, isFolder: true })
                        }>
                        <Info />
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
                          <div style={{ display: 'flex' }}>
                            <IconButton
                              color='primary'
                              onClick={() =>
                                handleClickOpen_3({ ...item, isFolder: false })
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
                          <div style={{ display: 'flex' }}>
                            <IconButton
                              color='primary'
                              onClick={() =>
                                handleClickOpen_3({ ...item, isFolder: false })
                              }>
                              <InfoOutlined />
                            </IconButton>
                          </div>
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
                              handleClickOpen_3({ ...item, isFolder: false })
                            }>
                            <InfoOutlined />
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
                          <IconButton
                            color='primary'
                            onClick={() =>
                              handleClickOpen_3({ ...item, isFolder: false })
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
