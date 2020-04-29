import * as state from './state';

const filters = [
    { 'vendorId': 0x2341, 'productId': 0x8036 }, // Arduino Leonardo
    { 'vendorId': 0x2341, 'productId': 0x8037 }, // Arduino Micro
    { 'vendorId': 0x2341, 'productId': 0x804d }, // Arduino/Genuino Zero
    { 'vendorId': 0x2341, 'productId': 0x804e }, // Arduino/Genuino MKR1000
    { 'vendorId': 0x2341, 'productId': 0x804f }, // Arduino MKRZERO
    { 'vendorId': 0x2341, 'productId': 0x8050 }, // Arduino MKR FOX 1200
    { 'vendorId': 0x2341, 'productId': 0x8052 }, // Arduino MKR GSM 1400
    { 'vendorId': 0x2341, 'productId': 0x8053 }, // Arduino MKR WAN 1300
    { 'vendorId': 0x2341, 'productId': 0x8054 }, // Arduino MKR WiFi 1010
    { 'vendorId': 0x2341, 'productId': 0x8055 }, // Arduino MKR NB 1500
    { 'vendorId': 0x2341, 'productId': 0x8056 }, // Arduino MKR Vidor 4000
    { 'vendorId': 0x2341, 'productId': 0x8057 }, // Arduino NANO 33 IoT
    { 'vendorId': 0x239A }, // Adafruit Boards!
];

export const connect = async () => {
    // @ts-ignore
    const device = await navigator.usb.requestDevice({ filters });

    await device.open();

    if (!device.configuration) {
        await device.selectConfiguration(1);
    }

    const { alternateSetting, endpoints, interfaceNumber } = device.configuration.interfaces
        .map(
            (int: any) => {
                const alternate = int.alternates.find((alt: any) => alt.interfaceClass === 0xff);
                return alternate ?
                    {
                        alternateSetting: alternate.alternateSetting,
                        endpoints: alternate.endpoints,
                        interfaceNumber: int.interfaceNumber
                    } :
                    null;
            }
        )
        .filter(Boolean)
        .shift();

    const { endpointNumber: endpointInNumber } = endpoints.find(({ direction }: any) => direction === 'in');

    await device.claimInterface(interfaceNumber);
    await device.selectAlternateInterface(interfaceNumber, alternateSetting);
    await device.controlTransferOut({
        'requestType': 'class',
        'recipient': 'interface',
        'request': 0x22,
        'value': 0x01,
        'index': interfaceNumber
    });

    const onReceive = (data: any) => {
        let decoder = new TextDecoder();
        console.log('Received: ' + decoder.decode(data));
    };

    const readLoop = () => device.transferIn(endpointInNumber, 64).then((result: any) => {
        onReceive(result.data);
        readLoop();
    }, (error: Error) => {
        console.log(error);
    });

    await readLoop();

    state.connection$.next({ deviceName: device.productName, status: 'CONNECTED' });
}
