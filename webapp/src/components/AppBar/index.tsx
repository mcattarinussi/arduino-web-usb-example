import React from 'react';
import { AppBar, Button, Typography } from '@material-ui/core';
import UsbIcon from '@material-ui/icons/Usb';

interface Props {
    connectionStatus: 'NOT_CONNECTED' | 'CONNECTED';
    deviceName?: string;
    onConnectClick: () => void;
}

export default ({ connectionStatus, deviceName, onConnectClick }: Props) => (
    <AppBar position="static" style={{ alignItems: 'center', height: 60, justifyContent: 'center', fontSize: 20 }}>
        {
            connectionStatus === 'NOT_CONNECTED' ?
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onConnectClick}
                    startIcon={<UsbIcon />}
                    style={{ height: '100%', width: '100%', fontSize: 'inherit' }}
                >
                    CONNECT DEVICE
                </Button> :
                <div>
                    <Typography style={{ fontSize: 'inherit' }}>CONNECTED TO {deviceName}</Typography>
                </div>
        }
    </AppBar >
);
