import React, { useState } from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiOutlinedInput: {
            // Name of the rule
            root: {
                // borderRadius: '30px',
                // outlineColor: 'green',
                // color: 'green',
                // height: 48,
                padding: '0 30px',
            },
        },
    },
});

const InputEdit = ({ multiline, rows, vari, name, handleChange, label, half, autoFocus, type, handleShowPassword, icon, inValue, style }) => {
    const classes = useStyles();
    const [isPass, setIsPass] = useState(true);

    return (
        <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={half ? 6 : 12} className={classes.margin}>
                <Grid item>
                    {icon}
                </Grid>
                <Grid item>
                    <ThemeProvider theme={theme}>
                        <TextField
                            value={inValue}
                            name={name}
                            onChange={handleChange}
                            variant="outlined"
                            color="secondary"
                            required
                            disabled={vari}
                            fullWidth
                            label={label}
                            autoFocus={autoFocus}
                            type={type === 'password' ? (isPass ? 'password' : 'text') : type}
                            placeholder={inValue}
                            style={style}
                            multiline={multiline}
                            rows={rows}
                            InputProps={(name === 'oldPassword' || name === 'newPassword' || name === 'password' || name === 'confirmPassword') ? {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setIsPass(state => !state)}>
                                            {
                                                !isPass ? <Visibility /> : <VisibilityOff />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                )
                            } : null}
                            InputLabelProps={{ style: { color: 'green', borderColor: 'green', outlineColor: 'green' } }}
                        />
                    </ThemeProvider>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default InputEdit
