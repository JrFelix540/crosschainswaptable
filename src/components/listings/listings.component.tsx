import React, { Fragment, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './listings.styles.scss'


interface IRate {
    from: string
    to: string
    rate: number

}

const Listings: React.FC = () => {


    const [currentRates, setCurrentRates] = useState<IRate[]>([])

    const cryptoNames: any = {
        BTC: {
            name: "Bitcoin (BTC)"
        },
        ETH: {
            name: "ETHER (ETH)"
        },
        WBTC: {
            name: "Wrapped Bitcoin (WBTC)"
        },
        DAI: {
            name: "Dai Stablecoin (DAI)"
        },
        USDC: {
            name: "USD Coin (USDC)"
        },
        USDT: {
            name: "USD Tether (USDT)"
        }

    }

    useEffect(()=> {
        fetchRates()
    }, [])

    const fetchRates = async () => {
        const ratesJson = await fetch('https://liquality.io/swap/agent/api/swap/marketinfo')
        const rates = await ratesJson.json()
        let newRates: IRate[] = []
        rates.map((rate: any)=>{

            const fromName = cryptoNames[rate.from].name
            const toName = cryptoNames[rate.to].name
            console.log(fromName)


            const newRate: IRate = {
                from: fromName,
                to: toName,
                rate: rate.rate
            }
           newRates.push(newRate)
        })
    
        setCurrentRates(newRates)
        
    }

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
    });

    const createData = (from:string, to:string, rate:number) => {
        return{from, to, rate}
    }

    
    

    const rows: any = []

    currentRates.map((newRate) => {
        const{from , to, rate} = newRate
        rows.push(createData(from, to, rate))
    })

    

    const classes = useStyles();
    
    return (
        <Fragment>

<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell align="right">Exchange Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.rate}>
              <TableCell component="th" scope="row">
                {row.from}
              </TableCell>
              <TableCell>{row.to}</TableCell>
              <TableCell align="right">{row.rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Fragment>
    )
}


export default Listings