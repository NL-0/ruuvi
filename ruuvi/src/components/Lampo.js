const Lampo = props => {
    const { lampo } = props;

    if ( lampo > 0 ) {
        return Number(lampo).toFixed(2) + " C"
    }
    else {
        return " C"
        //return lampo + " C"
    }

    // return (
    //     Number(lampo).toFixed(2)
    // )
}

export default Lampo
