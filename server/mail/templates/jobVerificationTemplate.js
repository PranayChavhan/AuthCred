const jobVerificationTemplate = (id, name, jobTitle, companyName, duration) => {
	return `<!DOCTYPE html>
	<html>

	<head>
		<meta charset="UTF-8">
		<title>Previous Employment Verification Request</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.6;
				color: #333333;
				margin: 0;
				padding: 0;
			}

			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: left;
				border: 1px solid #ddd;
				border-radius: 8px;
			}

			.header {
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 20px;
				text-align: center;
			}

			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}

			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}

			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
		</style>

	</head>

	<body>
		<div class="container">
			<div class="header">Previous Employment Verification Request</div>
			<div class="body">
				<p>Dear HR Department,</p>
				<p>I am writing to formally request the verification of employment for the following individual who has previously worked at your company:</p>
				<ul>
					<li><strong>Name:</strong> ${name}</li>
					<li><strong>Previous Company Name:</strong> ${companyName}</li>
					<li><strong>Designation:</strong> ${jobTitle}</li>
					<li><strong>Period of Employment:</strong> ${duration}</li>
				</ul>

                <p>Please confirm the verification using the following link:</p>
				<a href="https://authcred.prannay.live/company/${id}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 25px; transition: background-color 0.3s;" onmouseover="this.style.backgroundColor='#0056b3'" onmouseout="this.style.backgroundColor='#007bff'">
				  Verify
				</a>

				<p>This link is valid for 24 hours.</p>

				<p>Please let me know if any additional information or documentation is required to process this request. Additionally, if there is a fee for the verification service, kindly provide details on how to proceed.</p>

				<p>Looking forward to your prompt response.</p>

				<p>Thank you.</p>
				<p>Best Regards,<br>
				<strong>AuthentiCred</strong><br>
				</p>
			</div>
		</div>
	</body>

	</html>`;
};

export default jobVerificationTemplate;
