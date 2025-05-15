"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ViewEmployeeDialogSkeleton() {
	return (
		<div className="px-8 space-y-10 h-[80vh]">
			{/* Employee Name Skeleton */}
			<div className="border-b pb-2">
				<div className="h-9 w-48 bg-gray-200 rounded-md animate-pulse"></div>
			</div>

			{/* Profile Section Skeleton */}
			<div className="flex justify-between items-start">
				<div className="flex gap-6">
					<div className="relative">
						{/* Avatar Skeleton */}
						<div
							className="w-32 h-32 border-4 rounded-2xl bg-gray-200 animate-pulse"
							style={{ borderColor: "gray" }}
						></div>
					</div>
					<div className="space-y-3">
						{/* Designation Skeleton */}
						<div className="h-7 w-32 bg-gray-200 rounded-md animate-pulse"></div>
						{/* Age/Gender Skeleton */}
						<div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse"></div>
						{/* Salary Skeleton */}
						<div className="h-6 w-20 bg-gray-200 rounded-md animate-pulse"></div>
					</div>
				</div>
				<div className="space-y-3 text-right">
					<div className="grid gap-6 justify-end">
						{/* Phone Number Skeleton */}
						<div className="flex items-center gap-2 whitespace-nowrap">
							<span className="bg-gray-300 p-2 rounded-full w-8 h-8 animate-pulse"></span>
							<div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
						</div>
						{/* WhatsApp Number Skeleton */}
						<div className="flex items-center gap-2 whitespace-nowrap">
							<span className="bg-gray-300 p-2 rounded-full w-8 h-8 animate-pulse"></span>
							<div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
						</div>
					</div>
					{/* Address Skeleton */}
					<div className="mt-4 flex items-center gap-2 justify-end">
						<div className="h-6 w-16 bg-gray-200 rounded-md animate-pulse"></div>
						<div className="h-6 w-40 bg-gray-200 rounded-md animate-pulse"></div>
					</div>
				</div>
			</div>

			{/* Employment History Skeleton */}
			<div className="space-y-6">
				{/* Section Header Skeleton */}
				<div className="border-b pb-2">
					<div className="h-8 w-56 bg-gray-200 rounded-md animate-pulse"></div>
				</div>

				<div className="rounded-lg relative flex flex-col gap-4 max-h-80 overflow-y-auto">
					<div className="border rounded-lg">
						<div className="border-b">
							<div className="flex p-4">
								{[...Array(4)].map((_, i) => (
									<div key={i} className="flex-1">
										<Skeleton className="h-4 w-[80%]" />
									</div>
								))}
							</div>
						</div>
						<div>
							{[...Array(5)].map((_, i) => (
								<div key={i} className="flex p-4 border-b last:border-b-0">
									{[...Array(4)].map((_, j) => (
										<div key={j} className="flex-1">
											<Skeleton className="h-4 w-[80%]" />
										</div>
									))}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
