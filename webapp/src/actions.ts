import { webusb } from './services';
import state from './state';

export const connect = async () => {
    const device = await webusb.pairDevice();

    if (!device) {
        return;
    }

    const { endpointInNumber, endpointOutNumber } = await webusb.initializeDevice(device);

    // TODO: set onReceive callback

    state.next({
        connection: {
            device,
            endpointInNumber,
            endpointOutNumber,
        },
        status: 'CONNECTED'
    });
}

export const send = () => {
    // TODO
}
