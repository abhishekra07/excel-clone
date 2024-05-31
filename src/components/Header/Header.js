import React, { useState, useRef } from "react";
import { SiGooglesheets } from "react-icons/si";
import {
  FaRegStar,
  FaStar,
  FaUserCircle,
  FaDollarSign,
  FaBold,
  FaItalic,
  FaUnderline,
} from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";
import { IoVideocamOutline } from "react-icons/io5";
import { CiLock, CiSearch } from "react-icons/ci";
import { BiUndo, BiRedo } from "react-icons/bi";
import { FiPrinter } from "react-icons/fi";
import { MdOutlineFormatPaint, MdOutlinePercent } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { updateFilename, toggleBold } from "../../store/reducers/excelSlice";
import { generateJSONData } from "../../utils/utils";
import "./Header.css";
import Icon from "../Icon/Icon";
import { CSVLink } from "react-csv";

function Header() {
  const [starVisible, setStarVisible] = useState(false);
  const csvLink = useRef(null);

  const filename = useSelector((state) => state.excel.filename);
  const cellValues = useSelector((state) => state.excel.cellValues);
  const alphabet = useSelector((state) => state.excel.alphabet);
  const rows = useSelector((state) => state.excel.rows);
  const selectedCell = useSelector((state) => state.excel.selectedCell);
  const isBold = useSelector((state) => {
    const cellKey = `${selectedCell.column}${selectedCell.row}`;
    return cellValues[cellKey]?.isBold || false;
  });
  const [csvData, setCsvData] = useState({ data: [], headers: [] });

  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    dispatch(updateFilename({ filename: e.target.value }));
  };

  const handleBoldClick = () => {
    dispatch(toggleBold(selectedCell));
  };

  const handleButtonClick = (e) => {
    const json = generateJSONData(rows, alphabet, cellValues);
    setCsvData({ data: json.json, headers: json.csv });
    csvLink.current.link.click();
  };

  return (
    <>
      <div className="header-container">
        <div className="left-container">
          <Icon icon={SiGooglesheets} width="40px" height="40px" />
          <div className="left-container-options">
            <div className="file-container">
              <input
                type="text"
                id="title"
                value={filename}
                onChange={handleTitleChange}
                className="file-name-input"
              />
              {!starVisible ? (
                <FaRegStar
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                  onClick={() => {
                    setStarVisible(!starVisible);
                  }}
                />
              ) : (
                <FaStar
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                    color: "rgb(255 229 89)",
                  }}
                  onClick={() => {
                    setStarVisible(!starVisible);
                  }}
                />
              )}
            </div>
            <div className="header-options">
              <span className="option">File</span>
              <span className="option">Edit</span>
              <span className="option">View</span>
              <span className="option">Insert</span>
              <span className="option">Format</span>
              <span className="option">Data</span>
            </div>
          </div>
        </div>
        <div className="right-container">
          <Icon icon={LiaCommentSolid} width="30px" height="30px" />
          <Icon icon={IoVideocamOutline} width="30px" height="30px" />
          <Icon icon={CiLock} width="30px" height="30px" />
          <Icon icon={FaUserCircle} width="30px" height="30px" />
        </div>
      </div>
      <div className="header-editor">
        <div className="header-editor-left">
          <div className="editor-icon">
            <Icon icon={CiSearch} width="20px" height="20px" />
          </div>
          <div className="editor-icon">
            <Icon icon={BiUndo} width="20px" height="20px" />
          </div>
          <div className="editor-icon">
            <Icon icon={BiRedo} width="20px" height="20px" />
          </div>
          <div className="editor-icon" onClick={handleBoldClick}>
            <FaBold
              width="20px"
              height="20px"
              style={{
                fontWeight: isBold ? "bold" : "normal",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="editor-icon">
            <Icon icon={FaItalic} width="20px" height="20px" />
          </div>
          <div className="editor-icon">
            <Icon icon={FaUnderline} width="20px" height="20px" />
          </div>
          <div className="editor-icon">
            <Icon icon={FiPrinter} width="20px" height="20px" />
          </div>
          <div className="editor-icon">
            <Icon icon={MdOutlineFormatPaint} width="20px" height="20px" />
          </div>
          <div className="editor-icon">
            <Icon icon={FaUnderline} width="20px" height="20px" />
          </div>
          <div className="editor-icon">
            <Icon icon={FaDollarSign} width="20px" height="20px" />
          </div>
          <div className="editor-icon">
            <Icon icon={MdOutlinePercent} width="20px" height="20px" />
          </div>
        </div>
        <div className="header-editor-right">
          <button className="btn" onClick={handleButtonClick}>
            Download
          </button>
          <CSVLink
            data={csvData.data}
            headers={csvData.headers}
            filename={`${filename}.csv`}
            ref={csvLink}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
