import { useState } from "react";

function Contact() {
	const [open, setOpen] = useState(false);

	return (
		<div className="Contact">
			<h3 onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
				Contact? {open ? "▲" : "▼"}
			</h3>

			{open && (
				<p>지금도 계속해서 Latex to Hwp 프로젝트를 진행중에 있습니다. 현재는 1인 개발로, 진행중이며 부가적인 작업(반복 및, 페이지 구성 등)은 Chat GPT 4o의 도움을 받아서 하고 있습니다.
					<br/>해당 프로젝트에 관심이 있거나, 기여하고 싶으신 분은 언제든지 연락주세요!<br />
					해당 프로젝트의 최종적 목표는 Latex 문서를 Hwp 문서로 변환하는 것입니다. 다루기 어려운 Latex 수식 및 표, 그림 등을 간단하게 Hwp에 적용할 수 있게 하는 것이 목표입니다.
					<br/>
					이메일: <a href="mailto:ggmunjh7131@icloud.com">ggmunjh7131@icloud.com</a>
					<br/>
					github: <a href="https://github.com/jinhuyk" target="_blank" rel="noopener noreferrer">@jinhuyk</a>
				</p>
			)}
			
		</div>
	);
}

export default Contact;