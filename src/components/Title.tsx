import Latex from "./Latex";

function Title() {
	return (

    <div style={{ fontFamily:'NanumSquare'}}>
    <h1 style={{ fontWeight: 900 }}>
        <Latex></Latex> &#8594; <img height='35px' src="https://i.namu.wiki/i/5FN7hLXcBd94b3Bi4MKCey6plbJSHZmjafZ-GL6cEcizRyauYLx6wK1VFtKuX0chDjCTMvX05EcaNetn0wpK-Q.svg" /> 변환작업툴
    </h1>
        <br/>
        <p style={{ fontWeight: 450 }}>Latex수식을 Hwp 수식으로 바꿔주는 툴입니다.</p>
        <br/>
    </div>
     ) ;
}

export default Title; 