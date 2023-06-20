import React, { useEffect } from 'react';
import '../css/DisplayContainer.css';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
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
  Box,
  CircularProgress,
  Backdrop,
  Breadcrumbs,
  Link,
  Checkbox,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  DeleteOutlined,
  Create,
  Info,
  InfoOutlined,
  Forward,
  FileCopy,
  GetApp,
  GetAppOutlined,
  Share,
  Delete,
  Visibility,
  MoreVert,
  StarOutline,
  Star,
} from '@material-ui/icons';
import { ToggleButton } from '@material-ui/lab';

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function CircularProgressWithLabel(props) {
  return (
    <Box position='relative' display='inline-flex'>
      <CircularProgress variant='indeterminate' {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position='absolute'
        display='flex'
        alignItems='center'
        justifyContent='center'>
        <Typography
          variant='p'
          component='div'
          color='textSecondary'>{`${props.value}%`}</Typography>
      </Box>
    </Box>
  );
}

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function DisplayContainer({
  user,
  selector,
  setSelector,
  search,
}) {
  const [files, setFiles] = React.useState([]);
  const [saveFiles, setSaveFiles] = React.useState([]);
  const [saveFolder, setSaveFolder] = React.useState([]);
  const [folders, setFolders] = React.useState([]);
  const [sameFolder, setSameFolder] = React.useState(false);
  const [selectedFolder, setSelectedFolder] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState({});
  const [selectedFolderPath, setSelectedFolderPath] = React.useState('');
  const [oldFolder, setOldFolder] = React.useState('');
  const [newPath, setNewPath] = React.useState('');
  const [selectedPath, setSelectedPath] = React.useState('');
  const [move, setMove] = React.useState(false);
  const [open_1, setOpen_1] = React.useState(false);
  const [open_2, setOpen_2] = React.useState(false);
  const [open_3, setOpen_3] = React.useState(false);
  const [open_4, setOpen_4] = React.useState(false);
  const [open_5, setOpen_5] = React.useState(false);
  const [shared, setShared] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectOpen1, setSelectOpen1] = React.useState(false);
  const [selectOpen2, setSelectOpen2] = React.useState(false);
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = React.useState('');
  const [usersList, setUsersList] = React.useState([]);
  const [itemDetails, setItemDetails] = React.useState({});
  const [anchorEl_1, setAnchorEl_1] = React.useState(null);
  const [anchorEl_2, setAnchorEl_2] = React.useState(null);
  const [anchorEl_3, setAnchorEl_3] = React.useState(null);
  const [anchorEl_4, setAnchorEl_4] = React.useState(null);
  const [anchorEl_5, setAnchorEl_5] = React.useState(null);
  const [percentage, setPercentage] = React.useState(0);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const [folder, setFolder] = React.useState(false);
  const [linkFolderPath, setLinkFolderPath] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [select, setSelect] = React.useState(false);
  const [downloadFiles, setDownloadFiles] = React.useState([]);
  const [downloadFileNames, setDownloadFileNames] = React.useState([]);
  const zip = JSZip();

  const handleClick_1 = (event) => {
    setAnchorEl_1(event.currentTarget);
  };

  const handleMenuClose_1 = () => {
    setAnchorEl_1(null);
  };

  const handleClick_2 = (event) => {
    setAnchorEl_2(event.currentTarget);
  };

  const handleMenuClose_2 = () => {
    setAnchorEl_2(null);
  };

  const handleClick_3 = (event) => {
    setAnchorEl_3(event.currentTarget);
  };

  const handleMenuClose_3 = () => {
    setAnchorEl_3(null);
  };

  const handleClick_4 = (event) => {
    setAnchorEl_4(event.currentTarget);
  };

  const handleMenuClose_4 = () => {
    setAnchorEl_4(null);
  };

  const handleClick_5 = (event) => {
    setAnchorEl_5(event.currentTarget);
  };

  const handleMenuClose_5 = () => {
    setAnchorEl_5(null);
  };

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleSelectOpen1 = () => {
    setSelectOpen1(true);
  };

  const handleSelectOpen2 = () => {
    setSelectOpen2(true);
  };

  const handleClickOpen_1 = () => {
    setOpen_1(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
    handleMenuClose_1();
    handleMenuClose_2();
    handleMenuClose_3();
    handleMenuClose_4();
    handleMenuClose_5();
  };

  const handleClickOpen_3 = (item) => {
    setOpen_3(true);
    setItemDetails(item);
    handleMenuClose_1();
    handleMenuClose_2();
    handleMenuClose_3();
    handleMenuClose_4();
    handleMenuClose_5();
  };

  const handleClickOpen_2 = () => {
    setOpen_2(true);
    handleMenuClose_1();
    handleMenuClose_2();
    handleMenuClose_3();
    handleMenuClose_4();
    handleMenuClose_5();
  };

  const handleClickOpen_4 = (item) => {
    setOpen_4(true);
    setItemDetails(item);
    handleMenuClose_1();
    handleMenuClose_2();
    handleMenuClose_3();
    handleMenuClose_4();
    handleMenuClose_5();
  };

  const handleClickOpen_5 = (item) => {
    setOpen_5(true);
  };

  const handleClose_1 = () => {
    setOpen_1(false);
  };

  const handleClose = () => {
    setOpen(false);
    setShow(false);
    setSelectedUser('');
    setLinkFolderPath('');
    setSelectedPath('');
  };

  const handleSelectClose1 = () => {
    setSelectOpen1(false);
    setSelectedUser('');
  };

  const handleSelectClose2 = () => {
    setSelectOpen2(false);
  };

  const handleClose_3 = () => {
    setOpen_3(false);
    setItemDetails({});
  };

  const handleClose_4 = () => {
    setOpen_4(false);
    setItemDetails({});
  };

  const handleClose_5 = () => {
    setOpen_5(false);
  };

  const handleClose_2 = () => {
    setOpen_2(false);
    setMove(false);
    setOldFolder('');
    setNewPath('');
  };

  const selectFolder = (folderName, index, path) => {
    if (folderName && !index) {
      setSelectedFolder((prev) => prev + '/' + folderName);
      setSelectedFolderPath(path);
      handleMenuClose_1();
      handleMenuClose_2();
      handleMenuClose_3();
      handleMenuClose_4();
      handleMenuClose_5();

      getFilesOrFolders(
        selectedFolder ? selectedFolder + '/' + folderName : folderName,
      );
    } else if (folderName && index) {
      let test = selectedFolderPath.split('\\');
      let temp = selectedFolder.split('/');
      let tempIndex;
      let removed;

      tempIndex = test.indexOf(
        user.firstName + '-' + user.lastName + '-' + user._id,
      );
      removed = test.splice(0, tempIndex + 1);
      test.splice(index, test.length - index);
      test = test.join('\\');
      removed = removed.join('\\');
      temp.splice(index + 1, temp.length - index - 1);
      temp = temp.join('/');

      handleMenuClose_1();
      handleMenuClose_2();
      handleMenuClose_3();
      handleMenuClose_4();
      handleMenuClose_5();

      setSelectedFolderPath(removed + '\\' + test);
      setSelectedFolder(temp);
      getFilesOrFolders(temp);
    } else {
      handleMenuClose_1();
      handleMenuClose_2();
      handleMenuClose_3();
      handleMenuClose_4();
      handleMenuClose_5();
      getFilesOrFolders();
    }
  };

  const getFilesOrFolders = async (folderName) => {
    if (user?._id) {
      if (folderName) {
        const res = await axios.get(
          `http://localhost:5000/api/upload?folderName=${folderName}&search=${search}&userId=${user._id}`,
          {
            headers: {
              'x-auth-token': localStorage.getItem('token'),
            },
          },
        );

        if (!res.data.success) alert(res.data.message);

        setFolders(res.data.folders);
        setFiles(res.data.files);
        setSelector({ ...selector, folderName });
      } else {
        const res = await axios.get(
          `http://localhost:5000/api/upload?search=${search}&userId=${user._id}`,
          {
            headers: {
              'x-auth-token': localStorage.getItem('token'),
            },
          },
        );

        if (!res.data.success) alert(res.data.message);

        setFolders(res.data.folders);
        setFiles(res.data.files);
        setSelector({ ...selector, folderName: '' });
        setSelectedFolder('');
        setSelectedFolderPath('');
      }
    }
  };

  const addToStarred = async (name) => {
    let temp = user.folderPath.split('\\');

    temp.splice(temp.length - 1, 0, 'starred');

    if (selectedFolder) temp.splice(temp.length, 0, selectedFolder);

    const oldPath = selectedFolder
      ? user.folderPath + '\\' + selectedFolder + '\\' + name
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

    handleMenuClose_1();
    handleMenuClose_2();
    handleMenuClose_3();
    handleMenuClose_4();
    handleMenuClose_5();

    if (res.data.success) {
      // getUser();
      getFilesOrFolders(selectedFolder);
    }
  };

  const deleteFileOrFolder = async (name) => {
    let temp = user.folderPath.split('\\');

    temp.splice(temp.length - 1, 0, 'trash');

    if (selectedFolder) temp.splice(temp.length, 0, selectedFolder);

    const oldPath = selectedFolder
      ? user.folderPath + '\\' + selectedFolder + '\\' + name
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

    handleMenuClose_1();
    handleMenuClose_2();
    handleMenuClose_3();
    handleMenuClose_4();
    handleMenuClose_5();

    if (res.data.success) {
      // getUser();
      getFilesOrFolders(selectedFolder);
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

    if (selectedFolder) {
      const res = await axios.post(
        'http://localhost:5000/api/upload?folderName=' +
          selectedFolder +
          '&sameFolder=' +
          sameFolder,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;

            // if (percent <= 100) {
            setPercentage(Math.floor((loaded * 100) / total));
            // }
          },
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        },
      );

      alert(res.data.message);

      setSaveFiles([]);
      setSameFolder(false);
      setOpenBackDrop(false);

      if (res.data.success) {
        setPercentage(0);

        // getUser();

        getFilesOrFolders(selectedFolder);
      }
    }
  };

  const uploadFolder = async () => {
    const formData = new FormData();
    let size = 0;
    let folderName = '';
    let folderNames = {};
    let index;
    let temp = '';

    for (let i = 0; i < saveFolder.length; i++) {
      temp = saveFolder[i].webkitRelativePath.split('/');
      index = temp.indexOf(saveFolder[i].name);

      if (index - 1 === 0) {
        folderNames[saveFolder[i].name] = null;
      } else {
        temp = temp.slice(1, index);
        temp = temp.join('/');
        folderNames[saveFolder[i].name] = temp;
      }

      size += saveFolder[i].size;
      folderName = saveFolder[i].webkitRelativePath;
    }

    formData.append('folders', JSON.stringify(folderNames));

    for (let i = 0; i < saveFolder.length; i++)
      formData.append('files', saveFolder[i]);

    if (user?.currentStorage + size / 1024 / 1024 / 1024 >= user?.storageLimit)
      return alert('Uploaded files size is greater than your storage limit');

    folderName = folderName.split('/')[0];

    if (selectedFolder) {
      const res = await axios.post(
        'http://localhost:5000/api/upload?folderName=' +
          selectedFolder +
          '&sameFolder=' +
          sameFolder +
          '&uploadFolderName=' +
          folderName,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;

            // if (percent <= 100) {
            setPercentage(Math.floor((loaded * 100) / total));
            // }
          },
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        },
      );

      alert(res.data.message);

      setSaveFolder([]);
      setSameFolder(false);
      setOpenBackDrop(false);

      if (res.data.success) {
        setPercentage(0);

        // getUser();

        getFilesOrFolders(selectedFolder);
      }
    }
  };

  React.useEffect(() => {
    getFilesOrFolders(selectedFolder);
  }, [search, user]);

  React.useEffect(async () => {
    const res = await axios.get('http://localhost:5000/api/user/all', {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });

    setUsersList(res.data.users);
  }, []);

  React.useEffect(() => {
    if (saveFiles.length > 0) {
      uploadFiles();
      setOpenBackDrop(true);
    }
  }, [saveFiles]);

  React.useEffect(() => {
    if (saveFolder.length > 0) {
      uploadFolder();
      setOpenBackDrop(true);
    }
  }, [saveFolder]);

  const onUploadFiles = (e) => {
    const arr = [];

    for (let i = 0; i < e.target.files.length; i++) {
      arr.push(e.target.files[i]);
    }

    setSaveFiles(arr);
    setSameFolder(true);
  };

  const onUploadFolder = (e) => {
    const arr = [];

    for (let i = 0; i < e.target.files.length; i++) {
      arr.push(e.target.files[i]);
    }

    setSaveFolder(arr);
    setSameFolder(true);
  };

  const shareFolder = async () => {
    if (!selectedUser) return alert('Select a user!');

    let res;

    if (!selectedPath) {
      res = await axios.put(
        'http://localhost:5000/api/upload/share',
        {
          userId: selectedUser._id,
          wholeFolder: true,
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
          wholeFolder: false,
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
      getSharedList();
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

  const moveOrCopy = async () => {
    const res = await axios.post(
      'http://localhost:5000/api/upload/moveorcopy',
      {
        oldPath: oldFolder.location,
        newPath: newPath === 'Root' ? user.folderPath : newPath,
        move,
        folder,
      },
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    alert(res.data.message);

    if (res.data.success) {
      handleClose_2();
      getFilesOrFolders();
    }
  };

  const removeFromStarred = async (path) => {
    let starredTemp = path.split('\\');
    const index = starredTemp.indexOf(
      `${user.firstName}-${user.lastName}-${user._id}`,
    );

    starredTemp.splice(index, 0, 'starred');
    starredTemp = starredTemp.join('\\');

    const res = await axios.post(
      'http://localhost:5000/api/upload/unstare',
      { customPath: starredTemp },
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    alert(res.data.message);

    handleMenuClose_1();
    handleMenuClose_2();
    handleMenuClose_3();
    handleMenuClose_4();
    handleMenuClose_5();

    if (res.data.success) {
      getFilesOrFolders();
    }
  };

  React.useEffect(() => {
    if (!open) setSelectedPath('');
  }, [open]);

  const createFolder = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      'http://localhost:5000/api/upload/create',
      { folderName: e.target.folderName.value, createPath: selectedFolderPath },
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    alert(res.data.message);

    if (res.data.success) {
      handleClose_5();
      getFilesOrFolders(selectedFolder);
    }
  };

  React.useEffect(() => {
    if (selectedPath) {
      let temp = selectedPath.split('\\');
      let index;

      index = temp.indexOf(
        user.firstName + '-' + user.lastName + '-' + user._id,
      );

      temp.splice(0, index + 1);
      temp = temp.join('/');

      setLinkFolderPath(temp);
    }
  }, [selectedPath]);

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
    let temp = selectedFolder.split('/');

    temp.shift();
    temp = temp.join('/');

    const res = await axios.get(
      `http://localhost:5000/api/upload/folderdirectory?folderName=${
        temp + '/' + folderName
      }&userPath=${user.folderPath}`,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      },
    );

    handleMenuClose_1();
    handleMenuClose_2();
    handleMenuClose_3();
    handleMenuClose_4();
    handleMenuClose_5();

    if (res.data.success) generateZip(res.data);
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
      <Backdrop className={classes.backdrop} open={openBackDrop}>
        <CircularProgressWithLabel
          color='primary'
          value={percentage}
          size={80}
        />
      </Backdrop>
      <Dialog
        open={open_5}
        onClose={handleClose_5}
        aria-labelledby='form-dialog-title-2'>
        <DialogTitle id='form-dialog-title-2'>Create folder</DialogTitle>
        <form onSubmit={createFolder}>
          <DialogContent>
            <FormControl className={classes.formControl}>
              <TextField
                label='Folder Name'
                name='folderName'
                variant='outlined'
                required
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose_5} color='primary'>
              Close
            </Button>
            <Button type='submit' color='primary'>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* folders */}
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl_1}
        keepMounted
        open={Boolean(anchorEl_1)}
        onClose={handleMenuClose_1}>
        <StyledMenuItem
          onClick={() =>
            handleClickOpen_4({ ...selectedItem, isFolder: true })
          }>
          <ListItemIcon>
            <Create fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Rename' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setMove(true);
            setFolder(true);
            setOldFolder(selectedItem);
            handleClickOpen_2();
          }}>
          <ListItemIcon>
            <Forward />
          </ListItemIcon>
          <ListItemText primary='Move' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setOldFolder(selectedItem);
            setMove(false);
            setFolder(true);
            handleClickOpen_2();
          }}>
          <ListItemIcon>
            <FileCopy />
          </ListItemIcon>
          <ListItemText primary='Copy' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() =>
            handleClickOpen_3({ ...selectedItem, isFolder: true })
          }>
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary='Information' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => getFolderChildren(selectedItem.folderName)}>
          <ListItemIcon>
            <GetApp />
          </ListItemIcon>
          <ListItemText primary='Download' />
        </StyledMenuItem>
        {selectedItem.favourite
          ? !selectedFolder && (
              <StyledMenuItem
                onClick={() => removeFromStarred(selectedItem.location)}>
                <ListItemIcon>
                  <Star />
                </ListItemIcon>
                <ListItemText primary='Remove from favourites' />
              </StyledMenuItem>
            )
          : !selectedFolder && (
              <StyledMenuItem
                onClick={() => addToStarred(selectedItem.folderName)}>
                <ListItemIcon>
                  <StarOutline />
                </ListItemIcon>
                <ListItemText primary='Add to Favourites' />
              </StyledMenuItem>
            )}
        <StyledMenuItem
          onClick={() =>
            selectFolder(
              selectedItem.folderName,
              undefined,
              selectedItem.location,
            )
          }>
          <ListItemIcon>
            <Visibility />
          </ListItemIcon>
          <ListItemText primary='Open' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => deleteFileOrFolder(selectedItem.folderName)}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary='Delete' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={(e) => {
            // handleClick(e);
            handleClickOpen();
            setSelectedPath(selectedItem.location);
          }}>
          <ListItemIcon>
            <Share />
          </ListItemIcon>
          <ListItemText primary='Share' />
        </StyledMenuItem>
      </StyledMenu>
      {/* images */}
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl_2}
        keepMounted
        open={Boolean(anchorEl_2)}
        onClose={handleMenuClose_2}>
        <StyledMenuItem
          onClick={() =>
            handleClickOpen_4({
              ...selectedItem,
              isFolder: false,
            })
          }>
          <ListItemIcon>
            <Create />
          </ListItemIcon>
          <ListItemText primary='Rename' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setMove(true);
            setFolder(false);
            setOldFolder(selectedItem);
            handleClickOpen_2();
          }}>
          <ListItemIcon>
            <Forward />
          </ListItemIcon>
          <ListItemText primary='Move' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setOldFolder(selectedItem);
            setFolder(false);
            setMove(false);
            handleClickOpen_2();
          }}>
          <ListItemIcon>
            <FileCopy />
          </ListItemIcon>
          <ListItemText primary='Copy' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() =>
            handleClickOpen_3({
              ...selectedItem,
              isFolder: false,
            })
          }>
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText primary='Information' />
        </StyledMenuItem>
        {selectedItem.favourite ? (
          <StyledMenuItem
            onClick={() => removeFromStarred(selectedItem.location)}>
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText primary='Remove from favourites' />
          </StyledMenuItem>
        ) : (
          <StyledMenuItem
            onClick={() => addToStarred(selectedItem.fileNameWithExt)}>
            <ListItemIcon>
              <StarOutline />
            </ListItemIcon>
            <ListItemText primary='Add to Favourites' />
          </StyledMenuItem>
        )}
        <StyledMenuItem
          onClick={() => deleteFileOrFolder(selectedItem.fileNameWithExt)}>
          <ListItemIcon>
            <DeleteOutlined />
          </ListItemIcon>
          <ListItemText primary='Delete' />
        </StyledMenuItem>
        <StyledMenuItem>
          <a
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={handleMenuClose_2}
            download={selectedItem.fileNameWithExt}
            href={`data:${selectedItem.mimeType};base64,${selectedItem.file}`}>
            <ListItemIcon>
              <GetAppOutlined />
            </ListItemIcon>
            <ListItemText primary='Download' style={{ color: '#000000DE' }} />
          </a>
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            // handleClick(e);
            handleClickOpen();
            setSelectedPath(selectedItem.location);
          }}>
          <ListItemIcon>
            <Share />
          </ListItemIcon>
          <ListItemText primary='Share' />
        </StyledMenuItem>
      </StyledMenu>
      {/* videos */}
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl_3}
        keepMounted
        open={Boolean(anchorEl_3)}
        onClose={handleMenuClose_3}>
        <StyledMenuItem
          onClick={() =>
            handleClickOpen_4({
              ...selectedItem,
              isFolder: false,
            })
          }>
          <ListItemIcon>
            <Create />
          </ListItemIcon>
          <ListItemText primary='Rename' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setOldFolder(selectedItem);
            setFolder(false);
            setMove(true);
            handleClickOpen_2();
          }}>
          <ListItemIcon>
            <Forward />
          </ListItemIcon>
          <ListItemText primary='Move' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setOldFolder(selectedItem);
            setFolder(false);
            setMove(false);
            handleClickOpen_2();
          }}>
          <ListItemIcon>
            <FileCopy />
          </ListItemIcon>
          <ListItemText primary='Copy' />
        </StyledMenuItem>
        {selectedItem.favourite ? (
          <StyledMenuItem
            onClick={() => removeFromStarred(selectedItem.location)}>
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText primary='Remove from favourites' />
          </StyledMenuItem>
        ) : (
          <StyledMenuItem
            onClick={() => addToStarred(selectedItem.fileNameWithExt)}>
            <ListItemIcon>
              <StarOutline />
            </ListItemIcon>
            <ListItemText primary='Add to Favourites' />
          </StyledMenuItem>
        )}
        <StyledMenuItem
          onClick={() =>
            handleClickOpen_3({
              ...selectedItem,
              isFolder: false,
            })
          }>
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText primary='Information' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => deleteFileOrFolder(selectedItem.fileNameWithExt)}>
          <ListItemIcon>
            <DeleteOutlined />
          </ListItemIcon>
          <ListItemText primary='Delete' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            // handleClick(e);
            handleClickOpen();
            setSelectedPath(selectedItem.location);
          }}>
          <ListItemIcon>
            <Share />
          </ListItemIcon>
          <ListItemText primary='Share' />
        </StyledMenuItem>
      </StyledMenu>
      {/* Audios */}
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl_4}
        keepMounted
        open={Boolean(anchorEl_4)}
        onClose={handleMenuClose_4}>
        <StyledMenuItem
          onClick={() =>
            handleClickOpen_4({
              ...selectedItem,
              isFolder: false,
            })
          }>
          <ListItemIcon>
            <Create />
          </ListItemIcon>
          <ListItemText primary='Rename' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setOldFolder(selectedItem);
            setFolder(false);
            setMove(true);
            handleClickOpen_2();
          }}>
          <ListItemIcon>
            <Forward />
          </ListItemIcon>
          <ListItemText primary='Move' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setOldFolder(selectedItem);
            setFolder(false);
            setMove(false);
            handleClickOpen_2();
          }}>
          <ListItemIcon>
            <FileCopy />
          </ListItemIcon>
          <ListItemText primary='Copy' />
        </StyledMenuItem>
        {selectedItem.favourite ? (
          <StyledMenuItem
            onClick={() => removeFromStarred(selectedItem.location)}>
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText primary='Remove from favourites' />
          </StyledMenuItem>
        ) : (
          <StyledMenuItem
            onClick={() => addToStarred(selectedItem.fileNameWithExt)}>
            <ListItemIcon>
              <StarOutline />
            </ListItemIcon>
            <ListItemText primary='Add to Favourites' />
          </StyledMenuItem>
        )}
        <StyledMenuItem
          onClick={() =>
            handleClickOpen_3({
              ...selectedItem,
              isFolder: false,
            })
          }>
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText primary='Information' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => deleteFileOrFolder(selectedItem.fileNameWithExt)}>
          <ListItemIcon>
            <DeleteOutlined />
          </ListItemIcon>
          <ListItemText primary='Delete' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            // handleClick(e);
            handleClickOpen();
            setSelectedPath(selectedItem.location);
          }}>
          <ListItemIcon>
            <Share />
          </ListItemIcon>
          <ListItemText primary='Share' />
        </StyledMenuItem>
      </StyledMenu>
      {/* Documents */}
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl_5}
        keepMounted
        open={Boolean(anchorEl_5)}
        onClose={handleMenuClose_5}>
        <StyledMenuItem
          onClick={() =>
            handleClickOpen_4({
              ...selectedItem,
              isFolder: false,
            })
          }>
          <ListItemIcon>
            <Create />
          </ListItemIcon>
          <ListItemText primary='Rename' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setMove(true);
            setFolder(false);
            setOldFolder(selectedItem);
            handleClickOpen_2();
          }}>
          <ListItemIcon>
            <Forward />
          </ListItemIcon>
          <ListItemText primary='Move' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setFolder(false);
            setOldFolder(selectedItem);
            setMove(false);
            handleClickOpen_2();
          }}>
          <ListItemIcon>
            <FileCopy />
          </ListItemIcon>
          <ListItemText primary='Copy' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() =>
            handleClickOpen_3({
              ...selectedItem,
              isFolder: false,
            })
          }>
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText primary='Information' />
        </StyledMenuItem>
        {selectedItem.favourite ? (
          <StyledMenuItem
            onClick={() => removeFromStarred(selectedItem.location)}>
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText primary='Remove from favourites' />
          </StyledMenuItem>
        ) : (
          <StyledMenuItem
            onClick={() => addToStarred(selectedItem.fileNameWithExt)}>
            <ListItemIcon>
              <StarOutline />
            </ListItemIcon>
            <ListItemText primary='Add to Favourites' />
          </StyledMenuItem>
        )}
        <StyledMenuItem>
          <a
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={handleMenuClose_5}
            href={`data:${selectedItem.mimeType};base64,${selectedItem.file}`}
            download={
              selectedItem?.fileNameWithExt &&
              selectedItem.fileNameWithExt.split('.')[1] === 'rar'
                ? selectedItem.fileNameWithExt
                : selectedItem.fileName
            }
            rel='noreferrer'
            target='_blank'>
            <ListItemIcon>
              <GetAppOutlined />
            </ListItemIcon>
            <ListItemText primary='Download' style={{ color: '#000000DE' }} />
          </a>
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => deleteFileOrFolder(selectedItem.fileNameWithExt)}>
          <ListItemIcon>
            <DeleteOutlined />
          </ListItemIcon>
          <ListItemText primary='Delete' />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            // handleClick(e);
            handleClickOpen();
            setSelectedPath(selectedItem.location);
          }}>
          <ListItemIcon>
            <Share />
          </ListItemIcon>
          <ListItemText primary='Share' />
        </StyledMenuItem>
      </StyledMenu>
      {/* <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleClickOpen_1();
          }}>
          Shared with
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClickOpen();
            handleMenuClose();
          }}>
          Share
        </MenuItem>
      </Menu> */}
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
          <ToggleButton
            // value={false}
            selected={show}
            onChange={() => {
              setShow((prev) => !prev);
            }}>
            share via link&nbsp;
            <Share />
          </ToggleButton>
          {show && (
            <div>
              <br />
              <Typography variant='body'>
                <Link
                  href={`http://localhost:3000/share/link/${user._id}/?path=${linkFolderPath}`}
                  target='_blank'>
                  http://localhost:3000/share/link/{user._id}/?path=
                  {linkFolderPath}
                </Link>
              </Typography>
            </div>
          )}
          <br />
          <br />
          <Divider />
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-controlled-open-select-label'>
              Select User
            </InputLabel>
            <Select
              labelId='demo-controlled-open-select-label'
              id='demo-controlled-open-select'
              open={selectOpen1}
              onClose={handleSelectClose1}
              onOpen={handleSelectOpen1}
              value={selectedUser}
              onChange={handleChange}>
              {(!usersList || usersList.length === 0) && (
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
              )}
              {usersList &&
                usersList.map((item) => (
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
              defaultValue={
                itemDetails.isFolder
                  ? itemDetails.folderName
                  : itemDetails.fileName
              }
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
      <Dialog
        open={open_2}
        onClose={handleClose_2}
        aria-labelledby='form-dialog-title-2'>
        <DialogTitle id='form-dialog-title-2'>
          {move ? 'Move' : 'Copy'} to
        </DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-controlled-open-select-label'>
              Select folder
            </InputLabel>
            <Select
              labelId='demo-controlled-open-select-label'
              id='demo-controlled-open-select'
              open={selectOpen2}
              onClose={handleSelectClose2}
              onOpen={handleSelectOpen2}
              value={newPath ? newPath : 'None'}
              onChange={(e) => setNewPath(e.target.value)}>
              <MenuItem value='None'>
                <em>None</em>
              </MenuItem>
              {selectedFolder.length && (
                <MenuItem value='Root'>
                  <em>Root</em>
                </MenuItem>
              )}
              {folders?.length > 0 &&
                folders.map((item) => {
                  return (
                    item.folderName !== oldFolder.folderName && (
                      <MenuItem value={item.location}>
                        {item.folderName}
                      </MenuItem>
                    )
                  );
                })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose_2} color='primary'>
            Close
          </Button>
          <Button onClick={() => moveOrCopy()} color='primary'>
            {move ? 'Move' : 'Copy'}
          </Button>
        </DialogActions>
      </Dialog>
      <div id='displayInfoNav'>
        <h1>Folders</h1>
        {selectedFolder ? (
          <div>
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
            <Button
              variant='outlined'
              component='span'
              onClick={handleClickOpen_5}>
              create folder in folder: <b>{selectedFolder}</b>
            </Button>
            <input
              style={{ display: 'none' }}
              id='contained-button-file'
              multiple
              type='file'
              onChange={onUploadFiles}
            />
            <label htmlFor='contained-button-file'>
              <Button variant='outlined' component='span'>
                upload files in Folder: <b>{selectedFolder}</b>
              </Button>
            </label>
            <input
              style={{ display: 'none' }}
              id='contained-button-folder'
              webkitdirectory='true'
              mozdirectory='true'
              directory='true'
              type='file'
              onChange={onUploadFolder}
            />
            <label htmlFor='contained-button-folder'>
              <Button variant='outlined' component='span'>
                upload folder in Folder: <b>{selectedFolder}</b>
              </Button>
            </label>
            <Button variant='outlined' onClick={() => getFilesOrFolders()}>
              back to root folder
            </Button>
          </div>
        ) : (
          <div>
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
            <Button variant='outlined' onClick={handleClickOpen_1}>
              Shared with
            </Button>
            <Button variant='outlined' onClick={handleClickOpen}>
              Share
            </Button>
          </div>
        )}
      </div>
      <div id='contentDisplayer' style={{ display: 'flex', flexWrap: 'wrap' }}>
        {folders?.length > 0 ? (
          folders.map((item) => (
            <>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* &nbsp;
              {select && <Checkbox color='primary' />} */}
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
                            onClick={(e) => {
                              handleClick_1(e);
                              setSelectedItem(item);
                            }}>
                            <MoreVert />
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
                                  onClick={(e) => {
                                    handleClick_2(e);
                                    setSelectedItem(item);
                                  }}>
                                  <MoreVert />
                                </IconButton>
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
                                  onClick={(e) => {
                                    handleClick_3(e);
                                    setSelectedItem(item);
                                  }}>
                                  <MoreVert />
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
                                  onClick={(e) => {
                                    handleClick_4(e);
                                    setSelectedItem(item);
                                  }}>
                                  <MoreVert />
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
                                onClick={(e) => {
                                  handleClick_5(e);
                                  setSelectedItem(item);
                                }}>
                                <MoreVert />
                              </IconButton>
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
