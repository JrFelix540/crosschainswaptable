import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

import { Listings } from '../'

import './table.styles.scss'

const Table: React.FC = () => {
    const classes = useStyles();
    const [interval, setIntervalTimer] = React.useState(10);

    const handleChange = (event: any) => {
        console.log(event.target.value)
        setIntervalTimer(event.target.value);
    };
    return (
        <Fragment>
            <main className="main">
                <section className="section__main">
                    <div className="section__top">
                        <div className="refresh__group">
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Interval</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={interval}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={5}>Five</MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={15}>Fifteen</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="section__body">
                        <Listings interval={parseInt(interval)}/>
                    </div>
                </section>
            </main>
        </Fragment>
    )
}


export default Table