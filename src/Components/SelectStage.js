import React from 'react'

function SelectStage({ stagesState, setSelectedStage, appState }) {

    const colors = ['darkgreen', 'darkblue', 'darkred']

    const myArray = [stagesState.stage1, stagesState.stage2, stagesState.stage3]

    const demoClas = [
        {
            name: 'ferter',
            moves: 34
        },
        {
            name: 'segundón',
            moves: 45
        },
        {
            name: 'tercero',
            moves: 66
        },
        {
            name: 'cuarto',
            moves: 66
        },
        {
            name: 'quinto',
            moves: 66
        },
    ]

    return (
        <>
            <center>

                <div className='row m-1'>
                    {myArray.map((stage, index) => (
                        <div className='col-lg-4 col-12' style={{ justifyItems: 'center' }}>
                            <div className="card text-white bg-success mb-3" style={{ maxWidth: '280px', padding: '0px' }}>
                                <div className="card-header" style={{textTransform:'uppercase', fontWeight:'700'}}>{stage.name}</div>
                                <div className="card-body">
                                    <h5 className="card-title">Clasificación:</h5>
                                    <p style={{ fontSize: '11px', marginBottom: '8px', color: 'yellow' }}>Can be done with {appState.game[stage.name].gold} moves</p>
                                    {demoClas.map((player, index) => (
                                        <p key={index} style={{ fontSize: '13px', marginBottom: '0px', textAlign:'start', marginLeft:'28%' }}>{index+1} <strong>{player.name}</strong>: {player.moves} moves</p>
                                    ))}
                                </div>
                            <button className='btn btn-primary' onClick={() => setSelectedStage(stage.name)}>play!</button>
                            </div>
                        </div>
                    ))}
                </div>
            </center>            
        </>
    )
}

export default SelectStage