import React, { Fragment, useEffect, useState, } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import { paginatedTable } from '../'
import { Spinner } from '../'

import './listings.styles.scss'


// Material UI Table

const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
});

interface IRate {
    from: string
    to: string
    rate: number

}
interface IIntervalProp{
    interval: number
}

const Listings: React.FC<IIntervalProp> = ({interval}) => {
    // state values for the material UI 
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    
    const handleChangePage = (event: any, newPage:number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [currentRates, setCurrentRates] = useState<IRate[]>([])

    const cryptoNames: any = {
        BTC: {
            name: "Bitcoin (BTC)"
        },
        ETH: {
            name: "Ethereum (ETH)"
        },
        WBTC: {
            name: "Wrapped Bitcoin (WBTC)"
        },
        DAI: {
            name: "Dai stable coin (DAI)"
        },
        USDC: {
            name: "USD Coin (USDC)"
        },
        USDT: {
            name: "USD Tether (USDT)"
        }

    }

    useEffect(()=> {
        let intervalSeconds = interval * 1000

        const myFunction = function() {
            intervalSeconds = interval * 1000
            console.log("object")
            setTimeout(myFunction, intervalSeconds)
        }
        setTimeout(myFunction, intervalSeconds)
        
        

        

       
          
         

        
        
        
    }, [])

    const fetchRates = async () => {
        setCurrentRates([])
        const ratesJson = await fetch('https://liquality.io/swap/agent/api/swap/marketinfo')
        const rates = await ratesJson.json()
        let newRates: IRate[] = []
        rates.map((rate: any)=>{

            const fromName = cryptoNames[rate.from].name
            const toName = cryptoNames[rate.to].name
            


            const newRate: IRate = {
                from: fromName,
                to: toName,
                rate: rate.rate
            }
           newRates.push(newRate)
        })
    
        setCurrentRates(newRates)
        
    }

    const createData = (from:string, to:string, rate:number) => {
        return{from, to, rate}
    }

    const rows: any = []

    currentRates.map((newRate) => {
        const{from , to, rate} = newRate
        rows.push(createData(from, to, rate))
    })

    

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <Fragment>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>From</TableCell>
                            <TableCell>To</TableCell>
                            <TableCell align="right">Exchange Rate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row, index) => (
                            <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {row.from}
                            </TableCell>
                            <TableCell style={{ width: 160 }}>
                                {row.to}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.rate}
                            </TableCell>
                            </TableRow>
                        ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <Spinner />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={paginatedTable}
            />
          </TableRow>
        </TableFooter>
                </Table>
            </TableContainer>
        </Fragment>
    )
}


export default Listings