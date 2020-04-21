import { createStyles } from '@material-ui/core/styles';

export default createStyles({
    led: {
        // Credits to https://codepen.io/Balrog994/pen/nblrk
        borderRadius: 5,
        boxShadow: '0px 0px 1px grey',
        height: 10,
        margin: 5,
        width: 10,
        zoom: 6,
        '&:after': {
            display: 'block',
            content: '""',
            marginLeft: 1,
            marginRight: 1,
            width: 8,
            height: 6,
            '-webkit-border-top-right-radius': '4px 3px',
            '-webkit-border-top-left-radius': '4px 3px',
            '-webkit-border-bottom-right-radius': '4px 3px',
            '-webkit-border-bottom-left-radius': '4px 3px',
            backgroundImage: '-webkit-linear-gradient(top, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 100%)'
        },
        '&:hover': {
            cursor: 'pointer'
        }
    },
    ledWithSlider: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center'
    },
    paper: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: 40,
        justifyContent: 'center'
    },
});

export const sliderStyles = {
    root: {
        height: 8,
        alignSelf: 'center',
        width: 120
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
}
