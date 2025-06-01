import React, { useEffect, useState } from 'react'
import '../CSS/ListPage.css'
import { data, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setIsOnlyRead, setIsUpdate, setStaffId } from '../Redux/Slice';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { RiseLoader } from "react-spinners";

const override: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "block",
    margin: "0 auto",
    zIndex: "10",
    borderColor: "red",
};

function ListPage() {

    let [loading, setLoading] = useState(false);
    let color = "#13b375";

    const [tableData, setTableData] = useState([]);

    const fetchtabledetails = async () => {
        setLoading(true);
        let res = await fetch("https://newelassessmentbackend.onrender.com/tabledata");
        res = await res.json();
        setLoading(false);
        if (res.data.length === 0) {
            toast.error("Table data does not exist");
        }

        if (res.msg === "datafetched") {
            setTableData(res.data);
        }
    }

    const searchData = async () => {
        setLoading(true);
        let searchparam = document.getElementsByName('listpagesearchbar')[0].value;
        let res = await fetch(`https://newelassessmentbackend.onrender.com/tabledata/${searchparam}`);
        res = await res.json();
        setLoading(false);
        if (res.msg === "datafetched" && res.data.length > 0) {
            setTableData(res.data);
        }
    }

    const deleteemployee = async (eid) => {
        setLoading(true);
        let res = await fetch(`https://newelassessmentbackend.onrender.com/removestaff/${eid}`, {
            method: "DELETE"
        })

        res = await res.json();
        setLoading(false);
        if (res.msg === "userdeleted") {
            fetchtabledetails();
        }
    }

    const handlesearchbar = (e) => {
        let ele = e.target.nextSibling;
        ele.style.backgroundColor = "#13b375";
    }

    const handlesearchbar2 = (e) => {
        let ele = e.target.nextSibling;
        ele.style.backgroundColor = "black";
    }

    useEffect(() => {
        fetchtabledetails();
    }, [])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <>
            {loading && <div className="overlay"></div>}
            <RiseLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <div className='listpagemaincontainer'>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
                <div className="listpageheadersection">
                    <div className="listpageheader">
                        <h3>List Page</h3>
                    </div>
                    <div className="listpageaddnewbuttoncontainer">
                        <button onClick={() => { dispatch(setIsOnlyRead(false)); dispatch(setIsUpdate(false)); navigate('/add-editpage') }} >Add New</button>
                    </div>
                </div>
                <div className="listpagefiltersection">
                    <label htmlFor="listpagesearchbar">Search List: </label>
                    <div className="listpagesearchbarcontainer">
                        <input type="text" name='listpagesearchbar' onFocus={(e) => { handlesearchbar(e) }} onBlur={(e) => { handlesearchbar2(e) }} />
                        <i className="fa-solid fa-magnifying-glass" onClick={() => { searchData() }} ></i>
                    </div>
                </div>
                <div className="listpagetablesection">
                    <div className="listpagetableheader">
                        <p>Search List Table:</p>
                    </div>
                    <div className="listpagetablecontainer">
                        <table cellPadding={0} cellSpacing={0} >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Date of Joining</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.length !== 0 ? tableData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.ename}</td>
                                        <td>{item.edpartment}</td>
                                        <td>{item.edoj.slice(0, 10)}</td>
                                        <td className='tableaction'><i onClick={() => { dispatch(setStaffId(item.eid)); dispatch(setIsOnlyRead(true)); navigate('/add-editpage') }} className="fa-solid fa-eye"></i><i onClick={() => { dispatch(setIsOnlyRead(false)); dispatch(setIsUpdate(true)); dispatch(setStaffId(item.eid)); navigate('/add-editpage') }} className="fa-solid fa-pen-to-square"></i><i onClick={() => { deleteemployee(item.eid) }} className="fa-solid fa-trash"></i></td>
                                    </tr>

                                )) :
                                    <>

                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                                No record exist
                                            </td>
                                        </tr>
                                    </>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListPage