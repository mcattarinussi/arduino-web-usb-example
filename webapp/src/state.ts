import { BehaviorSubject } from 'rxjs'

export const connection$ = new BehaviorSubject<{ deviceName?: string, status: 'NOT_CONNECTED' | 'CONNECTED' }>({
    deviceName: undefined,
    status: 'NOT_CONNECTED'
});
