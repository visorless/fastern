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

export default function Customers(){
    const classes = useStyles();
    const [updateMsg, setUpdateMsg] = useState('')
    const [customers, setCustomers] = useState([])
    const [addCustOpen, setAddCustOpen] = useState(false)
    const [cust, setCust] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
    });
    // const didMountRef = useRef(false);

    // const [update, setUpdate] = useState('')
    useEffect(() => {
        fetch("/get_customers")
        .then(res => res.json())
        .then(data => {
            if (data.success){
                let arr = []
                setCustomers(JSON.parse(data.payload))
            }
        })
    }, []);

    const removeCust = (id) => {
        let conf = confirm('Are you sure you want to delete this customer?')
        if (conf){
            fetch("/remove_customer/" + id)
            .then(res => res.json())
            .then(data => {
                if (data.success){
                    let arr = customers.filter( (customer) => {
                        return customer._id != id
                    })
                    setCustomers(arr)
                }
            })
        }
    }

    const addCust = (data) =>{

        fetch('/add_customer', {
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
                setAddCustOpen(false)
            }
        })
    }

    const toolCard = () => {
        let rt = []
        for(let customer in customers){
            let cust = customers[customer]
            rt.push(
                <Grid item xs={4}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {`${cust.firstname} ${cust.middle_i} ${cust.lastname}`}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" component="p">
                                    {cust.email}
                                </Typography>
                                <Typography variant="body3" color="textSecondary" component="p">
                                    {`Created On: ${cust.created}`}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="secondary"
                                onClick={() => removeCust(cust._id)}>
                                Remove
                             </Button>
                        </CardActions>
                    </Card>
                </Grid>
            );
        }
        return rt
    }

    const handleClickOpen = () => {
        setAddCustOpen(true);
    };

    const handleClose = (add) => {
        if(add){
            console.log(cust)
            addCust(cust)
        } else {
            setAddCustOpen(false);
        }

    };

    const handleAddCustChange = name => event => {
        setCust({ ...cust, [name]: event.target.value });
    }


    return (
        <div>
            <div className={classes.flexBox}>
                <Typography gutterBottom variant="h3" component="h2">
                    Customers
                </Typography>
                <Button color="primary" variant="contained" onClick={handleClickOpen}>Add Customer...</Button>
            </div>
            <div className={classes.flexGrow}>
                <Grid container spacing={2} className={classes.flexCenter}>
                    { toolCard() }
                </Grid>
            </div>
            <Dialog open={addCustOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add a customer's information here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="text"
                        onChange={handleAddCustChange('firstName')}
                    />
                    <TextField
                        margin="dense"
                        id="middleName"
                        label="Middle Initial"
                        type="text"
                        onChange={handleAddCustChange('middleName')}
                    />
                    <TextField
                        margin="dense"
                        id="lastName"
                        label="Last Name"
                        type="text"
                        onChange={handleAddCustChange('lastName')}
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        onChange={handleAddCustChange('email')}
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleClose(true)} color="primary">
                        Add Customer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
