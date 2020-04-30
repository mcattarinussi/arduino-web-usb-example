import { webusb } from './services';
import state from './state';

export const connect = async () => {
    const device = await webusb.pairDevice();

    if (!device) {
        return;
    }

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

const sendCommand = async (command: string, payload: string) => {
    if (!state.value.connection) {
        return;
    }

    const { device, endpointOutNumber } = state.value.connection;
    await webusb.send(device, endpointOutNumber, '\n' + command + payload.padEnd(3));
}

export const setRedLEDValue = (value: number) => sendCommand('1', Math.round(value * 2.55).toString());
export const setYellowLEDValue = (value: number) => sendCommand('2', Math.round(value * 2.55).toString());
export const setGreenLEDValue = (value: number) => sendCommand('3', Math.round(value * 2.55).toString());
