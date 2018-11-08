import React from 'react'
import Otsikko from './Otsikko'

const Osa = ({osa}) => (
    <p>{osa.nimi} {osa.tehtavia}</p>
)

const Sisalto = ({osat}) => {
    const osat_els = osat.map(osa => <Osa key={osa.id} osa={osa}/>);
    return (
        <div>
            {osat_els}
        </div>
    )
}

const Yhteensa = ({osat}) => {
    const reducer = (acc, cur) => { return { tehtavia: acc.tehtavia + cur.tehtavia } };
    const total = osat.reduce(reducer);
    return <p>yhteensä {total.tehtavia} tehtävää</p>
}

const Kurssi = ({kurssi}) => (
    [
      <Otsikko key={"otsikko"} text={kurssi.nimi}/>,
      <Sisalto key={"sisalto"} osat={kurssi.osat}/>,
      <Yhteensa key={"yhteensa"} osat={kurssi.osat}/>,
    ]
)

export default Kurssi
