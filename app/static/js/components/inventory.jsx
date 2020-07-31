import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
  root: {
    width:'100%',
    minWidth: '5em'
  },
  flexGrow:{
      flexGrow: 1,
      margin: 'auto'
  },
  flexBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  flexCenter:{
      justifyContent: 'center'
  }
});

export default function Inventory(){
    const classes = useStyles();
    const magicNum = 100;
    const [update, setUpdate] = useState('')
    const [inventory, setInventory] = useState('')
    const [updateMsg, setUpdateMsg] = useState('')
    const [addInvOpen, setAddInvOpen] = useState(false)
    const [displayCount, setDisplayCount] = useState(magicNum)
    const [max, setMax] = useState(0)
    const [item, setItem] = useState({
        name: '',
        serial_num: '',
        qty: '',
    });

    useEffect(() => {
        getInventory()
    }, [displayCount]);

    const paginate = (forward) => {
        if (forward){
            setDisplayCount(displayCount + magicNum)


        } else {
            if (displayCount - magicNum != 0){
                setDisplayCount(displayCount - magicNum)
            }
        }
    }

    const getInventory = () =>{
        fetch(`/get_inventory?range=${displayCount - magicNum}-${displayCount}`)
        .then(res => res.json())
        .then(data => {
            if (data.success){
                let arr = []
                console.log('ok')
                if (data.payload.length > 0){
                    setInventory(JSON.parse(data.payload))
                    console.log(JSON.parse(data.payload).length)
                }
                let tempMax = parseInt(data.max)
                if (tempMax > max){
                    setMax(parseInt(data.max))
                }
            }
        })
    }

    const removeItem = (id) => {
        let conf = confirm('Are you sure you want to delete this item?')
        if (conf){
            fetch("/remove_inventory/" + id)
            .then(res => res.json())
            .then(data => {
                if (data.success){
                    getInventory()
                }
            })
        }
    }

    const changeQTY = (id, increase) => {
        fetch(`/change_inventory/${id}?increase=${increase}`)
        .then(res => res.json())
        .then(data => {
            if (data.success){
                console.log(data.payload)
                getInventory()
            }
        })
    }



    const toolCard = () => {
        let rt = []
        for(let invent in inventory){
            let inv = inventory[invent]
            rt.push(
                <Grid item xs={4}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h2">
                                    {inv.name}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" component="p">
                                    {inv.i_number}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" component="p">
                                    {inv.serial_num}
                                </Typography>
                                <Typography variant="body3" color="textSecondary" component="p">
                                    {`${inv.qty} in stock`}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="secondary"
                                onClick={() => removeItem(inv._id)}>
                                Remove
                             </Button>
                             <IconButton aria-label="delete" onClick={() => changeQTY(inv._id, 1)}>
                                 <AddCircleIcon />
                             </IconButton>
                             <IconButton aria-label="delete" onClick={() => changeQTY(inv._id, -1)}>
                                 <RemoveCircleIcon />
                             </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            );
        }
        return rt
    }

    const addInv = (data) =>{
        fetch('/add_inventory', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(data)
            })
        .then(res => res.json())
        .then(data => {
            if (data.success){
                console.log(data.payload)
                setAddInvOpen(false);
                getInventory()
            }
        })
    }
    const handleClickOpen = () => {
        setAddInvOpen(true);
    };

    const handleClose = (add) => {
        if(add){
            console.log(item)
            addInv(item)
        } else {
            setAddInvOpen(false);
        }
    };
    const handleAddItemChange = name => event => {
        setItem({ ...item, [name]: event.target.value });
    }

    return (
        <div>
            <div className={classes.flexBox}>
                <Typography gutterBottom variant="h3" component="h2">
                    Inventory
                </Typography>
                <Button color="primary" variant="contained" onClick={handleClickOpen}>Add Inventory...</Button>
            </div>
            <div className={classes.flexBox}>
                { displayCount - magicNum == 0 ?
                    <Button
                        name="paginate backward"
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={    <ArrowBackIcon />}
                        disabled
                    ></Button> :
                    <Button
                        name="paginate backward"
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={    <ArrowBackIcon />}
                        onClick={() => paginate(false)}
                    ></Button>
                }
                <Typography variant="body3" color="textSecondary" component="p">
                    {`Items ${displayCount-(magicNum - 1)} - ${displayCount} of ${max}`}
                </Typography>
                { displayCount + magicNum >= max + magicNum ?
                    <Button
                        name="paginate forward"
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        endIcon={<ArrowForwardIcon />}
                        disabled
                    ></Button>
                    :<Button
                        name="paginate forward"
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => paginate(true)}
                    ></Button>
                }
            </div>
            <div className={classes.flexGrow}>
                <Grid container spacing={2} className={classes.flexCenter}>
                    { toolCard() }
                </Grid>
            </div>

            <Dialog open={addInvOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter details for new inventory item.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="name"
                        type="text"
                        onChange={handleAddItemChange('name')}
                    />
                    <TextField
                        margin="dense"
                        id="serial_num"
                        label="serial_num"
                        type="text"
                        onChange={handleAddItemChange('serial_num')}
                    />
                    <TextField
                        margin="dense"
                        id="qty"
                        label="qty"
                        type="number"
                        onChange={handleAddItemChange('qty')}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleClose(true)} color="primary">
                        Add Item
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

// {"i_number": 1, "name": "allen wrench" },
