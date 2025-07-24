import React, { useEffect , useState, useMemo} from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';

interface BlogProps {
	// Add any props if needed in the future
}

// Define the blog item interface
interface BlogItem {
    id: number;
    title: string;
    date: string;
    description: string;
    image: string;
    category: string;
    href: string;
}

function Blog(props: BlogProps) {
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
	const lenis = isDesktop ? useLenis() : null;
	const itemsPerPage = 6; // Show 6 items per page

	// Define blog data
	const blogData: BlogItem[] = [
		{ id: 1, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/1.png", category: "curatins", href: "/blog/blog-detail" },
		{ id: 2, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/1.png", category: "curatins", href: "/blog/blog-detail" },
		{ id: 3, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/2.png", category: "blinds", href: "/blog/blog-detail" },
		{ id: 4, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/2.png", category: "blinds", href: "/blog/blog-detail" },
		{ id: 5, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/2.png", category: "all", href: "/blog/blog-detail" },
		{ id: 6, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/2.png", category: "all", href: "/blog/blog-detail" },
		// Add more items for pagination testing
		{ id: 7, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/1.png", category: "blinds", href: "/blog/blog-detail" },
		{ id: 8, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/2.png", category: "curatins", href: "/blog/blog-detail" },
		{ id: 9, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/1.png", category: "all", href: "/blog/blog-detail" },
		{ id: 10, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/2.png", category: "blinds", href: "/blog/blog-detail" },
		{ id: 11, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/1.png", category: "curatins", href: "/blog/blog-detail" },
		{ id: 12, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/2.png", category: "all", href: "/blog/blog-detail" },
	];

	// Memoize filtered items to prevent unnecessary re-renders
	const filteredItems = useMemo(() => {
		return blogData.filter(item => 
			selectedCategory === 'all' || item.category === selectedCategory
		);
	}, [selectedCategory]);

	// Memoize pagination calculations
	const paginationData = useMemo(() => {
		const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const currentItems = filteredItems.slice(startIndex, endIndex);
		
		return {
			totalPages,
			currentItems,
			startIndex,
			endIndex
		};
	}, [filteredItems, currentPage, itemsPerPage]);

	// Handle category change with loading state
	const handleCategoryChange = (category: string) => {
		setIsLoading(true);
		setSelectedCategory(category);
		setCurrentPage(1);
		
		// Add a small delay to show loading state and prevent glitching
		setTimeout(() => {
			setIsLoading(false);
		}, 150);
	};

	// Handle page change with loading state
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= paginationData.totalPages && page !== currentPage) {
			setIsLoading(true);
			setCurrentPage(page);
			
			// Add a small delay to show loading state
			setTimeout(() => {
				setIsLoading(false);
			}, 100);
		}
	};

	// Handle previous page
	const handlePreviousPage = () => {
		if (currentPage > 1) {
			handlePageChange(currentPage - 1);
		}
	};

	// Handle next page
	const handleNextPage = () => {
		if (currentPage < paginationData.totalPages) {
			handlePageChange(currentPage + 1);
		}
	};

	useEffect(() => {
        if (!isDesktop) return;
        gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.normalizeScroll(true);

		// If using Lenis, connect it with GSAP
		if (lenis) {
			lenis.on('scroll', ScrollTrigger.update);
		}
	}, [lenis, isDesktop]);
    

	return (
        <div className="relative w-screen min-h-screen flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 xl:pt-0 sm:pt-0 pt-0 overflow-hidden" id="blog">
            <div className="w-full border border-[--Black] p-4 text-center rounded-[48px]">
                <h1 className="text-1xl text-black uppercase">BLOGS</h1>
            </div>
            <div className="flex items-center justify-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                <button
                    className="w-fit cus-btn small"
                    style={selectedCategory === 'all' ? {} : { background: 'transparent', color: 'inherit', border: '1px solid transparent' }}
                    onClick={() => handleCategoryChange('all')}
                    disabled={isLoading}
                >
                    All
                </button>
                <button
                    className="w-fit cus-btn small"
                    style={selectedCategory === 'blinds' ? {} : { background: 'transparent', color: 'inherit', border: '1px solid transparent' }}
                    onClick={() => handleCategoryChange('blinds')}
                    disabled={isLoading}
                >
                    Blinds
                </button>
                <button
                    className="w-fit cus-btn small"
                    style={selectedCategory === 'curatins' ? {} : { background: 'transparent', color: 'inherit', border: '1px solid transparent' }}
                    onClick={() => handleCategoryChange('curatins')}
                    disabled={isLoading}
                >
                    Curatins
                </button>
            </div>
            <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                <Icon icon="uil:plus" className="text-[18px]" />
                <div className="w-full h-[1px] bg-mediumGrey"></div>
                <Icon icon="uil:plus" className="text-[18px]" />
            </div>
            <div className="relative grid items-stretch grid-cols-12 xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4">
                {paginationData.currentItems.map((item, index) => (
                    <a 
                        key={`${item.id}-${currentPage}-${selectedCategory}`} 
                        href={item.href} 
                        className="sm:col-span-6 col-span-12 flex items-stretch border border-[--Black] rounded-32 overflow-hidden transition-transform duration-200 hover:scale-105"
                    >
                        <div className="w-full flex flex-col xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4 justify-between text-black xl:p-[0.833vw] sm:p-[1.563vw] p-4">
                            <div className="flex flex-col gap-2">
                                <div className="w-full flex items-center justify-between">
                                    <h6 className="text-md">{item.title}</h6>
                                    <p className="text-sm">{item.date}</p>
                                </div>
                                <p className="text-sm">{item.description}</p>
                            </div>
                            <button className="w-fit cus-btn small">Read More</button>
                        </div>
                        <div className="w-full rounded-l-[32px] overflow-hidden">
                            <img src={item.image} className="w-full" alt={item.title} loading="lazy" />
                        </div>
                    </a>
                ))}
                {/* Loading overlay */}
                {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-primary">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
            {paginationData.totalPages > 1 && (
                <ul className="navigation">
                    <li 
                        onClick={handlePreviousPage} 
                        style={{ 
                            cursor: currentPage > 1 && !isLoading ? 'pointer' : 'not-allowed', 
                            opacity: currentPage > 1 && !isLoading ? 1 : 0.5 
                        }}
                        className={currentPage > 1 && !isLoading ? 'hover:bg-primary hover:text-white' : ''}
                    >
                        <Icon icon="majesticons:arrow-left-line" />
                    </li>
                    {Array.from({ length: paginationData.totalPages }, (_, i) => i + 1).map((page) => (
                        <li 
                            key={page}
                            className={`${currentPage === page ? 'active' : ''} ${!isLoading ? 'hover:bg-primary hover:text-white' : ''}`}
                            onClick={() => handlePageChange(page)}
                            style={{ cursor: !isLoading ? 'pointer' : 'not-allowed' }}
                        >
                            {page}
                        </li>
                    ))}
                    <li 
                        onClick={handleNextPage} 
                        style={{ 
                            cursor: currentPage < paginationData.totalPages && !isLoading ? 'pointer' : 'not-allowed', 
                            opacity: currentPage < paginationData.totalPages && !isLoading ? 1 : 0.5 
                        }}
                        className={currentPage < paginationData.totalPages && !isLoading ? 'hover:bg-primary hover:text-white' : ''}
                    >
                        <Icon icon="majesticons:arrow-right-line" />
                    </li>
                </ul>
            )}
        </div>
	);
}

export default Blog;
