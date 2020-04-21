import React, { useState } from 'react';
import { Paper, Slider, withStyles, WithStyles } from '@material-ui/core';

import styles, { sliderStyles } from './styles';

const FadeSlider = withStyles(sliderStyles)(Slider);

const LEDWithSlider = withStyles(styles)(({ classes, color }: { color: string } & WithStyles<typeof styles>) => {
    const [brightness, setBrightness] = useState(0);

    const ledStyle = {
        backgroundColor: color,
        opacity: brightness < 50 ? 0.5 + brightness * 0.01 : 1,
        boxShadow: `0px 0px ${brightness >= 50 ? (brightness - 50) * 0.1 : 0}px ${color}`
    };

    return (
        <div className={classes.ledWithSlider}>
            <div
                className={classes.led}
                onClick={() => setBrightness(brightness > 0 ? 0 : 100)}
                style={ledStyle}
            ></div>
            <FadeSlider
                min={0}
                max={100}
                onChange={(_: any, value: number | number[]) => setBrightness(value as number)}
                value={brightness}
            />
        </div>
    )
});

export default withStyles(styles)(({ classes }: WithStyles<typeof styles>) => (
    <Paper className={classes.paper}>
        <LEDWithSlider color="#fb1304" />
        <LEDWithSlider color="#fcf400" />
        <LEDWithSlider color="#13fB04" />
    </Paper>
));
