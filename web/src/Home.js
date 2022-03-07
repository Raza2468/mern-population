import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'
import './App.css';

export const Home = () => {
    var url = 'http://localhost:5000'
    const inputElement = useRef();
    const [data, setdata] = useState([]);
    const [childData, setchildData] = useState([]);

    const focusInput = () => {

        axios({
            method: 'post',
            url: url + '/blogPost',
            data: {
                title: inputElement.current.value,
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })

    };

    const allData = () => {

        axios({
            method: 'get',
            url: url + '/profile',
        }).then((res) => {
            // console.log(res)
            setdata(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const blogChild = (e) => {
        console.log(e, "id");
        axios({
            method: "get",
            url: url + `/pp/${e}`,
        }).then((res) => {
            console.log(res)
            setchildData(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }
    console.log(childData, "childData");

    return (
        <div>
            <h1>Home</h1>

            <div className="">
                <input type="text" ref={inputElement} />
                <button type="button" className="btn btn-success" onClick={focusInput}>Success</button>
                <button type="button" className="btn btn-primary" onClick={allData}>All Data</button>
            </div>


            <br />
            <br />
            <br />
            <br />
            {/* <!-- Default dropright button --> */}

            {data.map((v, i) => {
                //  return   <p key={i}>{v.title}</p>
                // console.log(v.title, "k");
                return <div className="dropdown" key={i}>
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                        onClick={() => blogChild(v._id)}
                    >
                        {v.title}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {childData.map((v, i) => {

                            return <li><a className="dropdown-item" href="#">{v.comment}</a></li>
                        })}
                        <li>
                            <a className="dropdown-item" href="#">Another action</a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                Submenu &raquo;
                            </a>
                        </li>
                    </ul>
                </div>
            })}

            <div className="dropdown">
                <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                >
                    Dropdown button
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li>
                        <a className="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Submenu &raquo;
                        </a>
                        <ul className="dropdown-menu dropdown-submenu">
                            <li>
                                <a className="dropdown-item" href="#">Submenu item 1</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">Submenu item 2</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">Submenu item 3 &raquo; </a>
                                <ul className="dropdown-menu dropdown-submenu">
                                    <li>
                                        <a className="dropdown-item" href="#">Multi level 1</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Multi level 2</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">Submenu item 4</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">Submenu item 5</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div >
    )
}