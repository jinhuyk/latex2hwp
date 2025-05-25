import { useState } from "react";

function HwpGuide() {
	const [open, setOpen] = useState(false);

	return (
		<div className="hwp-guide">
			<h3 onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
				Hwp 사용 가이드 {open ? "▲" : "▼"}
			</h3>

			{open && (
				<div>
					<p>현재, Latex2Hwp 프로젝트는 개발중에 있으며, 이곳에서는 스크립트 매크로로 사용할 수 있는 제시안을 제공하고 있습니다.</p>

					<div>
						<h4>수식 변환 매크로</h4>
						<p>수식 변환 매크로는 스크립트 매크로 단축키와 같이 사용하는 경우, 그 효과를 극대화 할 수 있습니다.</p>
						<p>수식으로 변환할 부분을 드래그한 후, 해당 스크립트 매크로를 실행 시키면 됩니다.</p>
						<pre>{`HAction.GetDefault("EquationCreate", HParameterSet.HEqEdit.HSet);
with (HParameterSet.HEqEdit)
{
	String = GetTextFile("TEXT", "saveblock");
	HAction.Run("Delete")
}
HAction.Execute("EquationCreate", HParameterSet.HEqEdit.HSet);`}</pre>
					</div>

					<div>
						<h4>링크 이미지 (주소로된 이미지) 변환 매크로</h4>
						<p>해당 매크로는 스크립트 매크로 단축키와 같이 사용하는 경우, 그 효과를 극대화 할 수 있습니다.</p>
						<p>이미지 주소를 드래그 한 후, 해당 스크립트 매크로를 실행시키면 됩니다.</p>
						<pre>{`String = GetTextFile("TEXT","saveblock");
InsertPicture(String,1,1,0,0,0,20,20);`}</pre>
					</div>
					<br />
					
				</div>
			)}
			
		</div>
	);
}

export default HwpGuide;