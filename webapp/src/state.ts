import { BehaviorSubject } from 'rxjs'

interface USBConnection {
    device: USBDevice,
    endpointInNumber: number;
    endpointOutNumber: number;
}

export default new BehaviorSubject<{ connection?: USBConnection, status: 'NOT_CONNECTED' | 'CONNECTED' }>({
    connection: undefined,
    status: 'NOT_CONNECTED'
});
