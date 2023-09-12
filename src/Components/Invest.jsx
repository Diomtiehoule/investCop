import React from 'react';

const Invest = (props) => {
    props.reponse("j'aimerais investir chez vous !")
    return (
        <>
  <h2>Chef</h2>
  <h3>message du chef :</h3>
  <h3>{props.message}</h3>
  </>
)
}

export default Invest;