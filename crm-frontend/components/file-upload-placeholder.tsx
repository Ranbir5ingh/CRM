import { CloudUpload } from "lucide-react";
import React from "react";

export default function FileUploadPlaceholder() {
	return (
		<div className="flex flex-col justify-center items-center gap-2 w-full h-full">
			<div className="flex flex-col items-center justify-center   ">
				<div className="flex justify-center items-center flex-col text-sm text-gray-500">
					<p>Upload File</p>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center aspect-square m-auto h-[5rem] rounded-lg cursor-pointer bg-gray-100">
				<CloudUpload className="w-10 h-10 text-white font-bold bg-gray-600 rounded-[50%] p-2" />
			</div>
		</div>
	);
}
