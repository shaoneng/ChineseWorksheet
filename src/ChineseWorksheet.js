import React, { useState, useEffect , useRef } from 'react';
import { characterData } from './characterData';
import { unitData } from './unitData';


const ChineseWorksheet = () => {
  const [unit, setUnit] = useState(1);
  const [worksheetData, setWorksheetData] = useState(null);
  
  
  // 模拟从后端API获取数据的函数
  const fetchUnitData = async (unitNumber) => {
    // 在实际应用中，这里会是一个真正的API调用
    // 例如：const response = await fetch(`/api/units/${unitNumber}`);
    // const data = await response.json();
    // return data;
    
    // 现在我们只是返回本地的数据
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(unitData[unitNumber]);
      }, 300); // 模拟网络延迟
    });
  };

  useEffect(() => {
    const loadUnitData = async () => {
      const data = await fetchUnitData(unit);
      setWorksheetData(data);
    };
    loadUnitData();
  }, [unit]);

  const renderPinyinBox = (pinyin, character) => {
    const pinyinParts = pinyin.split(' ');
    const characterParts = character.split('');
  
    return (
      <div className="pinyin-word">
        {pinyinParts.map((part, index) => (
          <div key={index} className="pinyin-character-column">
            <span className="pinyin-part">{part}</span>
            <div className="character-cell">
              {characterParts[index] || ''}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const StrokeOrderDisplay = ({ character, strokeNumber }) => {
    const data = characterData[character];
    if (!data) return null;
  
    const strokes = data.strokes.slice(0, strokeNumber);
    
    return (
      <svg viewBox="0 0 1024 1024" width="100" height="100">
        <g transform="scale(1, -1) translate(0, -950)">
          {strokes.map((stroke, index) => (
            <path
            key={index}
            d={stroke}
            fill="none"
            stroke={index === strokes.length - 1 ? "red" : "black"}
            strokeWidth="2"
          />
        ))}
        </g>
      </svg>
    );
  };
  const renderStrokeBox = (character, strokes, index, secondStroke) => {
    return (
      <div className="stroke-box">
        <span className="question-number">第{index}题：{character}</span>
        <div className="character-grid">
          {Array(strokes).fill().map((_, i) => (
            <div key={i} className="character-cell">
              <StrokeOrderDisplay character={character} strokeNumber={i + 1} />
            </div>
          ))}
        </div>
        <span className="stroke-description">（{character}：共{strokes}画，第{secondStroke}画是______）</span>
      </div>
    );
  };
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="worksheet-container">
      <div className="unit-select">
        <label htmlFor="unit-select">选择单元：</label>
        <button onClick={handlePrint} className="print-button">打印工作表</button>
        <select
          id="unit-select"
          value={unit}
          onChange={(e) => setUnit(Number(e.target.value))}
        >
          {Object.keys(unitData).map((u) => (
            <option key={u} value={u}>单元 {u}</option>
          ))}
        </select>
      </div>

      <h1 className="section-title">一年级上册语文<span className="highlight">每日一练</span>（第{unit}天）</h1>
      
      {worksheetData && (
      <>
        <section>
          <h2 className="section-title">一、看拼音，写词语</h2>
          <div className="grid-container">
            {worksheetData.pinyinWords.map((word, index) => (
              <React.Fragment key={index}>
                {renderPinyinBox(word.pinyin, word.character)}
              </React.Fragment>
            ))}
          </div>
        </section>
          
        <section>
            <h2 className="section-title">二、我会写笔画、笔顺</h2>
            {worksheetData.strokeOrders.map((item, index) => (
              <React.Fragment key={index}>
                {renderStrokeBox(item.character, item.strokes, index + 1, item.secondStroke)}
              </React.Fragment>
              ))}
        </section>
        </>
      )}
    </div>
  );
  
  
};


export default ChineseWorksheet;