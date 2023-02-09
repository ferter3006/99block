import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Board from './Board'
import SelectStage from './SelectStage'

function Home() {

    const appState = useSelector(state => state.appState)
    const [selectedStage, setSelectedStage] = useState('')

    const [stagesState, setStagesState] = useState({
        stage1: {
            name: 'stage1',
            completed: false,
            movements: 0
        },
        stage2: {
            name: 'stage2',
            completed: false,
            movements: 0
        },
        stage3: {
            name: 'stage3',
            completed: false,
            movements: 0
        },
    })

    return (
        <>
            <div className='container pb-5' style={{ backgroundColor: 'black' }}>
                <div className='row'>
                    <div className='col-12 mb-5 text-center mt-2' style={{ color: 'white' }}>
                        <h1>99Block</h1>
                        <h5 style={{ marginBottom: '22px' }}>Reach 99 to win</h5>
                        {selectedStage !== '' ? <h6 style={{textTransform:'uppercase', marginBottom:'12px'}}>{selectedStage}</h6> : null}
                        {selectedStage !== '' ? <p><span className='goldspan'>Gold: {appState.game[selectedStage].gold} moves</span><span className='silverspan'>Silver: {appState.game[selectedStage].silver} moves</span><span className='bronzespan'>Bronze: {appState.game[selectedStage].bronze} moves</span></p> : null}
                    </div>
                    {selectedStage !== '' ? <Board state={appState} stage={selectedStage} setStagesState={setStagesState} stagesState={stagesState} setSelectedStage={setSelectedStage} /> : <SelectStage stagesState={stagesState} setSelectedStage={setSelectedStage} appState={appState} />}
                </div>
            </div>
        </>

    )
}

export default Home