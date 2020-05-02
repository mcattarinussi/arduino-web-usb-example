import React from 'react';
import { Paper, withStyles, WithStyles } from '@material-ui/core';

import styles from './styles';

const ServoHornHalf = withStyles(styles)(({ classes, rotate = 0 }: { rotate?: number } & WithStyles<typeof styles>) => (
    <div className={classes.hornHalfContainer} style={{ transform: `rotate(${rotate}deg)` }}>
        <div className={classes.hornCircle}></div>
        <div className={classes.hornTrapezoid}></div>
        <div className={classes.hornCenter}></div>
        <div className={classes.hornFixingHolesContainer}>
            <div className={classes.hornFixingHole}></div>
            <div className={classes.hornFixingHole}></div>
            <div className={classes.hornFixingHole}></div>
            <div className={classes.hornFixingHole}></div>
        </div>
    </div>
));

const ServoHorn = withStyles(styles)(({ classes }: WithStyles<typeof styles>) => (
    <div className={classes.hornContainer}>
        <ServoHornHalf />
        <ServoHornHalf rotate={180} />
        <div className={classes.hornCogHole}></div>
    </div>
));


export default withStyles(styles)(({ classes }: WithStyles<typeof styles>) => (
    <Paper className={classes.paper}>
        <div className={classes.servoBox}>
            <div className={classes.servoBoxCircle}></div>
            <ServoHorn></ServoHorn>
        </div>
    </Paper >
));
