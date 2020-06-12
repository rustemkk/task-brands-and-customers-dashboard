import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { lighten, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { givePoints } from 'modules/users/actions';
import { selectCurrentUser } from 'modules/users/selectors';
import { selectCustomerBrandsByBrandId, selectAllCustomers } from 'modules/customers/selectors';


const stableSort = (array, order, orderBy) => {
  const comparator = (a, b) => (order === 'desc' ? 1 : -1) * (b[orderBy] < a[orderBy] ? -1 : 1);
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => comparator(a[0], b[0]));
  return stabilizedThis.map(el => el[0]);
}

const EnhancedTableHead = (props) => {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => onRequestSort(property);
  const headCells = [
    { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
    { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
    { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
    { id: 'points', numeric: true, disablePadding: false, label: 'Loyalty Point' },
  ];

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id &&
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              }
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  toolbarHighlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  },
  toolbarTitle: {
    flex: '1 1 100%',
  },
  pointsInputContainer: {
    display: 'inline-flex',
  },
}));

const CustomersPage = () => {

  const s = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const customers = useSelector(selectAllCustomers);
  const customerBrands = useSelector(selectCustomerBrandsByBrandId(currentUser.id));

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [inputValue, setInputValue] = React.useState(30);

  const rows = useMemo(() => {
    return customerBrands.map(cb => {
      const customer = customers.find(c => c.id === cb.customerId);
      return { ...customer, points: cb.points };
    });
  }, [customers, customerBrands]);

  return (
    <div className={s.root}>
      <Paper className={s.paper}>
        <Toolbar className={clsx(s.toolbar, { [s.toolbarHighlight]: selectedRows.length > 0 })}>
          {selectedRows.length > 0 ?
            <>
              <Typography className={s.toolbarTitle} color="inherit" variant="subtitle1" component="div">
                {selectedRows.length} selected
              </Typography>
              <Tooltip
                title={currentUser.points < selectedRows.length * inputValue ?
                  'Not enough points' :
                  'Give Points'
                }
              >
                <span className={s.pointsInputContainer}>
                  <TextField
                    autoFocus
                    label="Points to add:"
                    margin="dense"
                    onChange={e => setInputValue(+e.target.value)}
                    required
                    type="number"
                    value={inputValue}
                    variant="outlined"
                  />
                  <IconButton
                    disabled={currentUser.points < selectedRows.length * inputValue}
                    aria-label="givePoints"
                    onClick={() => dispatch(givePoints(selectedRows, inputValue))}
                  >
                    <AttachMoneyIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </> :
            <Typography className={s.toolbarTitle} variant="h6" id="tableTitle" component="div">
              Followers
            </Typography>
          }
        </Toolbar>
        <TableContainer>
          <Table
            className={s.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={s}
              numSelected={selectedRows.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={e => setSelectedRows(e.target.checked ? rows.map(r => r.id) : [])}
              onRequestSort={property => {
                setOrder((orderBy === property && order === 'asc') ? 'desc' : 'asc');
                setOrderBy(property);
              }}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, order, orderBy)
                .map(row => {
                  const isRowSelected = selectedRows.indexOf(row.id) !== -1;
                  const labelId = `enhanced-table-checkbox-${row.id}`;
                  return (
                    <TableRow
                      hover
                      onClick={() => setSelectedRows(
                        isRowSelected ? selectedRows.filter(s => s !== row.id) : [...selectedRows, row.id]
                      )}
                      role="checkbox"
                      aria-checked={isRowSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isRowSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isRowSelected} inputProps={{ 'aria-labelledby': labelId }} />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.email}
                      </TableCell>
                      <TableCell align="left">{row.firstName}</TableCell>
                      <TableCell align="left">{row.lastName}</TableCell>
                      <TableCell align="right">{row.points}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default CustomersPage;
