import React, { useEffect, useState } from 'react'

function Board({ state, stage, setStagesState, stagesState, setSelectedStage }) {    

    const wallTouchTimeDelay = 100
    const boxTransitionTime = 450

    const [topOrBot, setTopOrBot] = useState('')
    const [leftOrRight, setLeftOrRight] = useState('')
    const [position, setPosition] = useState('themiddle')
    const [walltop, setWallTop] = useState('thewall')
    const [wallLeft, setWallLeft] = useState('thewall')
    const [wallRight, setWallRight] = useState('thewall')
    const [wallBottom, setWallBottom] = useState('thewall')

    const [topOper, setTopOper] = useState(state.game[stage].topWall)
    const [rightOper, setRightOper] = useState(state.game[stage].rightWall)
    const [leftOper, setLeftOPer] = useState(state.game[stage].leftWall)
    const [bottomOper, setBottomOper] = useState(state.game[stage].bottomWall)
    const medida = 300

    const [boxValue, setBoxValue] = useState(state.game[stage].boxValue)
    const [movements, setMovements] = useState(0)

    const handleRestart = () => {
        setPosition('themiddle')
        setTopOrBot('')
        setLeftOrRight('')
        setBoxValue(state.game[stage].boxValue)
        setMovements(0)
    }

    useEffect(() => {
        setTopOper(state.game[stage].topWall)
        setRightOper(state.game[stage].rightWall)
        setLeftOPer(state.game[stage].leftWall)
        setBottomOper(state.game[stage].bottomWall)
        setBoxValue(state.game[stage].boxValue)
        handleRestart()
    }, [stage])

    useEffect(() => {
      
        if (boxValue === 99) {
            if (movements === state.game[stage].gold) {
                alert('olé! medalla de oro')
                setStagesState({
                    ...stagesState, [stage]: { ...stagesState[stage], completed: true, movements: movements }
                })
            } else if (movements === state.game[stage].silver) {
                alert('Segundon! encara es pot fer millor, va')
                setStagesState({
                    ...stagesState, [stage]: { ...stagesState[stage], completed: true, movements: movements }
                })
            } else if (movements === state.game[stage].bronze) {
                alert('es el mínim, quedar 3er pero... molt millorable')
                setStagesState({
                    ...stagesState, [stage]: { ...stagesState[stage], completed: true, movements: movements }
                })
            } else {
                alert('si, vale.. ho has aconseguit, pero ets un MERDES')
                setStagesState({
                    ...stagesState, [stage]: { ...stagesState[stage], completed: true, movements: movements }
                })
                setSelectedStage('')
            }
        }
    }, [boxValue])

    const handleClick = (direction) => {
        switch (direction) {
            case 'top':
                if (topOrBot !== 'thetop') {
                    calcula(topOper)
                    setTopOrBot('thetop')
                    setTimeout(() => {
                        setWallTop('walltouch')
                        setTimeout(() => {
                            setWallTop('thewall')
                        }, wallTouchTimeDelay);
                    }, boxTransitionTime - 50);
                }
                break;
            case 'bottom':
                if (topOrBot !== 'thebottom') {
                    calcula(bottomOper)
                    setTopOrBot('thebottom')
                    setTimeout(() => {
                        setWallBottom('walltouch')
                        setTimeout(() => {
                            setWallBottom('thewall')
                        }, wallTouchTimeDelay);
                    }, boxTransitionTime - 50);
                }
                break;
            case 'left':
                if (leftOrRight !== 'theleft') {
                    calcula(leftOper)
                    setLeftOrRight('theleft')
                    setTimeout(() => {
                        setWallLeft('walltouch')
                        setTimeout(() => {
                            setWallLeft('thewall')
                        }, wallTouchTimeDelay);
                    }, boxTransitionTime - 50);
                }
                break;
            case 'right':
                if (leftOrRight !== 'theright') {
                    calcula(rightOper)
                    setLeftOrRight('theright')
                    setTimeout(() => {
                        setWallRight('walltouch')
                        setTimeout(() => {
                            setWallRight('thewall')
                        }, wallTouchTimeDelay);
                    }, boxTransitionTime - 50);
                }
                break;
            default:
                break;
        }
    }

    const calcula = (oper) => {
        setMovements(movements + 1)
        setTimeout(() => {
            if (oper[0] === '+') {
                setBoxValue(boxValue + parseInt(oper[1]))
            } else if (oper[0] === '-') {
                setBoxValue(boxValue - parseInt(oper[1]))
            } else if (oper[0] === '*') {
                setBoxValue(boxValue * parseInt(oper[1]))
            }
        }, boxTransitionTime);
    }

    const startTest = () => {
        let boxTestValue = state.game[stage].boxValue
        const options = ['top', 'bottom', 'left', 'right']
        let elQueMenos = 99
        let stringRestul = []
        let lastLeftRight = ''
        let lastBotTop = ''
        let jugadaValida = false
        for (let i = 0; i < 100000; i++) {
            boxTestValue = state.game[stage].boxValue
            stringRestul = []
            lastBotTop = ''
            lastLeftRight = ''

            for (let j = 0; j < 25; j++) {
                const movement = Math.floor(Math.random() * 4)
                if (options[movement] === 'top') {
                    lastBotTop === 'top' ? jugadaValida = false : jugadaValida = true
                    if (jugadaValida) { lastBotTop = 'top' }
                } else if (options[movement] === 'bottom') {
                    lastBotTop === 'bottom' ? jugadaValida = false : jugadaValida = true
                    if (jugadaValida) { lastBotTop = 'bottom' }
                } else if (options[movement] === 'left') {
                    lastLeftRight === 'left' ? jugadaValida = false : jugadaValida = true
                    if (jugadaValida) { lastLeftRight = 'left' }
                } else if (options[movement] === 'right') {
                    lastLeftRight === 'right' ? jugadaValida = false : jugadaValida = true
                    if (jugadaValida) { lastLeftRight = 'right' }
                }

                if (jugadaValida) {
                    stringRestul.push(options[movement])
                    boxTestValue = handleTest(options[movement], boxTestValue)
                }
            }

            if (boxTestValue === 99) {
                console.log('---------------------------------------------');
                console.log('conseguido en: ' + stringRestul.length + ' jugadas');
                console.log(`Prova ${i} result: ${boxTestValue} así: ${stringRestul}`);
                if (stringRestul.length < elQueMenos) { elQueMenos = stringRestul.length }
            }

        }
        console.log('End proba');
        console.log('El que menos con: ' + elQueMenos);
    }

    const calculatest = (oper, boxTestValue) => {

        if (oper[0] === '+') {
            return (boxTestValue + parseInt(oper[1]))
        } else if (oper[0] === '-') {
            return (boxTestValue - parseInt(oper[1]))
        } else if (oper[0] === '*') {
            return (boxTestValue * parseInt(oper[1]))
        }
    }

    const handleTest = (direction, boxTestValue) => {
        switch (direction) {
            case 'top':
                if (topOrBot !== 'thetop') { return calculatest(topOper, boxTestValue) }
                break;
            case 'bottom':
                if (topOrBot !== 'thebottom') { return calculatest(bottomOper, boxTestValue) }
                break;
            case 'left':
                if (leftOrRight !== 'theleft') { return calculatest(leftOper, boxTestValue) }
                break;
            case 'right':
                if (leftOrRight !== 'theright') { return calculatest(rightOper, boxTestValue) }
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        //startTest()
    }, [])


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'white', marginBottom: '50px', width: 'auto', padding: '5px' }}>Movimientos usados: {movements}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'lightgreen', width: medida, height: medida, position: 'relative' }}>
                    <div onClick={() => handleClick('top')} className={walltop} style={{ width: `${medida}px`, height: `${medida / 10}px`, backgroundColor: 'yellow', top: `-${medida / 10}px`, position: 'relative' }}>{topOper}</div>
                    <div onClick={() => handleClick('bottom')} className={wallBottom} style={{ width: `${medida}px`, height: `${medida / 10}px`, backgroundColor: 'yellow', top: `${medida - medida / 10}px`, position: 'relative' }}>{bottomOper}</div>
                    <div onClick={() => handleClick('left')} className={wallLeft} style={{ width: `${medida / 10}px`, height: `${medida}px`, backgroundColor: 'yellow', top: `-${medida / 10 * 2}px`, left: `-${medida / 10}px`, position: 'relative' }}>{leftOper}</div>
                    <div onClick={() => handleClick('right')} className={wallRight} style={{ width: `${medida / 10}px`, height: `${medida}px`, backgroundColor: 'yellow', top: `-${medida + medida / 10 * 2}px`, right: `-${medida}px`, position: 'relative' }}>{rightOper}</div>

                    <div className={`thebox ${position} ${topOrBot} ${leftOrRight}`} style={{}}>
                        {boxValue}
                    </div>
                </div>
            </div>
            <center><button onClick={handleRestart} className='btn btn-primary' style={{ marginTop: '100px', width: 'auto', marginRight: '5px' }}>RESTART</button>
                <button onClick={() => setSelectedStage('')} className='btn btn-warning' style={{ marginTop: '100px', width: 'auto' }}>QUIT</button></center>
        </>
    )
}

export default Board