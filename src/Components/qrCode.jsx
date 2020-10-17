import React, { useState, useEffect } from 'react'


const QrCode = () => {

    // const [code, setCode] = useState("");
    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     const data = await fetch("https://api.qrserver.com/v1/create-qr-code/?data=Ghareeb&size=300x300");
    //     console.log(data);
    // }
    // let source = fetchData();


    return (
        <div>

            {/* <button onClick={fetchData}> Get Data </button> */}
            <img src={"https://api.qrserver.com/v1/create-qr-code/?data=Ghareeb&size=300x300"} />
        </div>
    )
}
export default QrCode;