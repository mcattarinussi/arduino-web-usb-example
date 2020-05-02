import React, { useRef, useEffect, useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import ReactDOM from 'react-dom';

import styles from './styles';
import { AppBar, LCD, LEDs, Servo } from './components';
import * as actions from './actions';
import state from './state';

const App = withStyles(styles)(({ classes }: WithStyles<typeof styles>) => {
  const [LCDHasFocus, setLCDHasFocus] = useState(false);
  const LCDElement = useRef<HTMLDivElement>(null);

  const [connectionStatus, setConnectionStatus] = useState(state.value.status);
  const [deviceName, setDeviceName] = useState(state.value.connection ? state.value.connection.device.productName : undefined);

  const [containerStyle, setContainerStyle] = useState<{ opacity: number, pointerEvents: 'auto' | 'none' }>(
    { pointerEvents: 'none', opacity: 0.3 }
  );

  useEffect(() => {
    const stateSubscription = state.subscribe(s => {
      setConnectionStatus(s.status);
      setDeviceName(state.value.connection ? state.value.connection.device.productName : undefined);
    });

    actions.connectPairedDevice();

    return () => stateSubscription.unsubscribe();
  }, []);

  useEffect(() => {
    const updateLCDHasFocus = (event: MouseEvent) => {
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
    };

    const disableComponents = () => {
      setContainerStyle({ pointerEvents: 'none', opacity: 0.3 });
      window.removeEventListener('click', updateLCDHasFocus);
    }

    if (connectionStatus === 'NOT_CONNECTED') {
      disableComponents();
      return;
    }

    window.addEventListener('click', updateLCDHasFocus);
    setContainerStyle({ pointerEvents: 'auto' as 'auto', opacity: 1 });

    return disableComponents;
  }, [connectionStatus]);

  return (
    <Container maxWidth="md" className={classes.root}>
      <AppBar deviceName={deviceName} connectionStatus={connectionStatus} onConnectClick={actions.connectNewDevice} />
      <Grid container spacing={1} style={containerStyle}>
        <Grid item xs={12}>
          <LCD
            hasFocus={LCDHasFocus}
            onNewCharacter={actions.setLCDChar}
            ref={LCDElement}
          />
        </Grid>
        <Grid container item spacing={1}>
          <Grid item xs={6}>
            <LEDs
              onRedLedValueChange={actions.setRedLEDValue}
              onYellowLedValueChange={actions.setYellowLEDValue}
              onGreenLedValueChange={actions.setGreenLEDValue}
            />
          </Grid>
          <Grid item xs={6}>
            <Servo></Servo>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
});

ReactDOM.render(
  <React.StrictMode><App /></React.StrictMode>,
  document.getElementById('root')
);
