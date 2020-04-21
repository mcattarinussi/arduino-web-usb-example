import { createStyles } from '@material-ui/core/styles';

export default createStyles({
    frame: {
        backgroundColor: 'black',
        height: 240,
        overflow: 'auto',
        width: 680,
        '&:hover': {
            cursor: 'pointer'
        }
    },
    display: {
        backgroundColor: 'rgba(20, 80, 230)',
        height: 160,
        margin: 40
    },
    character: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 4,
        marginRight: 3
    },
    charRow: {
        display: 'flex',
        flex: 1,
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        padding: 40,
    },
    pixel: {
        display: 'flex',
        flex: 1,
        height: 5,
        margin: 0.5,
        width: 5
    },
    rowsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: '28px 35px'
    },
});
