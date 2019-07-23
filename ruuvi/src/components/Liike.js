/*
    palauttaa liikkeen muuttujan poistaen turhat desimaalit
*/

const Liike = props => {
    const { liike } = props;

    return (
        Number(liike).toFixed(3)
    )
}

export default Liike
