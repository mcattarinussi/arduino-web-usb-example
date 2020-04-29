import React, { useRef, useEffect, useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import ReactDOM from 'react-dom';

import styles from './styles';
import AppBar from './components/AppBar';
import LCD from './components/LCD';
import LEDs from './components/LEDs';
import * as actions from './actions';
import * as state from './state';

const App = withStyles(styles)(({ classes }: WithStyles<typeof styles>) => {
  const [LCDHasFocus, setLCDHasFocus] = useState(false);
  const LCDElement = useRef<HTMLDivElement>(null);

  const [connectionStatus, setConnectionStatus] = useState(state.connection$.value.status);
  const [deviceName, setDeviceName] = useState<string | undefined>(state.connection$.value.deviceName);

  useEffect(() => {
    const subscription = state.connection$.subscribe(connection => {
      setConnectionStatus(connection.status);
      setDeviceName(connection.deviceName);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    window.addEventListener('click', (event) => {
      if (!LCDElement.current) {
        return;
      }

      const { x, y, height, width } = LCDElement.current.getBoundingClientRect();

      if (
        event.clientX >= x && event.clientX <= x + width &&
        event.clientY >= y && event.clientY <= y + height
      ) {
        setLCDHasFocus(true);
      } else {
        setLCDHasFocus(false);
      }
    })
  });

  return (
    <Container maxWidth="md" className={classes.root}>
      <AppBar deviceName={deviceName} connectionStatus={connectionStatus} onConnectClick={actions.connect} />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <LCD hasFocus={LCDHasFocus} ref={LCDElement} />
        </Grid>
        <Grid item xs={6}>
          <LEDs />
        </Grid>
      </Grid>
    </Container>
  )
});

ReactDOM.render(
  <React.StrictMode><App /></React.StrictMode>,
  document.getElementById('root')
);
