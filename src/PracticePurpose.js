import React, { useState } from 'react';
import { Stage, Layer, Line, Text, Group } from 'react-konva';
import './App.css'

const PracticePurpose = () => {
    const [lines, setLines] = useState([]);
    const [isDrawing, setIsDrawing] = useState(true);
    const [selectedShape, setSelectedShape] = useState(null);
    const [lineLengths, setLineLengths] = useState([]);
    const [x, setX] = useState("");
    const [y, setY] = useState("");


    const handleClick = (e) => {
        if (!isDrawing) {
            return;
        }
        if (!lines.length) {
            setLines([{ points: [] }])
        }

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        const lastLine = lines[lines.length - 1];
        let lastX = 0;
        let lastY = 0;
        let lineLength = 0;
        if (lastLine && lastLine.points.length > 0) {
            lastX = lastLine.points[lastLine.points.length - 2];
            lastY = lastLine.points[lastLine.points.length - 1];
            lineLength = Math.sqrt(Math.pow(point.x - lastX, 2) + Math.pow(point.y - lastY, 2));
        }
        if (!lastLine) {
            setLines([...lines, { points: [point.x, point.y] }]);
        } else {
            lastLine.points = lastLine.points.concat([point.x, point.y]);
            setLineLengths([...lineLengths, lineLength]);
            setLines(lines.concat());
        }
        console.log('Line Length: ', lineLength);
    };


    const handleNewShape = () => {
        setIsDrawing(true);
        setLines([...lines, { points: [] }]);
    }

    const handleStopDrawing = () => {
        setIsDrawing(false);
    }
    const handleStartDrawing = () => {
        setIsDrawing(true);
    }

    const handleSelectShape = (shapeIndex) => {
        setSelectedShape(shapeIndex);
    }

    const handleDragMove = (e) => {
        setX(e.target.x());
        setY(e.target.y());
    };

    const handleDragEnd = (e) => {
        setX(e.target.x());
        setY(e.target.y());
    };



    return (
        <>
            <button width={50} height={50} onClick={handleNewShape}>New Shape</button>
            <button width={50} height={50} onClick={handleStopDrawing}>Stop Drawing</button>
            <button width={50} height={50} onClick={handleStartDrawing}>Start Drawing</button>

            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onClick={handleClick}
                className="Stage-Decoration"
            >
                <Layer>
                    <Group>
                        {
                            lines.map((line, i) => {
                                let length = 0;
                                let x = 0;
                                let y = 0;
                                let prevX = 0;
                                let prevY = 0;
                                return (
                                    <>
                                        <Line
                                            key={i}
                                            points={line.points}
                                            stroke="black"
                                            strokeWidth={4}
                                            closed="true"
                                            draggable="true"
                                            onDragMove={handleDragMove}
                                            onDragEnd={handleDragEnd}
                                            lineCap="square"
                                            lineJoin='bevel'
                                            shadowOffsetX={2}
                                            shadowOffsetY={2}
                                            shadowOpacity={0.5}
                                            fill={i === selectedShape ? 'lightpink' : 'transparent'}
                                            onDblClick={() => handleSelectShape(i)}
                                        />

                                        {
                                            line.points.map((point, index) => {
                                                if (index % 2 === 0) {
                                                    prevX = x;
                                                    x = point;
                                                } else {
                                                    prevY = y;
                                                    y = point;
                                                }
                                                if (prevX && prevY) {
                                                    length = Math.sqrt(Math.pow(x - prevX, 2) + Math.pow(y - prevY, 2));
                                                    return (
                                                        <Text
                                                            x={(x + prevX) / 2}
                                                            y={(y + prevY) / 2}
                                                            text={`${length.toFixed(2)} Sq m`}
                                                            fontSize={16}
                                                            draggable="true"
                                                            onDragMove={handleDragMove}
                                                            onDragEnd={handleDragEnd}
                                                            fill='yellow'

                                                        />
                                                    );
                                                }
                                                return null;
                                            })}
                                    </>
                                );
                            })}
                    </Group>
                </Layer>
            </Stage>
        </>
    );

};

export default PracticePurpose


