import { webusb } from './services';
import state from './state';

const sendCommand = async (command: string, payload: string) => {
    if (!state.value.connection) {
        return;
    }

    const { device, endpointOutNumber } = state.value.connection;
    await webusb.send(device, endpointOutNumber, '\n' + command + payload.padEnd(3));
}

const setupDevice = async (device: USBDevice) => {
    const { endpointInNumber, endpointOutNumber } = await webusb.initializeDevice(device);

    state.next({
        connection: {
            device,
            endpointInNumber,
            endpointOutNumber,
        },
        status: 'CONNECTED'
    });
}

export const connectPairedDevice = async () => {
    const device = await webusb.getPairedDevice();

    if (!device) {
        return;
    }

    await setupDevice(device);
}

export const connectNewDevice = async () => {
    const device = await webusb.pairDevice();

    if (!device) {
        return;
    }

    await setupDevice(device);
}

export const setLCDChar = (char: string) => sendCommand('4', char);

export const setServoPosition = (degrees: number) => sendCommand('5', degrees.toString());

export const setRedLEDValue = (value: number) => sendCommand('1', Math.round(value * 2.55).toString());
export const setYellowLEDValue = (value: number) => sendCommand('2', Math.round(value * 2.55).toString());
export const setGreenLEDValue = (value: number) => sendCommand('3', Math.round(value * 2.55).toString());
