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
  DialogActions,
  Dialog,
  TextField,
  ListItemSecondaryAction,
  Menu,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  DeleteOutlined,
  Create,
  Info,
  InfoOutlined,
  GetAppOutlined,
  Share,
  Delete,
  Visibility,
  StarOutline,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
}));

export default function DisplayContainer({
  user,
  getUser,
  selector,
  setSelector,
}) {
  const [files, setFiles] = React.useState([]);
  const [saveFiles, setSaveFiles] = React.useState([]);
  const [folders, setFolders] = React.useState([]);
  const [sameFolder, setSameFolder] = React.useState(false);
  const [selectedFolder, setSelectedFolder] = React.useState('');
  const [selectedPath, setSelectedPath] = React.useState('');
  const [whole, setWhole] = React.useState(false);
  const [open_1, setOpen_1] = React.useState(false);
  const [open_3, setOpen_3] = React.useState(false);
  const [open_4, setOpen_4] = React.useState(false);
  const [shared, setShared] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectOpen, setSelectOpen] = React.useState(false);
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = React.useState('');
  const [usersList, setUsersList] = React.useState([]);
  const [itemDetails, setItemDetails] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleSelectOpen = () => {
    setSelectOpen(true);
  };

  const handleClickOpen_1 = () => {
    setOpen_1(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen_3 = (item) => {
    setOpen_3(true);
    setItemDetails(item);
  };

  const handleClickOpen_4 = (item) => {
    setOpen_4(true);
    setItemDetails(item);
  };

  const handleClose_1 = () => {
    setOpen_1(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser('');
  };

  const handleSelectClose = () => {
    setSelectOpen(false);
    setSelectedUser('');
  };

  const handleClose_3 = () => {
    setOpen_3(false);
    setItemDetails({});
  };

  const handleClose_4 = () => {
    setOpen_4(false);
    setItemDetails({});
  };

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

  const addToStarred = async (name) => {
    let temp = user.folderPath.split('\\');

    temp.splice(temp.length - 1, 0, 'starred');

    if (selector.folderName) temp.splice(temp.length, 0, selector.folderName);

    const oldPath = selector.folderName
      ? user.folderPath + '\\' + selector.folderName + '\\' + name
      : user.folderPath + '\\' + name;
    const newPath = temp.join('\\') + '\\' + name;
    const res = await axios.post(
      'http://localhost:5000/api/upload/stare',
      { newPath, oldPath },
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    alert(res.data.message);

    if (res.data.success) {
      // getUser();
      getFilesOrFolders(selector.folderName);
    }
  };

  const deleteFileOrFolder = async (name) => {
    let temp = user.folderPath.split('\\');

    temp.splice(temp.length - 1, 0, 'trash');

    if (selector.folderName) temp.splice(temp.length, 0, selector.folderName);

    const oldPath = selector.folderName
      ? user.folderPath + '\\' + selector.folderName + '\\' + name
      : user.folderPath + '\\' + name;
    const newPath = temp.join('\\') + '\\' + name;
    const res = await axios.post(
      'http://localhost:5000/api/upload/trash',
      { newPath, oldPath },
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    alert(res.data.message);

    if (res.data.success) {
      // getUser();
      getFilesOrFolders(selector.folderName);
    }
  };

  const uploadFiles = async () => {
    const formData = new FormData();
    let size = 0;

    for (let i = 0; i < saveFiles.length; i++) {
      size += saveFiles[i].size;

      formData.append('files', saveFiles[i]);
    }

    if (user?.currentStorage + size / 1024 / 1024 / 1024 >= user?.storageLimit)
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
        // getUser();
        getFilesOrFolders(selector.folderName);
      }
    }
  };

  React.useEffect(() => {
    getFilesOrFolders();
  }, []);

  React.useEffect(async () => {
    const res = await axios.get('http://localhost:5000/api/user/all', {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });

    setUsersList(res.data.users);
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

  const shareFolder = async () => {
    if (!selectedUser) return alert('Select a user!');

    let res;

    if (whole) {
      res = await axios.put(
        'http://localhost:5000/api/upload/share',
        {
          userId: selectedUser._id,
          wholeFolder: whole,
        },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        },
      );
    } else {
      res = await axios.put(
        'http://localhost:5000/api/upload/share',
        {
          userId: selectedUser._id,
          path: selectedPath,
          wholeFolder: whole,
        },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        },
      );
    }

    alert(res.data.message);

    if (res.data.success) {
      // getUser();
      handleClose();
    }
  };

  const handleDelete = async (userId, wholeFolder, path) => {
    if (wholeFolder) {
      const res = await axios.put(
        'http://localhost:5000/api/upload/unshare',
        { wholeFolder, userId },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        },
      );

      alert(res.data.message);

      if (res.data.success) {
        getSharedList();
        handleClose_1();
      }
    } else {
      const res = await axios.put(
        'http://localhost:5000/api/upload/unshare',
        { userId, path },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        },
      );

      alert(res.data.message);

      if (res.data.success) {
        getSharedList();
        handleClose_1();
      }
    }
  };

  const handleNameChange = async (e) => {
    e.preventDefault();

    let newPath = itemDetails.location.split('\\');

    newPath.pop();

    !itemDetails.isFolder
      ? newPath.push(
          e.target.name.value +
            '.' +
            itemDetails.location
              .split('\\')
              [itemDetails.location.split('\\').length - 1].split('.')[
              itemDetails.location
                .split('\\')
                [itemDetails.location.split('\\').length - 1].split('.')
                .length - 1
            ],
        )
      : newPath.push(e.target.name.value);

    newPath = newPath.join('\\');

    const res = await axios.put(
      'http://localhost:5000/api/upload/rename',
      { newPath, oldPath: itemDetails.location },
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    alert(res.data.message);

    if (res.data.success) {
      getFilesOrFolders();
      handleClose_4();
    }
  };

  const getSharedList = async () => {
    const res = await axios.get('http://localhost:5000/api/upload/sharedby', {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });

    setShared(res.data.shared);
  };

  React.useEffect(async () => {
    getSharedList();
  }, []);

  return (
    <div>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}>
        {/* <MenuItem
          onClick={() => {
            handleMenuClose();
            handleClickOpen_1();
          }}>
          Shared with
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleClickOpen();
          }}>
          Share
        </MenuItem>
      </Menu>
      <Dialog
        open={open_1}
        onClose={handleClose_1}
        aria-labelledby='form-dialog-title-1'>
        <DialogTitle id='form-dialog-title-1'>Shared with</DialogTitle>
        <DialogContent>
          <List className={classes.root}>
            {shared && shared.length !== 0 ? (
              shared?.map((item, index) => (
                <ListItem key={index} role={undefined} dense>
                  <ListItemText
                    id={index}
                    primary={
                      item.sharedWith.firstName +
                      ' ' +
                      item.sharedWith.lastName +
                      ' (Delete all shared)'
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge='end'
                      aria-label='comments'
                      onClick={() => handleDelete(item.sharedWith._id, true)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (
              <Typography variant='h6'>Not shared with anyone!</Typography>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose_1} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title-2'>
        <DialogTitle id='form-dialog-title-2'>Share with</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-controlled-open-select-label'>
              Select User
            </InputLabel>
            <Select
              labelId='demo-controlled-open-select-label'
              id='demo-controlled-open-select'
              open={selectOpen}
              onClose={handleSelectClose}
              onOpen={handleSelectOpen}
              value={selectedUser}
              onChange={handleChange}>
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {usersList.map((item) => (
                <MenuItem value={item}>
                  {item.firstName + ' ' + item.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
          <Button onClick={shareFolder} color='primary'>
            Share
          </Button>
        </DialogActions>
      </Dialog>
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
              <b>Folder size (MB):</b>{' '}
              {(itemDetails.size / 1024 / 1024).toFixed(2)}
              <br />
              <b>Folder name:</b> {itemDetails.folderName}
              <br />
              <b>Folder location:</b> {itemDetails.location}
              <br />
              <b>Created at:</b> {itemDetails.createdAt}
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
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose_3} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open_4}
        onClose={handleClose_4}
        aria-labelledby='form-dialog-title-2'>
        <DialogTitle id='form-dialog-title-2'>Edit name</DialogTitle>
        <DialogContent>
          <form onSubmit={handleNameChange}>
            <TextField
              variant='outlined'
              size='small'
              required
              label='Name'
              name='name'
            />
            <Button type='submit' variant='contained'>
              Save
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose_4} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div id='displayInfoNav'>
        <h1>Folders</h1>
        {selector.folderName ? (
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
        ) : (
          <div>
            <Button variant='outlined' onClick={handleClickOpen_1}>
              Shared with
            </Button>
            <Button variant='outlined' onClick={handleClickOpen}>
              Share
            </Button>
          </div>
        )}
      </div>
      <div id='contentDisplayer'>
        {folders?.length > 0 ? (
          folders.map((item) => (
            <Card style={{ maxHeight: '80px', margin: '10px' }}>
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
                          handleClickOpen_4({ ...item, isFolder: true })
                        }>
                        <Create />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          handleClickOpen_3({ ...item, isFolder: true })
                        }>
                        <Info />
                      </IconButton>
                      <IconButton onClick={() => addToStarred(item.folderName)}>
                        <StarOutline />
                      </IconButton>
                      <IconButton onClick={() => selectFolder(item.folderName)}>
                        <Visibility />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteFileOrFolder(item.folderName)}>
                        <Delete />
                      </IconButton>
                      <IconButton
                        onClick={(e) => {
                          handleClick(e);
                          // handleClickOpen();
                          setSelectedPath(item.location);
                        }}>
                        <Share />
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
                                handleClickOpen_4({ ...item, isFolder: false })
                              }>
                              <Create />
                            </IconButton>
                            <IconButton
                              color='primary'
                              onClick={() =>
                                handleClickOpen_3({ ...item, isFolder: false })
                              }>
                              <InfoOutlined />
                            </IconButton>
                            <IconButton
                              color='primary'
                              onClick={() =>
                                addToStarred(item.fileNameWithExt)
                              }>
                              <StarOutline />
                            </IconButton>
                            <IconButton
                              color='primary'
                              onClick={() =>
                                deleteFileOrFolder(item.fileNameWithExt)
                              }>
                              <DeleteOutlined />
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
                            <IconButton
                              color='primary'
                              onClick={(e) => {
                                handleClick(e);
                                // handleClickOpen();
                                setSelectedPath(item.location);
                              }}>
                              <Share />
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
                          <>
                            <IconButton
                              color='primary'
                              onClick={() =>
                                handleClickOpen_4({ ...item, isFolder: false })
                              }>
                              <Create />
                            </IconButton>
                            <IconButton
                              color='primary'
                              onClick={() =>
                                addToStarred(item.fileNameWithExt)
                              }>
                              <StarOutline />
                            </IconButton>
                            <IconButton
                              color='primary'
                              onClick={() =>
                                handleClickOpen_3({ ...item, isFolder: false })
                              }>
                              <InfoOutlined />
                            </IconButton>
                            <IconButton
                              color='primary'
                              onClick={() =>
                                deleteFileOrFolder(item.fileNameWithExt)
                              }>
                              <DeleteOutlined />
                            </IconButton>
                            <IconButton
                              color='primary'
                              onClick={(e) => {
                                handleClick(e);
                                // handleClickOpen();
                                setSelectedPath(item.location);
                              }}>
                              <Share />
                            </IconButton>
                          </>
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
                          <>
                            <IconButton
                              color='primary'
                              onClick={() =>
                                handleClickOpen_4({ ...item, isFolder: false })
                              }>
                              <Create />
                            </IconButton>
                            <IconButton
                              color='primary'
                              onClick={() =>
                                addToStarred(item.fileNameWithExt)
                              }>
                              <StarOutline />
                            </IconButton>
                            <IconButton
                              color='primary'
                              onClick={() =>
                                handleClickOpen_3({ ...item, isFolder: false })
                              }>
                              <InfoOutlined />
                            </IconButton>
                            <IconButton
                              color='primary'
                              onClick={() =>
                                deleteFileOrFolder(item.fileNameWithExt)
                              }>
                              <DeleteOutlined />
                            </IconButton>
                            <IconButton
                              color='primary'
                              onClick={(e) => {
                                handleClick(e);
                                // handleClickOpen();
                                setSelectedPath(item.location);
                              }}>
                              <Share />
                            </IconButton>
                          </>
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
                              handleClickOpen_4({ ...item, isFolder: false })
                            }>
                            <Create />
                          </IconButton>
                          <IconButton
                            color='primary'
                            onClick={() =>
                              handleClickOpen_3({ ...item, isFolder: false })
                            }>
                            <InfoOutlined />
                          </IconButton>
                          <IconButton
                            color='primary'
                            onClick={() => addToStarred(item.fileNameWithExt)}>
                            <StarOutline />
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
                          <IconButton
                            color='primary'
                            onClick={() =>
                              deleteFileOrFolder(item.fileNameWithExt)
                            }>
                            <DeleteOutlined />
                          </IconButton>
                          <IconButton
                            color='primary'
                            onClick={(e) => {
                              handleClick(e);
                              // handleClickOpen();
                              setSelectedPath(item.location);
                            }}>
                            <Share />
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
