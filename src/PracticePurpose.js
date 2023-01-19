import React, { useState } from 'react';
import { Stage, Layer, Line, Text, Group } from 'react-konva';
import './App.css'

const PracticePurpose = () => {
    const [lines, setLines] = useState([]);
    const [isDrawing, setIsDrawing] = useState(true);
    const [selectedShape, setSelectedShape] = useState(null);
    const [lineLengths, setLineLengths] = useState([]);


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



    return (
        <>
            <div className='length'>
                <>
                    {lineLengths.map((length, i) => (
                        <div key={i}>Line {i + 1} Length: {length.toFixed(2)} Sq meter</div>
                    ))}
                </>
            </div>
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
                        {lines.map((line, i) => {
                            const length = Math.sqrt(Math.pow(line.points[line.points.length - 2]
                                - line.points[line.points.length - 4], 2) + Math.pow(line.points[line.points.length
                                    - 1] - line.points[line.points.length - 3], 2));
                            return (
                                <>
                                    <Line
                                        key={i}
                                        points={line.points}
                                        stroke="black"
                                        strokeWidth={4}
                                        closed="true"
                                        fillPatternRepeat
                                        draggable="false"
                                        lineCap="square"
                                        lineJoin='bevel'
                                        shadowOffsetX={2}
                                        shadowOffsetY={2}
                                        shadowOpacity={0.5}
                                        fill={i === selectedShape ? 'lightpink' : 'transparent'}
                                        onDblClick={() => handleSelectShape(i)}
                                    />
                                    <Text
                                        x={line.points[line.points.length - 2]}
                                        y={line.points[line.points.length - 1]}
                                        text={`Shape  ${i+1} Length: ${length.toFixed(2)}`}
                                        fontSize={15}
                                        fill="yellow"
                                    />
                                </>
                            )
                        })}
                    </Group>
                </Layer>
            </Stage>
        </>
    );

};

export default PracticePurpose


