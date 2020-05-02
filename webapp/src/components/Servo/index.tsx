import React from 'react';
import { Paper, withStyles, WithStyles } from '@material-ui/core';

import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

import styles from './styles';

gsap.registerPlugin(Draggable);

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

interface Props {
    onRotate: (degrees: number) => void;
}

export default withStyles(styles)(({ classes, onRotate }: Props & WithStyles<typeof styles>) => {
    Draggable.create("#servo-horn", {
        bounds: { minRotation: -90, maxRotation: 90 },
        type: "rotation",
        inertia: true,
        onDrag: function () {
            onRotate(this.rotation);
        }
    });

    return (
        <Paper className={classes.paper}>
            <div className={classes.servoBox}>
                <div className={classes.servoBoxCircle}></div>
                <div id="servo-horn" className={classes.hornContainer}>
                    <ServoHornHalf />
                    <ServoHornHalf rotate={180} />
                    <div className={classes.hornCogHole}></div>
                </div>
            </div>
        </Paper >
    );
});
