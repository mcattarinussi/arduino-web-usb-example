import { createStyles } from '@material-ui/core/styles';

export default createStyles({
    paper: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
    },
    servoBox: {
        backgroundColor: 'blue',
        border: '5px solid darkblue',
        borderRadius: 10,
        height: 250,
        position: 'relative',
        width: 100
    },
    servoBoxCircle: {
        borderRadius: 100,
        left: -2.5,
        height: 90,
        background: 'blue',
        border: '5px solid darkblue',
        position: 'relative',
        top: 40,
        width: 95
    },
    hornContainer: {
        cursor: 'grab',
        height: 250,
        left: 25,
        position: 'absolute',
        top: -32.5,
        width: 50
    },
    hornHalfContainer: {
        height: 125,
        position: 'relative'
    },
    hornTrapezoid: {
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        borderBottom: '110px solid lightgrey',
        height: 0,
        position: 'absolute',
        top: 10,
        width: 20,
    },
    hornCircle: {
        backgroundColor: 'lightgrey',
        borderRadius: 100,
        height: 20,
        left: 15,
        position: 'absolute',
        width: 20,
    },
    hornCenter: {
        bottom: 0,
        height: 5,
        backgroundColor: 'lightgrey',
        position: 'absolute',
        width: '100%'
    },
    hornFixingHolesContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: 80,
        justifyContent: 'space-between',
        left: 19,
        position: 'relative',
        top: 15,
        width: 12
    },
    hornFixingHole: {
        backgroundColor: 'white',
        borderRadius: 100,
        height: 12,
        width: 12
    },
    hornCogHole: {
        backgroundColor: 'white',
        borderRadius: 100,
        height: 20,
        left: 15,
        position: 'absolute',
        top: 115,
        width: 20,
    }
});
