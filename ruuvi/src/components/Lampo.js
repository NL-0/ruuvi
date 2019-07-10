const Lampo = props => {
    const { lampo } = props;

    if ( lampo > 0 ) {
        return Number(lampo).toFixed(2)
    }
    else {
        return lampo
    }

    // return (
    //     Number(lampo).toFixed(2)
    // )
}

export default Lampo
