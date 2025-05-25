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
					<p>@mh@는 수식임을 나타내는 약어 입니다, 밑에 수식변환 매크로에서 호환이 되며, 만약 사용하지 않는 경우, 한글에서 찾아바꾸기로 모두 삭제할 수 있습니다.</p>
					<p>@img@는 이미지임을 나타내는 약어입니다. </p>

					<div>
						<h4>수식 변환 매크로</h4>
						<p>수식 변환 매크로는 스크립트 매크로 단축키와 같이 사용하는 경우, 그 효과를 극대화 할 수 있습니다.</p>
						<p>페이지 시작부분에 커서를 위치한 후, 해당 스크립트 매크로를 실행 시키면 됩니다.</p>
						<pre>{`HAction.GetDefault("RepeatFind", HParameterSet.HFindReplace.HSet);
HParameterSet.HFindReplace.FindString = "@mh@";
HAction.Execute("RepeatFind", HParameterSet.HFindReplace.HSet);

HAction.Run("Delete")
var sspos = getPosBySet();
HAction.Execute("RepeatFind", HParameterSet.HFindReplace.HSet);

HAction.Run("Delete")
var ffpos = getPosBySet();
SelectText( sspos.Item("Para"), sspos.Item("Pos"),
ffpos.Item("Para"), ffpos.Item("Pos"));
HAction.GetDefault("EquationCreate", HParameterSet.HEqEdit.HSet);
with (HParameterSet.HEqEdit)
{
String =GetTextFile("TEXT","saveblock");
HAction.Run("Delete")
}
HAction.Execute("EquationCreate", HParameterSet.HEqEdit.HSet);`}</pre>
					</div>

					<div>
						<h4>링크 이미지 (주소로된 이미지) 변환 매크로</h4>
						<p>해당 매크로는 스크립트 매크로 단축키와 같이 사용하는 경우, 그 효과를 극대화 할 수 있습니다.</p>
						<p>커서를 문서 시작부분에 위치한 후, 해당 스크립트 매크로를 실행시키면 됩니다.</p>
						<pre>{`HAction.GetDefault("RepeatFind", HParameterSet.HFindReplace.HSet);
HParameterSet.HFindReplace.FindString = "@img@";
HAction.Execute("RepeatFind", HParameterSet.HFindReplace.HSet);

HAction.Run("Delete")
var sspos = getPosBySet();
HAction.Execute("RepeatFind", HParameterSet.HFindReplace.HSet);

HAction.Run("Delete")
var ffpos = getPosBySet();
SelectText( sspos.Item("Para"), sspos.Item("Pos"),
ffpos.Item("Para"), ffpos.Item("Pos"));
String =GetTextFile("TEXT","saveblock");
InsertPicture(String,1,1,0,0,0,30,30);`}</pre>
					</div>
					<br />
					
				</div>
			)}
			
		</div>
	);
}

export default HwpGuide;