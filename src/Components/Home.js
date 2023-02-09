import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setGameTable, setUserName, setUserToken } from '../Redux/appActions'
import Board from './Board'
import SelectStage from './SelectStage'

function Home() {

    const appState = useSelector(state => state.appState)
    const dispatch = useDispatch()

    const [appReady, setAppReady] = useState(false)
    const [missingName, setName] = useState(true)

    const [playerName, setPlayerName] = useState('')

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

    useEffect(() => {
        if (selectedStage === '') {
            getClasificaciones()
        }
    }, [selectedStage])

    const getClasificaciones = (tuken) => {
        if (!tuken) { tuken = appState.user.token }
        fetch(process.env.REACT_APP_URLSERVERGETTABLE, {
            headers: {
                'Authorization': `Bearer ${tuken}`,
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.status === 1) {
                    console.log(jsonResponse);
                    dispatch(setGameTable(jsonResponse.data))
                    setAppReady(true)
                }
            })
    }

    const handleGoClick = () => {
        if (playerName.length < 5) { return }
        dispatch(setUserName(playerName))
        setName(false)
    }

    useEffect(() => {
        fetch(process.env.REACT_APP_URLSERVERLOGIN, {
            method: 'POST',
            headers: {
                'Authorization': appState.user.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                [process.env.REACT_APP_RULE_SHORT]: process.env.REACT_APP_RULE_LONG,
                email: process.env.REACT_APP_USR_99_SHORT,
                password: process.env.REACT_APP_USR_99_LONG
            })
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.status === 1) {
                    dispatch(setUserToken(jsonResponse.token))
                    getClasificaciones(jsonResponse.token)
                }
            })
    }, [])

    return (
        <>
            {appReady ?
                missingName ?
                    <div style={{ backgroundColor: 'black', paddingTop: '25%', color: 'white', height: '100vh' }}>
                        <h5 className='text-center'>Introduce tu nombre</h5><br />
                        <p className='text-center' style={{ marginTop: '-30px' }}>
                            será visto en la tabla de clasificación
                        </p>
                        <center>
                            <input onChange={(e) => setPlayerName(e.target.value)} type={'text'} className='form-control center' style={{ width: '150px' }} value={playerName} />
                            <span style={{ color: 'grey' }}>5 letras mínimo</span>
                            <div>
                                <button onClick={handleGoClick} className='btn btn-warning' style={{ marginTop: '30px' }}>Go!</button>
                            </div>
                        </center>



                    </div>
                    :
                    <div className='container pb-5' style={{ backgroundColor: 'black' }}>
                        <div className='row'>
                            <div className='col-12 mb-5 text-center mt-2' style={{ color: 'white' }}>
                                <h1>99Block</h1>
                                <h5 style={{ marginBottom: '22px' }}>Reach 99 to win</h5>
                                {selectedStage !== '' ? <h6 style={{ textTransform: 'uppercase', marginBottom: '12px' }}>{selectedStage}</h6> : null}
                                {selectedStage !== '' ? <p><span className='goldspan'>Gold: {appState.game[selectedStage].gold} moves</span><span className='silverspan'>Silver: {appState.game[selectedStage].silver} moves</span><span className='bronzespan'>Bronze: {appState.game[selectedStage].bronze} moves</span></p> : null}
                            </div>
                            {selectedStage !== '' ? <Board state={appState} stage={selectedStage} setStagesState={setStagesState} stagesState={stagesState} setSelectedStage={setSelectedStage} appState={appState} /> : <SelectStage stagesState={stagesState} setSelectedStage={setSelectedStage} appState={appState} />}
                        </div>
                    </div>
                :
                <div style={{ backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', height: '100vh' }}>
                    <h5 className='text-center'>Cardando...</h5>
                </div>}
        </>

    )
}

export default Home