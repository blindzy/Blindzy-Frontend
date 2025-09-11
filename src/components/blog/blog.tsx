import * as React from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import { Plus } from 'lucide-react';
import { Button } from "@lib/components/ui/button";
import { fetchBlogs } from "@lib/lib/strapi";
import ReactMarkdown from 'react-markdown';


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
    const [blogs, setBlogs] = useState<BlogItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1150;
    const lenis = isDesktop ? useLenis() : null;

    // Define blog data
    // const blogData: BlogItem[] = [
    //     { id: 1, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/1.png", category: "curatins", href: "/blogs/blog-detail" },
    //     { id: 2, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/1.png", category: "curatins", href: "/blogs/blog-detail" },
    //     { id: 3, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/2.png", category: "blinds", href: "/blogs/blog-detail" },
    //     { id: 4, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/2.png", category: "blinds", href: "/blogs/blog-detail" },
    //     { id: 5, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/2.png", category: "all", href: "/blogs/blog-detail" },
    //     { id: 6, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/2.png", category: "all", href: "/blogs/blog-detail" },
    //     { id: 7, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/1.png", category: "blinds", href: "/blogs/blog-detail" },
    //     { id: 8, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/2.png", category: "curatins", href: "/blogs/blog-detail" },
    //     { id: 9, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/1.png", category: "all", href: "/blogs/blog-detail" },
    //     { id: 10, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/2.png", category: "blinds", href: "/blogs/blog-detail" },
    //     { id: 11, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/1.png", category: "curatins", href: "/blogs/blog-detail" },
    //     { id: 12, title: "Title Goes Here", date: "5 Oct, 2023", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's", image: "/images/blog/2.png", category: "all", href: "/blogs/blog-detail" },
    // ];

    //fetch blogs posts on page initialization

    useEffect(() => {
        async function loadBlogs() {
            const blogsResponse = await fetchBlogs();
            console.log(blogsResponse.data);
            const formatted = blogsResponse.data.map((blog: any) => ({
                id: blog.id,
                title: blog.title,
                date: blog.date,
                description: blog.description,
                image: blog.image?.data?.url
                    ? `${import.meta.env.VITE_STRAPI_URL}${blog.image.data.url}`
                    : "/images/blog/3.png",
                category: blog.category || "all",
                href: `/blogs/${blog.documentId}`,
            }));
            console.log("formatted: ", formatted)
            setBlogs(formatted);
        }

        loadBlogs();
    }, []);

    // Memoize filtered items to prevent unnecessary re-renders
    const filteredItems = React.useMemo(() => {

        return blogs.filter(item =>
            selectedCategory === 'all' || item.category === selectedCategory
        );
    }, [selectedCategory, blogs]);


    // Handle category change with loading state
    const handleCategoryChange = (category: string) => {
        setIsLoading(true);
        setSelectedCategory(category);
        // setCurrentPage(1);

        // Add a small delay to show loading state and prevent glitching
        setTimeout(() => {
            setIsLoading(false);
        }, 150);
    };



    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (window.innerWidth > 1150) {
            ScrollTrigger.normalizeScroll(true);
        }

        // If using Lenis, connect it with GSAP
        if (lenis) {
            lenis.on('scroll', ScrollTrigger.update);
        }

    }, [lenis]);

    // Custom components for ReactMarkdown to apply Tailwind styles
    const markdownComponents = {
        p: ({ children }: any) => <p className="mb-1 last:mb-0">{children}</p>,
        strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }: any) => <em className="italic">{children}</em>,
        h1: ({ children }: any) => <h1 className="text-lg font-bold mb-1">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-md font-semibold mb-1">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-base font-medium mb-1">{children}</h3>,
        ul: ({ children }: any) => <ul className="list-disc ml-4 mb-1">{children}</ul>,
        ol: ({ children }: any) => <ol className="list-decimal ml-4 mb-1">{children}</ol>,
        li: ({ children }: any) => <li className="mb-0.5">{children}</li>,
        a: ({ children, href }: any) => <a href={href} className="text-blue-600 underline">{children}</a>,
        code: ({ children }: any) => <code className="bg-gray-100 px-1 py-0.5 rounded">{children}</code>,
        blockquote: ({ children }: any) => <blockquote className="border-l-4 border-gray-300 pl-2 italic my-1">{children}</blockquote>,
    };


    return (
        <div className="relative w-screen flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw gap-4 xl:p-[1.25vw] sm:p-[2.344vw p-4 xl:pt-0 sm:pt-0 pt-0 overflow-hidden" id="blog">
            <div className="w-full border border-[--Black] p-4 text-center rounded-48">
                <h1 className="text-1xl text-black uppercase">BLOGS</h1>
            </div>
            <div className="flex items-center justify-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                <button
                    className={`w-fit py-4 px-6 text-sm transition rounded-full ${selectedCategory === 'all' ? 'text-[--white] bg-[--primary]' : 'text-[--black] bg-transparent'}`}
                    onClick={() => handleCategoryChange('all')}
                >
                    All
                </button>
                <button
                    className={`w-fit py-4 px-6 text-sm transition rounded-full ${selectedCategory === 'blinds' ? 'text-[--white] bg-[--primary]' : 'text-[--black] bg-transparent'}`}
                    onClick={() => handleCategoryChange('blinds')}
                >
                    Blinds
                </button>
                <button
                    className={`w-fit py-4 px-6 text-sm transition rounded-full ${selectedCategory === 'curatins' ? 'text-[--white] bg-[--primary]' : 'text-[--black] bg-transparent'}`}
                    onClick={() => handleCategoryChange('curatins')}
                >
                    Curatins
                </button>
            </div>
            <div className="w-full flex items-center gap-2 shrink-0">
                <Plus className="size-[18px] text-[--Black]" />
                <div className="w-full border-b border-[--Black]"></div>
                <Plus className="size-[18px] text-[--Black]" />
            </div>
            <div className="w-full grid items-stretch grid-cols-12 xl:gap-[1.25vw] sm:gap-[2.344vw] gap-2">
                {filteredItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        target="_blank"
                        className="sm:col-span-6 col-span-12 flex xl:items-stretch items-center xl:gap-0 gap-4 border border-[--Black] rounded-32 overflow-hidden transition xl:p-0 sm:p-4 p-3"
                    >
                        <div className="w-full flex flex-col gap-6 justify-between text-[--Black] xl:p-[1.25vw]">
                            <div className="flex flex-col gap-2">
                                <div className="w-full flex xl:flex-row flex-col xl:items-center justify-between">
                                    <h6 className="text-md">{item.title}</h6>
                                    <p className="text-sm shrink-0">{item.date}</p>
                                </div>
                                <div className="text-sm line-clamp-3">
                                    <ReactMarkdown components={markdownComponents}>
                                        {item.description}
                                    </ReactMarkdown>
                                </div>
                            </div>
                            <Button variant="primary" size={'large'} className="hidden xl:flex w-fit">
                                Read More
                            </Button>
                        </div>
                        <div className="size-[34.884vw] sm:size-[17.578vw] xl:w-[23.438vw] xl:h-[17.188vw] shrink-0 rounded-32 overflow-hidden">
                            <img src={item.image} className="w-full h-full object-cover" alt={item.title} loading="lazy" />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Blog;
