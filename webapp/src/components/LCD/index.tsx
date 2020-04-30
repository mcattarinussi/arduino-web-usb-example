import React, { useEffect, useState } from 'react'
import { Paper, withStyles, WithStyles } from '@material-ui/core';
import { fromEvent } from 'rxjs';
import { filter, pluck } from 'rxjs/operators';

import styles from './styles'
import pixelMap from './pixel-map.json';

const keys$ = fromEvent<KeyboardEvent>(window, 'keyup')
    .pipe(
        pluck('key'),
        filter(key => pixelMap.hasOwnProperty(key) || key === 'Backspace')
    );

const Character = withStyles(styles)(({ char, classes }: { char: string } & WithStyles<typeof styles>) => {
    const transformed = (pixelMap as { [k: string]: Array<Array<0 | 1>> })[char];

    return (
        <div className={classes.character}>
            {
                transformed.map(
                    (row, i) => (
                        <div key={i} className={classes.charRow}>
                            {
                                row.map(
                                    (val, j) =>
                                        <div
                                            className={classes.pixel}
                                            key={j}
                                            style={{ backgroundColor: val === 1 ? 'white' : 'rgba(0, 50, 240)' }}
                                        ></div>
                                )
                            }
                        </div>
                    )
                )
            }
        </div>
    );
});

const DisplayRow = withStyles(styles)(({ classes, hasFocus, text }: { hasFocus: boolean, text: string } & WithStyles<typeof styles>) => {
    const [chars, setChars] = useState<string[]>([])

    useEffect(() => {
        if (text.length === 32 || !hasFocus) {
            setChars([...text, ...Array(32 - text.length).fill(' ')]);
            return
        }

        setChars([
            ...text,
            '_',
            ...Array(31 - text.length).fill(' ')
        ]);

        const cursorBlinkInterval = setInterval(() => {
            setChars(fc => [
                ...text.slice(0, text.length),
                fc[text.length] === '_' ? ' ' : '_',
                ...Array(31 - text.length).fill(' ')
            ]);
        }, 500);

        return () => clearInterval(cursorBlinkInterval);
    }, [hasFocus, text]);

    return (
        <div className={classes.rowsContainer}>
            {chars.map((c, i) => <Character char={c} key={i} />)}
        </div>
    );
});

interface Props {
    hasFocus: boolean
    onNewCharacter: (char: string) => void;
}

export default withStyles(styles)(
    React.forwardRef<HTMLDivElement, WithStyles<typeof styles> & Props>(({ classes, hasFocus, onNewCharacter }, ref) => {
        const [text, setText] = useState('');

        useEffect(() => {
            if (!hasFocus) {
                return;
            }

            const updateRows = (char: string) => {
                if (char === 'Backspace') {
                    setText(r => r.slice(0, -1));
                    onNewCharacter('\b');
                } else {
                    setText(r => r.length < 32 ? r + char : r);
                    onNewCharacter(char);
                }
            }

            const keysSubscription = keys$.subscribe(updateRows)

            return () => keysSubscription.unsubscribe();
        }, [hasFocus]);

        return (
            <Paper className={classes.paper}>
                <div className={classes.frame} ref={ref}>
                    <div className={classes.display}>
                        <DisplayRow hasFocus={hasFocus} text={text} />
                    </div>
                </div>
            </Paper>
        );
    }));
