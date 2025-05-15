import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface PaginationBarProps {
	currentPage: number;
	totalPages: number;
	pageSize: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (size: number) => void;
}

export function PaginationBar({
	currentPage,
	totalPages,
	pageSize,
	onPageChange,
	onPageSizeChange,
}: PaginationBarProps) {
	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 w-full">
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground">
					Page {currentPage} of {totalPages}
				</span>
				<Select
					value={pageSize.toString()}
					onValueChange={(value) => onPageSizeChange(Number(value))}
				>
					<SelectTrigger className="w-[100px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{[10, 20, 30, 40, 50].map((size) => (
							<SelectItem key={size} value={size.toString()}>
								{size} rows
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex items-center gap-1">
				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(1)}
					disabled={currentPage === 1}
				>
					<ChevronsLeft className="h-4 w-4" />
					<span className="sr-only">First page</span>
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					<ChevronLeft className="h-4 w-4" />
					<span className="sr-only">Previous page</span>
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					<ChevronRight className="h-4 w-4" />
					<span className="sr-only">Next page</span>
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(totalPages)}
					disabled={currentPage === totalPages}
				>
					<ChevronsRight className="h-4 w-4" />
					<span className="sr-only">Last page</span>
				</Button>
			</div>
		</div>
	);
}
