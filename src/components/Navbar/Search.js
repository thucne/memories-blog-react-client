import React, {useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 1),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
            '&:focus': {
                width: 'auto',
            },
        },
    },
}));

const Search = ({ setSearchKey }) => {
    const classes = useStyles();
    const [temp, setTemp] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setTemp(e.target.value.toLowerCase().split(' '));
    }
    const handleSet = (e) => {
        e.preventDefault();
        setSearchKey(temp);
    }
    return (
        <div className={classes.search} style={{ backgroundColor: '#ABB3E9' }}>
            <div className={classes.searchIcon}>
                <SearchIcon style={{ color: 'white' }} />
            </div>
            <form onSubmit={handleSet}>
                <InputBase
                    placeholder="Search by keywords"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    style={{ color: 'white' }}
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}

export default Search;