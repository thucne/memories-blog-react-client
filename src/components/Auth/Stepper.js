import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import NewGGUser from '../InfoTabs/NewGGUser';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Logged in by your Google Account', 'Create a linked MEmories Account'];
}

export default function StepperCustom({ activeStep, setDoneCreate, result, token, setLinear }) {
    const classes = useStyles();
    const steps = getSteps();
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <div className={classes.root}>
            <NewGGUser myStepper={<div>
                <Typography style={{color: 'red'}} variant="body1" >Do not try to skip this step, you will not be able to do anything!</Typography>
                <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            </div>}
            setLinear={setLinear} results={result} token={token} setDoneCreate={setDoneCreate} ggAvt={user?.result?.imageUrl || ''} ggFirstName={user?.result?.familyName || ''} ggLastName={user?.result?.givenName || ''} ggEmail={user?.result?.email || ''} ggId={user?.result?.googleId || ''} />
        </div>
    );
}
