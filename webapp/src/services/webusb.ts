import { SUPPORTED_DEVICES } from '../conifg';

const textEncoder = new TextEncoder();

const selectInterface = async (device: USBDevice): Promise<{ endpoints: USBEndpoint[], interfaceNumber: number }> => {
    const [interfaceConfig] = device.configuration!.interfaces
        .map(
            (intf: USBInterface) => {
                const alternate = intf.alternates.find((alt: any) => alt.interfaceClass === 0xff);
                return alternate ?
                    {
                        alternateSetting: alternate.alternateSetting,
                        endpoints: alternate.endpoints,
                        interfaceNumber: intf.interfaceNumber
                    } :
                    null;
            }
        )
        .filter(Boolean);

    if (!interfaceConfig) {
        throw new Error('Unable to select a valid USB interface');
    }

    const { alternateSetting, endpoints, interfaceNumber } = interfaceConfig;

    await device.claimInterface(interfaceNumber);
    await device.selectAlternateInterface(interfaceNumber, alternateSetting);

    return { endpoints, interfaceNumber };
};

const findEndpoint = (endpoints: USBEndpoint[], targetDirection: USBDirection): number | null => {
    const endpoint = endpoints.find(({ direction }: any) => direction === targetDirection);
    return endpoint ? endpoint.endpointNumber : null;
};


export const getPairedDevice = async (): Promise<USBDevice | null> =>
    navigator.usb.getDevices()
        .then(([device]) => device || null)

export const pairDevice = async (): Promise<USBDevice | null> =>
    // TODO: catch error when user closes pairing popup
    navigator.usb.requestDevice({ filters: SUPPORTED_DEVICES });

export const initializeDevice = async (device: USBDevice): Promise<{ endpointInNumber: number, endpointOutNumber: number }> => {
    await device.open();

    if (!device.configuration) {
        await device.selectConfiguration(1);
    }

    const { endpoints, interfaceNumber } = await selectInterface(device);

    const endpointInNumber = findEndpoint(endpoints, 'in');
    const endpointOutNumber = findEndpoint(endpoints, 'out');

    if (endpointInNumber === null || endpointOutNumber === null) {
        throw new Error('Unable to find valid USB endpoints');
    }

    await device.controlTransferOut({
        'requestType': 'class',
        'recipient': 'interface',
        'request': 0x22,
        'value': 0x01,
        'index': interfaceNumber
    });

    return { endpointInNumber, endpointOutNumber };
};

export const send = async (device: USBDevice, endpointNumber: number, data: string): Promise<void> => {
    await device.transferOut(endpointNumber, textEncoder.encode(data));
}
